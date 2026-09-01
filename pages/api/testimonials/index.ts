import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../contentManagementSystem/lib/mongodb";
import Testimonial from "../../../contentManagementSystem/models/Testimonial";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  try {
    await dbConnect();
    const testimonials = await Testimonial.find({ isDeleted: false }).sort({ createdAt: -1 }).lean();
    return res.status(200).json({ ok: true, data: testimonials });
  } catch (error) {
    console.error("Public Testimonials GET error:", error);
    return res.status(500).json({ ok: false, message: "Failed to fetch testimonials" });
  }
}
