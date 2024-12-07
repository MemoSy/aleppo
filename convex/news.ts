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
  handler: async (ctx) => {
    const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000;

    return await ctx.db
      .query("news")
      
      .filter((q) => q.gte(q.field("createdAt"), twentyFourHoursAgo))
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
