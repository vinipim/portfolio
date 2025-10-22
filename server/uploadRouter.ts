import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { storagePut, storageGet } from "./storage";
import { nanoid } from "nanoid";

/**
 * Upload router for media management
 * Handles image and video uploads to S3
 */
export const uploadRouter = router({
  /**
   * Get signed URL for upload
   */
  getUploadUrl: publicProcedure
    .input(
      z.object({
        filename: z.string(),
        contentType: z.string(),
        fileType: z.enum(["image", "video", "document"]),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const fileId = nanoid();
        const extension = input.filename.split(".").pop();
        const key = `${input.fileType}s/${fileId}.${extension}`;

        // Generate upload URL (in real implementation, this would be a presigned URL)
        // For now, we'll return a key that the client can use
        return {
          uploadUrl: `/api/upload/${key}`,
          key,
          fileId,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to generate upload URL",
        });
      }
    }),

  /**
   * Confirm upload and save metadata
   */
  confirmUpload: publicProcedure
    .input(
      z.object({
        key: z.string(),
        filename: z.string(),
        contentType: z.string(),
        size: z.number(),
        fileType: z.enum(["image", "video", "document"]),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // In a real implementation, you would:
        // 1. Verify the file was uploaded to S3
        // 2. Save metadata to database
        // 3. Generate thumbnail for videos/images
        
        // For now, return the public URL
        const publicUrl = await storageGet(input.key);
        
        return {
          success: true,
          url: publicUrl.url,
          key: input.key,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to confirm upload",
        });
      }
    }),

  /**
   * Upload file directly (for small files)
   */
  uploadFile: publicProcedure
    .input(
      z.object({
        filename: z.string(),
        contentType: z.string(),
        data: z.string(), // base64 encoded
        fileType: z.enum(["image", "video", "document"]),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const fileId = nanoid();
        const extension = input.filename.split(".").pop();
        const key = `${input.fileType}s/${fileId}.${extension}`;

        // Decode base64 data
        const buffer = Buffer.from(input.data, "base64");

        // Upload to S3
        const result = await storagePut(key, buffer, input.contentType);

        return {
          success: true,
          url: result.url,
          key: result.key,
        };
      } catch (error) {
        console.error("Upload error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to upload file",
        });
      }
    }),

  /**
   * Get file URL
   */
  getFileUrl: publicProcedure
    .input(z.object({ key: z.string() }))
    .query(async ({ input }) => {
      try {
        const result = await storageGet(input.key);
        return {
          url: result.url,
          key: result.key,
        };
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "File not found",
        });
      }
    }),
});

