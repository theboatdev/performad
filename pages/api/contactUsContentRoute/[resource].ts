import type { NextApiRequest, NextApiResponse } from "next";
import { ZodObject, ZodRawShape } from "zod";
import dbConnect from "@/contentManagementSystem/lib/mongodb";
import ContactUs from "@/contentManagementSystem/models/ContactUs";
import {
  FAQSchema,
  OfficeSchema,
} from "@/contentManagementSystem/schemas/contactUs.schema";

interface ResourceConfig {
  field: "offices" | "faqs";
  schema: ZodObject<ZodRawShape>;
}

const resourceConfig: Record<string, ResourceConfig> = {
  offices: { field: "offices", schema: OfficeSchema },
  faqs: { field: "faqs", schema: FAQSchema },
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
    console.error("ContactUs resource API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function handleGet(
  req: NextApiRequest,
  res: NextApiResponse,
  config: ResourceConfig
) {
  const contactUsId = getContactUsId(req, res);
  if (!contactUsId) {
    return;
  }

  const itemId = getOptionalItemId(req, res);
  if (itemId === undefined) {
    return;
  }

  const record = await ContactUs.findOne({ _id: contactUsId, isDeleted: false })
    .select(config.field)
    .lean();

  if (!record) {
    return res.status(404).json({ error: "Contact Us entry not found" });
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
  const contactUsId = getContactUsId(req, res);
  if (!contactUsId) {
    return;
  }

  const parsed = config.schema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ error: "Validation failed", details: parsed.error.flatten() });
  }

  const updated = await ContactUs.findOneAndUpdate(
    { _id: contactUsId, isDeleted: false },
    { $push: { [config.field]: parsed.data } },
    { new: true, runValidators: true, select: config.field }
  ).lean();

  if (!updated) {
    return res.status(404).json({ error: "Contact Us entry not found" });
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
  const contactUsId = getContactUsId(req, res);
  if (!contactUsId) {
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

  const updated = await ContactUs.findOneAndUpdate(
    {
      _id: contactUsId,
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
  const contactUsId = getContactUsId(req, res);
  if (!contactUsId) {
    return;
  }

  const itemId = getRequiredItemId(req, res);
  if (!itemId) {
    return;
  }

  const updated = await ContactUs.findOneAndUpdate(
    { _id: contactUsId, isDeleted: false },
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

function getContactUsId(req: NextApiRequest, res: NextApiResponse) {
  const contactUsId = req.query.contactUsId;
  if (!contactUsId || Array.isArray(contactUsId)) {
    res.status(400).json({ error: "Missing contactUsId" });
    return null;
  }
  return contactUsId;
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
