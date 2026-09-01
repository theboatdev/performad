import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import type { File } from "formidable";
import fs from "fs";
import path from "path";
import { verifySessionToken } from "./login";

export const config = {
  api: {
    bodyParser: false,
  },
};

function isAuthenticated(req: NextApiRequest): boolean {
  const token = req.cookies["admin_session"];
  return !!token && verifySessionToken(token);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ ok: false, message: "Unauthorized" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = new IncomingForm({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024,
    filter: ({ mimetype }) => !!mimetype && mimetype.startsWith("image/"),
  });

  form.parse(req, (err, _fields, files) => {
    if (err) {
      return res.status(500).json({ ok: false, message: "Upload failed: " + err.message });
    }

    const fileEntry = files.file;
    const file = (Array.isArray(fileEntry) ? fileEntry[0] : fileEntry) as File | undefined;

    if (!file) {
      return res.status(400).json({ ok: false, message: "No file uploaded" });
    }

    const ext = path.extname(file.originalFilename ?? ".jpg");
    const newFilename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    const newPath = path.join(uploadDir, newFilename);

    fs.renameSync(file.filepath, newPath);

    const publicUrl = `/uploads/${newFilename}`;
    return res.status(200).json({ ok: true, url: publicUrl });
  });
}