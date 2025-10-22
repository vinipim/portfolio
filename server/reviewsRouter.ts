import { z } from "zod";
import { router, protectedProcedure } from "./_core/trpc";
import { getDb } from "./db";
import { reviews } from "../drizzle/schema";
import { eq, desc } from "drizzle-orm";
import { nanoid } from "nanoid";

/**
 * Reviews Router
 * - CRUD operations for film, album, and book reviews
 * - Private routes (requires admin authentication)
 * - Ready for API integration (TMDb, Last.fm, Google Books)
 */

export const reviewsRouter = router({
  // Get all reviews with optional filtering
  list: protectedProcedure
    .input(
      z.object({
        type: z.enum(["film", "album", "book", "all"]).optional(),
        sortBy: z.enum(["date", "rating", "title"]).optional().default("date"),
        order: z.enum(["asc", "desc"]).optional().default("desc"),
      })
    )
    .query(async ({ input }: { input: any }) => {
      const db = await getDb();
      if (!db) return [];
      
      let query = db.select().from(reviews);

      if (input.type && input.type !== "all") {
        query = query.where(eq(reviews.type, input.type)) as any;
      }

      // Apply sorting
      if (input.sortBy === "date") {
        query = query.orderBy(
          input.order === "desc" ? desc(reviews.createdAt) : reviews.createdAt
        ) as any;
      } else if (input.sortBy === "rating") {
        query = query.orderBy(
          input.order === "desc" ? desc(reviews.rating) : reviews.rating
        ) as any;
      } else if (input.sortBy === "title") {
        query = query.orderBy(
          input.order === "desc" ? desc(reviews.title) : reviews.title
        ) as any;
      }

      const allReviews = await query;
      return allReviews;
    }),

  // Get single review by ID
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }: { input: any }) => {
      const db = await getDb();
      if (!db) return null;
      
      const [review] = await db
        .select()
        .from(reviews)
        .where(eq(reviews.id, input.id))
        .limit(1);
      return review;
    }),

  // Create new review
  create: protectedProcedure
    .input(
      z.object({
        type: z.enum(["film", "album", "book"]),
        title: z.string().min(1),
        creator: z.string().optional(),
        year: z.number().optional(),
        rating: z.number().min(1).max(5),
        notes: z.string().optional(),
        tags: z.array(z.string()).optional(),
        coverImage: z.string().optional(),
        apiId: z.string().optional(),
        metadata: z.any().optional(),
      })
    )
    .mutation(async ({ input, ctx }: { input: any; ctx: any }) => {
      const id = nanoid();
      const userId = ctx.user?.id || "admin";

      const db = await getDb();
      if (!db) throw new Error("Database not available");
      
      await db.insert(reviews).values({
        id,
        type: input.type,
        title: input.title,
        creator: input.creator,
        year: input.year,
        rating: input.rating,
        notes: input.notes,
        tags: input.tags ? JSON.stringify(input.tags) : null,
        coverImage: input.coverImage,
        apiId: input.apiId,
        metadata: input.metadata ? JSON.stringify(input.metadata) : null,
        userId,
      });

      return { success: true, id };
    }),

  // Update existing review
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        creator: z.string().optional(),
        year: z.number().optional(),
        rating: z.number().min(1).max(5).optional(),
        notes: z.string().optional(),
        tags: z.array(z.string()).optional(),
        coverImage: z.string().optional(),
      })
    )
    .mutation(async ({ input }: { input: any }) => {
      const updateData: any = {};
      
      if (input.title) updateData.title = input.title;
      if (input.creator) updateData.creator = input.creator;
      if (input.year) updateData.year = input.year;
      if (input.rating) updateData.rating = input.rating;
      if (input.notes !== undefined) updateData.notes = input.notes;
      if (input.tags) updateData.tags = JSON.stringify(input.tags);
      if (input.coverImage) updateData.coverImage = input.coverImage;

      const db = await getDb();
      if (!db) throw new Error("Database not available");
      
      await db
        .update(reviews)
        .set(updateData)
        .where(eq(reviews.id, input.id));

      return { success: true };
    }),

  // Delete review
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }: { input: any }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      
      await db.delete(reviews).where(eq(reviews.id, input.id));
      return { success: true };
    }),

  // Get statistics
  stats: protectedProcedure.query(async () => {
    const db = await getDb();
    if (!db) return { total: 0, byType: { film: 0, album: 0, book: 0 }, averageRating: 0, topRated: [] };
    
    const allReviews = await db.select().from(reviews);

    const stats = {
      total: allReviews.length,
      byType: {
        film: allReviews.filter((r: any) => r.type === "film").length,
        album: allReviews.filter((r: any) => r.type === "album").length,
        book: allReviews.filter((r: any) => r.type === "book").length,
      },
      averageRating: allReviews.length
        ? allReviews.reduce((sum: number, r: any) => sum + r.rating, 0) / allReviews.length
        : 0,
      topRated: allReviews
        .filter((r: any) => r.rating === 5)
        .sort((a: any, b: any) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
        .slice(0, 10),
    };

    return stats;
  }),

  // Export reviews (for HTML, JSON, Markdown export)
  exportReviews: protectedProcedure
    .input(
      z.object({
        format: z.enum(["json", "markdown", "html"]),
        type: z.enum(["film", "album", "book", "all"]).optional(),
      })
    )
    .query(async ({ input }: { input: any }) => {
      const db = await getDb();
      if (!db) return { format: "json", data: "[]" };
      
      let query = db.select().from(reviews);

      if (input.type && input.type !== "all") {
        query = query.where(eq(reviews.type, input.type)) as any;
      }

      const allReviews = await query;

      if (input.format === "json") {
        return {
          format: "json",
          data: JSON.stringify(allReviews, null, 2),
        };
      }

      if (input.format === "markdown") {
        let markdown = "# My Reviews\n\n";
        
        for (const review of allReviews) {
          markdown += `## ${review.title}\n`;
          markdown += `**${review.creator || "Unknown"}** (${review.year || "N/A"})\n`;
          markdown += `Rating: ${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}\n\n`;
          if (review.notes) {
            markdown += `${review.notes}\n\n`;
          }
          markdown += `---\n\n`;
        }

        return {
          format: "markdown",
          data: markdown,
        };
      }

      if (input.format === "html") {
        let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>My Reviews</title>
  <style>
    body { font-family: serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    .review { margin-bottom: 40px; border-bottom: 1px solid #ccc; padding-bottom: 20px; }
    .rating { color: gold; }
  </style>
</head>
<body>
  <h1>My Reviews</h1>
`;

        for (const review of allReviews) {
          html += `
  <div class="review">
    <h2>${review.title}</h2>
    <p><strong>${review.creator || "Unknown"}</strong> (${review.year || "N/A"})</p>
    <p class="rating">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</p>
    ${review.notes ? `<p>${review.notes}</p>` : ""}
  </div>
`;
        }

        html += `
</body>
</html>`;

        return {
          format: "html",
          data: html,
        };
      }

      return { format: "json", data: "[]" };
    }),
});

