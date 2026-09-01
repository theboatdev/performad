import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../contentManagementSystem/lib/mongodb";
import Blog from "../../../../contentManagementSystem/models/Blog";
import { BlogSchema } from "../../../../contentManagementSystem/schemas/blog.schema";
import { verifySessionToken } from "../login";

function isAuthenticated(req: NextApiRequest): boolean {
  const token = req.cookies["admin_session"];
  return !!token && verifySessionToken(token);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ ok: false, message: "Unauthorized" });
  }

  await dbConnect();

  if (req.method === "GET") {
    try {
      const blogs = await Blog.find({ isDeleted: false }).sort({ publishedAt: -1, createdAt: -1 }).lean();
      return res.status(200).json({ ok: true, data: blogs });
    } catch (error) {
      console.error("Blogs GET error:", error);
      return res.status(500).json({ ok: false, message: "Failed to fetch blogs" });
    }
  }

  if (req.method === "POST") {
    try {
      const parsed = BlogSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          ok: false,
          message: "Validation failed",
          errors: parsed.error.flatten(),
        });
      }

      const existing = await Blog.findOne({
        slug: parsed.data.slug,
        isDeleted: false,
      }).lean();

      if (existing) {
        return res.status(409).json({
          ok: false,
          message: "A blog with this slug already exists",
        });
      }

      const blog = await Blog.create({
        ...parsed.data,
        publishedAt: new Date(parsed.data.publishedAt),
      });

      return res.status(201).json({ ok: true, data: blog });
    } catch (error) {
      console.error("Blogs POST error:", error);
      return res.status(500).json({ ok: false, message: "Failed to create blog" });
    }
  }

  return res.status(405).json({ ok: false, message: "Method not allowed" });
}
