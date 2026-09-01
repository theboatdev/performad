import type { NextApiRequest, NextApiResponse } from "next";
import { ZodObject, ZodRawShape } from "zod";
import dbConnect from "@/contentManagementSystem/lib/mongodb";
import Career from "@/contentManagementSystem/models/Career";
import { JobOpeningSchema } from "@/contentManagementSystem/schemas/career.schema";

interface ResourceConfig {
  field: "jobOpenings";
  schema: ZodObject<ZodRawShape>;
}

const resourceConfig: Record<string, ResourceConfig> = {
  jobOpenings: { field: "jobOpenings", schema: JobOpeningSchema },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const resourceParam = req.query.resource;

  if (!resourceParam || Array.isArray(resourceParam)) {
    return res.status(400).json({ error: "Missing resource" });
  }

  const config = resourceConfig[resourceParam];
  if (!config) {
    return res.status(404).json({ error: "Unsupported resource" });
  }

  try {
    await dbConnect();

    switch (req.method) {
      case "GET":
        return await handleGet(req, res, config);
      case "POST":
        return await handlePost(req, res, config);
      case "PUT":
        return await handlePut(req, res, config);
      case "DELETE":
        return await handleDelete(req, res, config);
      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Career resource API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function handleGet(
  req: NextApiRequest,
  res: NextApiResponse,
  config: ResourceConfig
) {
  const careerId = getCareerId(req, res);
  if (!careerId) {
    return;
  }

  const itemId = getOptionalItemId(req, res);
  if (itemId === undefined) {
    return;
  }

  const record = await Career.findOne({ _id: careerId, isDeleted: false })
    .select(config.field)
    .lean();

  if (!record) {
    return res.status(404).json({ error: "Career entry not found" });
  }

  const collection = (record as Record<string, unknown[]>)[config.field] || [];

  if (!itemId) {
    return res.status(200).json(collection);
  }

  const found = collection.find((entry: any) => {
    return entry?._id?.toString() === itemId;
  });

  if (!found) {
    return res.status(404).json({ error: "Resource item not found" });
  }

  return res.status(200).json(found);
}

async function handlePost(
  req: NextApiRequest,
  res: NextApiResponse,
  config: ResourceConfig
) {
  const careerId = getCareerId(req, res);
  if (!careerId) {
    return;
  }

  const parsed = config.schema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ error: "Validation failed", details: parsed.error.flatten() });
  }

  const updated = await Career.findOneAndUpdate(
    { _id: careerId, isDeleted: false },
    { $push: { [config.field]: parsed.data } },
    { new: true, runValidators: true, select: config.field }
  ).lean();

  if (!updated) {
    return res.status(404).json({ error: "Career entry not found" });
  }

  return res.status(201).json(
    (updated as Record<string, unknown[]>)[config.field] || []
  );
}

async function handlePut(
  req: NextApiRequest,
  res: NextApiResponse,
  config: ResourceConfig
) {
  const careerId = getCareerId(req, res);
  if (!careerId) {
    return;
  }

  const itemId = getRequiredItemId(req, res);
  if (!itemId) {
    return;
  }

  const parsed = config.schema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ error: "Validation failed", details: parsed.error.flatten() });
  }

  const updateFields = buildUpdateFields(config.field, parsed.data);
  if (!Object.keys(updateFields).length) {
    return res.status(400).json({ error: "No fields to update" });
  }

  const updated = await Career.findOneAndUpdate(
    {
      _id: careerId,
      isDeleted: false,
      [`${config.field}._id`]: itemId,
    },
    { $set: updateFields },
    { new: true, runValidators: true, select: config.field }
  ).lean();

  if (!updated) {
    return res.status(404).json({ error: "Resource item not found" });
  }

  return res.status(200).json(
    (updated as Record<string, unknown[]>)[config.field] || []
  );
}

async function handleDelete(
  req: NextApiRequest,
  res: NextApiResponse,
  config: ResourceConfig
) {
  const careerId = getCareerId(req, res);
  if (!careerId) {
    return;
  }

  const itemId = getRequiredItemId(req, res);
  if (!itemId) {
    return;
  }

  const updated = await Career.findOneAndUpdate(
    { _id: careerId, isDeleted: false },
    { $pull: { [config.field]: { _id: itemId } } },
    { new: true, select: config.field }
  ).lean();

  if (!updated) {
    return res.status(404).json({ error: "Resource item not found" });
  }

  return res.status(200).json(
    (updated as Record<string, unknown[]>)[config.field] || []
  );
}

function getCareerId(req: NextApiRequest, res: NextApiResponse) {
  const careerId = req.query.careerId;
  if (!careerId || Array.isArray(careerId)) {
    res.status(400).json({ error: "Missing careerId" });
    return null;
  }
  return careerId;
}

function getOptionalItemId(req: NextApiRequest, res: NextApiResponse) {
  const itemId = req.query.itemId;
  if (Array.isArray(itemId)) {
    res.status(400).json({ error: "Provide a single itemId" });
    return undefined;
  }
  return itemId ?? null;
}

function getRequiredItemId(req: NextApiRequest, res: NextApiResponse) {
  const itemId = req.query.itemId;
  if (!itemId || Array.isArray(itemId)) {
    res.status(400).json({ error: "Missing itemId" });
    return null;
  }
  return itemId;
}

function buildUpdateFields(field: string, data: Record<string, unknown>) {
  const updateFields: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    if (value === undefined) {
      continue;
    }
    updateFields[`${field}.$.${key}`] = value;
  }

  return updateFields;
}
