import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../contentManagementSystem/lib/mongodb";
import ContactUs from "../../../contentManagementSystem/models/ContactUs";
import { ContactUsSchema } from "../../../contentManagementSystem/schemas/contactUs.schema";
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

  // GET — fetch current contact us content
  if (req.method === "GET") {
    try {
      const doc = await ContactUs.findOne({ isDeleted: false }).lean();
      return res.status(200).json({ ok: true, data: doc ?? null });
    } catch (err) {
      return res.status(500).json({ ok: false, message: "Failed to fetch data" });
    }
  }

  // POST — create new content
  if (req.method === "POST") {
    try {
      const parsed = ContactUsSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ ok: false, message: "Validation failed", errors: parsed.error.flatten() });
      }

      // Soft delete any existing docs
      await ContactUs.updateMany({}, { isDeleted: true, deletedAt: new Date() });

      const doc = await ContactUs.create(parsed.data);
      return res.status(201).json({ ok: true, data: doc });
    } catch (err) {
      return res.status(500).json({ ok: false, message: "Failed to create data" });
    }
  }

  // PUT — update existing content
  if (req.method === "PUT") {
    try {
      const parsed = ContactUsSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ ok: false, message: "Validation failed", errors: parsed.error.flatten() });
      }

      let doc = await ContactUs.findOne({ isDeleted: false });

      if (!doc) {
        doc = await ContactUs.create(parsed.data);
        return res.status(201).json({ ok: true, data: doc });
      }

      Object.assign(doc, parsed.data);
      await doc.save();
      return res.status(200).json({ ok: true, data: doc });
    } catch (err) {
      return res.status(500).json({ ok: false, message: "Failed to update data" });
    }
  }

  return res.status(405).json({ ok: false, message: "Method not allowed" });
}