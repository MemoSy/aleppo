import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new news item
export const createNews = mutation({
  args: {
    text: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("news", {
      text: args.text,
      createdAt: Date.now(),
    });
  },
});

// Get current news (not older than 24 hours)
export const getCurrentNews = query({
  args: { category: v.optional(v.string()) }, // Make category optional
  handler: async (ctx, args) => {
    // If no category is provided, return all tags ordered by creation date
    if (!args.category) {
      return await ctx.db
        .query("tags")
        .withIndex("by_creation_time")
        .order("asc")
        .collect();
    }

    // If category is provided, filter by category and order by creation date
    return await ctx.db
      .query("tags")
      .filter((q) => q.eq(q.field("categorys"), args.category))
      .withIndex("by_creation_time")
      .order("asc")
      .collect();
  },
});

// Manually delete old news (you can call this periodically or when needed)
export const deleteOldNews = mutation({
  handler: async (ctx) => {
    const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000;

    const oldNews = await ctx.db
      .query("news")
      .filter((q) => q.lt(q.field("createdAt"), twentyFourHoursAgo))
      .collect();

    for (const news of oldNews) {
      await ctx.db.delete(news._id);
    }
  },
});

export const deleteNew = mutation({
  args: { id: v.any() },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
