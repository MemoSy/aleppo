import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
export default defineSchema({
  tags: defineTable({
    content: v.string(),
    author: v.string(),
    categorys: v.string(),
  }),
  news: defineTable({
    text: v.string(),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),
  complaints: defineTable({
    text: v.string(),
    createdAt: v.number(),
    ministry: v.string(),
    area: v.string(),
    adress: v.string(),
    isPublic: v.boolean(),
  }).index("by_createdAt", ["createdAt"]),
});
