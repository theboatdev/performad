import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/contentManagementSystem/lib/mongodb";
import AboutUs from "@/contentManagementSystem/models/AboutUs";
import { AboutUsSchema } from "@/contentManagementSystem/schemas/aboutUs.schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET":
        return await handleGet(req, res);
      case "POST":
        return await handlePost(req, res);
      case "PUT":
        return await handlePut(req, res);
      case "DELETE":
        return await handleDelete(req, res);
      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("AboutUs API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query;

  if (id) {
    if (Array.isArray(id)) {
      return res.status(400).json({ error: "Provide a single id" });
    }

    const record = await AboutUs.findOne({ _id: id, isDeleted: false }).lean();
    if (!record) {
      return res.status(404).json({ error: "About Us entry not found" });
    }
    return res.status(200).json(record);
  }

  const records = await AboutUs.find({ isDeleted: false }).lean();
  return res.status(200).json(records);
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const parsed = AboutUsSchema.safeParse(req.body);

  if (!parsed.success) {
    return res
      .status(400)
      .json({ error: "Validation failed", details: parsed.error.flatten() });
  }

  await dbConnect();
  const created = await AboutUs.create(parsed.data);

  return res.status(201).json(created);
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Missing id" });
  }

  const parsed = AboutUsSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ error: "Validation failed", details: parsed.error.flatten() });
  }

  await dbConnect();
  const updated = await AboutUs.findOneAndUpdate(
    { _id: id, isDeleted: false },
    parsed.data,
    {
      new: true,
      runValidators: true,
    }
  ).lean();

  if (!updated) {
    return res.status(404).json({ error: "About Us entry not found" });
  }

  return res.status(200).json(updated);
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Missing id" });
  }

  await dbConnect();
  const deleted = await AboutUs.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true, deletedAt: new Date() },
    { new: true }
  ).lean();

  if (!deleted) {
    return res.status(404).json({ error: "About Us entry not found" });
  }

  return res.status(200).json({ success: true });
}