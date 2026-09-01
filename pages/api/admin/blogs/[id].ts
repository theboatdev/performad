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

  const { id } = req.query;
  const blogId = Array.isArray(id) ? id[0] : id;

  if (!blogId) {
    return res.status(400).json({ ok: false, message: "Blog id is required" });
  }

  if (req.method === "PUT") {
    try {
      const parsed = BlogSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          ok: false,
          message: "Validation failed",
          errors: parsed.error.flatten(),
        });
      }

      const duplicate = await Blog.findOne({
        slug: parsed.data.slug,
        isDeleted: false,
        _id: { $ne: blogId },
      }).lean();

      if (duplicate) {
        return res.status(409).json({
          ok: false,
          message: "A blog with this slug already exists",
        });
      }

      const updated = await Blog.findOneAndUpdate(
        { _id: blogId, isDeleted: false },
        {
          ...parsed.data,
          publishedAt: new Date(parsed.data.publishedAt),
        },
        { new: true }
      );

      if (!updated) {
        return res.status(404).json({ ok: false, message: "Blog not found" });
      }

      return res.status(200).json({ ok: true, data: updated });
    } catch (error) {
      console.error("Blogs PUT error:", error);
      return res.status(500).json({ ok: false, message: "Failed to update blog" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const deleted = await Blog.findOneAndUpdate(
        { _id: blogId, isDeleted: false },
        { isDeleted: true, deletedAt: new Date() },
        { new: true }
      );

      if (!deleted) {
        return res.status(404).json({ ok: false, message: "Blog not found" });
      }

      return res.status(200).json({ ok: true });
    } catch (error) {
      console.error("Blogs DELETE error:", error);
      return res.status(500).json({ ok: false, message: "Failed to delete blog" });
    }
  }

  return res.status(405).json({ ok: false, message: "Method not allowed" });
}
