import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { media } from "../drizzle/schema";
import { eq, desc } from "drizzle-orm";
import { nanoid } from "nanoid";

/**
 * Media router for file management
 */
export const mediaRouter = router({
  /**
   * Get all media files
   */
  getAll: publicProcedure
    .input(
      z
        .object({
          fileType: z.enum(["image", "video", "document"]).optional(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database not available",
        });
      }

      let query = db.select().from(media).orderBy(desc(media.createdAt));

      if (input?.fileType) {
        query = query.where(eq(media.fileType, input.fileType)) as any;
      }

      const files = await query;
      return files;
    }),

  /**
   * Get media by ID
   */
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database not available",
        });
      }

      const [file] = await db.select().from(media).where(eq(media.id, input.id));

      if (!file) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Media file not found",
        });
      }

      return file;
    }),

  /**
   * Create media record
   */
  create: publicProcedure
    .input(
      z.object({
        filename: z.string(),
        fileType: z.enum(["image", "video", "document"]),
        contentType: z.string(),
        size: z.number(),
        storageKey: z.string(),
        url: z.string(),
        thumbnail: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database not available",
        });
      }

      const id = nanoid();

      await db.insert(media).values({
        id,
        ...input,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return { success: true, id };
    }),

  /**
   * Delete media
   */
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database not available",
        });
      }

      // TODO: Also delete from S3
      await db.delete(media).where(eq(media.id, input.id));

      return { success: true };
    }),
});

