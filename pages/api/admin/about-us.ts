import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../contentManagementSystem/lib/mongodb";
import AboutUs from "../../../contentManagementSystem/models/AboutUs";
import { AboutUsSchema } from "../../../contentManagementSystem/schemas/aboutUs.schema";
import { verifySessionToken } from "./login";

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
      const doc = await AboutUs.findOne({ isDeleted: false }).lean();
      return res.status(200).json({ ok: true, data: doc ?? null });
    } catch {
      return res.status(500).json({ ok: false, message: "Failed to fetch data" });
    }
  }

  if (req.method === "PUT") {
    try {
      const parsed = AboutUsSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ ok: false, message: "Validation failed", errors: parsed.error.flatten() });
      }

      let doc = await AboutUs.findOne({ isDeleted: false });
      if (!doc) {
        doc = await AboutUs.create(parsed.data);
        return res.status(201).json({ ok: true, data: doc });
      }

      Object.assign(doc, parsed.data);
      await doc.save();
      return res.status(200).json({ ok: true, data: doc });
    } catch {
      return res.status(500).json({ ok: false, message: "Failed to update data" });
    }
  }

  return res.status(405).json({ ok: false, message: "Method not allowed" });
}