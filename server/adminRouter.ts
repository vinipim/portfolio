import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { verifyAdminLogin, updateAdminEmail, updateAdminPassword } from "./auth";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import * as jwt from "jose";
import { ENV } from "./_core/env";

const ADMIN_SESSION_COOKIE = "admin_session";

/**
 * Admin router for authentication and management
 */
export const adminRouter = router({
  /**
   * Admin login
   */
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const admin = await verifyAdminLogin(input.email, input.password);

      if (!admin) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email or password",
        });
      }

      // Create JWT token
      const secret = new TextEncoder().encode(ENV.cookieSecret);
      const token = await new jwt.SignJWT({
        adminId: admin.id,
        email: admin.email,
        name: admin.name,
      })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(secret);

      // Set cookie
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.cookie(ADMIN_SESSION_COOKIE, token, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return {
        success: true,
        admin: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
        },
      };
    }),

  /**
   * Get current admin session
   */
  me: publicProcedure.query(async ({ ctx }) => {
    const token = ctx.req.cookies[ADMIN_SESSION_COOKIE];

    if (!token) {
      return null;
    }

    try {
      const secret = new TextEncoder().encode(ENV.cookieSecret);
      const { payload } = await jwt.jwtVerify(token, secret);

      return {
        adminId: payload.adminId as string,
        email: payload.email as string,
        name: payload.name as string | null,
      };
    } catch (error) {
      return null;
    }
  }),

  /**
   * Admin logout
   */
  logout: publicProcedure.mutation(({ ctx }) => {
    const cookieOptions = getSessionCookieOptions(ctx.req);
    ctx.res.clearCookie(ADMIN_SESSION_COOKIE, { ...cookieOptions, maxAge: -1 });
    return { success: true };
  }),

  /**
   * Update admin email
   */
  updateEmail: publicProcedure
    .input(
      z.object({
        currentEmail: z.string().email(),
        newEmail: z.string().email(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Verify admin session
      const token = ctx.req.cookies[ADMIN_SESSION_COOKIE];
      if (!token) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const success = await updateAdminEmail(input.currentEmail, input.newEmail);

      if (!success) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update email",
        });
      }

      return { success: true };
    }),

  /**
   * Update admin password
   */
  updatePassword: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        newPassword: z.string().min(8),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Verify admin session
      const token = ctx.req.cookies[ADMIN_SESSION_COOKIE];
      if (!token) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const success = await updateAdminPassword(input.email, input.newPassword);

      if (!success) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update password",
        });
      }

      return { success: true };
    }),
});

