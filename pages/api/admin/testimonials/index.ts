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

  if (req.method === "GET") {
    try {
      const testimonials = await Testimonial.find({ isDeleted: false }).sort({ createdAt: -1 }).lean();
      return res.status(200).json({ ok: true, data: testimonials });
    } catch (error) {
      console.error("Testimonials GET error:", error);
      return res.status(500).json({ ok: false, message: "Failed to fetch testimonials" });
    }
  }

  if (req.method === "POST") {
    try {
      const parsed = TestimonialSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          ok: false,
          message: "Validation failed",
          errors: parsed.error.flatten(),
        });
      }

      const testimonial = await Testimonial.create(parsed.data);

      return res.status(201).json({ ok: true, data: testimonial });
    } catch (error) {
      console.error("Testimonials POST error:", error);
      return res.status(500).json({ ok: false, message: "Failed to create testimonial" });
    }
  }

  return res.status(405).json({ ok: false, message: "Method not allowed" });
}
