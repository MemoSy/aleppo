import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new news item
export const createNews = mutation({
  args: {
    text: v.string(),
    ministry: v.string(),
    area: v.string(),
    adress: v.string(),
    isPublic: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("complaints", {
      text: args.text,
      ministry: args.ministry,
      area: args.area,
      createdAt: Date.now(),
      isPublic: args.isPublic,
      adress: args.adress,
    });
  },
});

// get all complaints
export const getComplaints = query({
  handler: async (ctx) => {
    // Get 10 complaints

    return await ctx.db
      .query("complaints")
      .filter((q) => q.eq(q.field("isPublic"), true))
      .take(10);
  },
});

// get all complaints
export const getAllComplaints = query({
  handler: async (ctx) => {
    // Get 10 complaints

    return await ctx.db.query("complaints").collect();
  },
});

// get complaints by ministry and if they are public
export const getComplaintsByMinistry = query({
  args: { ministry: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("complaints")
      .filter((q) => q.eq(q.field("ministry"), args.ministry))
      .filter((q) => q.eq(q.field("isPublic"), true))
      .collect();
  },
});

// New query to get total number of complaints
export const getComplaintsCount = query({
  handler: async (ctx) => {
    const complaints = await ctx.db.query("complaints").collect();
    return complaints.length;
  },
});

// New query to get number of complaints for a specific ministry
export const getComplaintsCountByMinistry = query({
  args: { ministry: v.string() },
  handler: async (ctx, args) => {
    const complaints = await ctx.db
      .query("complaints")
      .filter((q) => q.eq(q.field("ministry"), args.ministry))
      .collect();
    return complaints.length;
  },
});
