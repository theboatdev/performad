import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../contentManagementSystem/lib/mongodb";
import Testimonial from "../../../../contentManagementSystem/models/Testimonial";
import { TestimonialSchema } from "../../../../contentManagementSystem/schemas/testimonial.schema";
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

  if (req.method === "PUT") {
    try {
      const parsed = TestimonialSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          ok: false,
          message: "Validation failed",
          errors: parsed.error.flatten(),
        });
      }

      const updated = await Testimonial.findOneAndUpdate(
        { _id: id, isDeleted: false },
        parsed.data,
        { new: true }
      );

      if (!updated) {
        return res.status(404).json({ ok: false, message: "Testimonial not found" });
      }

      return res.status(200).json({ ok: true, data: updated });
    } catch (error) {
      console.error("Testimonial PUT error:", error);
      return res.status(500).json({ ok: false, message: "Failed to update testimonial" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const deleted = await Testimonial.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isDeleted: true, deletedAt: new Date() },
        { new: true }
      );

      if (!deleted) {
        return res.status(404).json({ ok: false, message: "Testimonial not found" });
      }

      return res.status(200).json({ ok: true, message: "Deleted successfully" });
    } catch (error) {
      console.error("Testimonial DELETE error:", error);
      return res.status(500).json({ ok: false, message: "Failed to delete testimonial" });
    }
  }

  return res.status(405).json({ ok: false, message: "Method not allowed" });
}
