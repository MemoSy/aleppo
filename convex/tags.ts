import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createTags = mutation({
  args: {
    content: v.string(),
    author: v.string(),
    categorys: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("tags", {
      content: args.content,
      author: args.author,
      categorys: args.categorys,
    });
  },
});

export const getTags = query({
  args: { category: v.optional(v.string()) }, // Make category optional
  handler: async (ctx, args) => {
    // If no category is provided, return all tags
    if (!args.category) {
      return await ctx.db.query("tags").collect();
    }

    // If category is provided, filter by category
    return await ctx.db
      .query("tags")
      .filter((q) => q.eq(q.field("categorys"), args.category))

      .collect();
  },
});

export const deleteTag = mutation({
  args: { id: v.any() },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const updateTag = mutation({
  args: {
    id: v.any(),
    content: v.optional(v.string()),
    author: v.optional(v.string()),
    categorys: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      content: args.content,
      author: args.author,
      categorys: args.categorys,
    });
  },
});

export const getTagsByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("tags")
      .filter((q) => q.eq(q.field("categorys"), args.category))
      .collect();
  },
});
