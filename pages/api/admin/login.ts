import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";
const SESSION_SECRET = process.env.SESSION_SECRET ?? "change-this-secret-in-env";

// Max age: 8 hours
const SESSION_MAX_AGE = 60 * 60 * 8;

function createSessionToken(email: string): string {
  const expires = Date.now() + SESSION_MAX_AGE * 1000;
  const payload = `${email}:${expires}`;
  const sig = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payload)
    .digest("hex");
  return Buffer.from(`${payload}:${sig}`).toString("base64");
}

export function verifySessionToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf8");
    const lastColon = decoded.lastIndexOf(":");
    const payload = decoded.slice(0, lastColon);
    const sig = decoded.slice(lastColon + 1);

    const expectedSig = crypto
      .createHmac("sha256", SESSION_SECRET)
      .update(payload)
      .digest("hex");

    if (sig !== expectedSig) return false;

    const parts = payload.split(":");
    const expires = parseInt(parts[parts.length - 1], 10);
    if (Date.now() > expires) return false;

    return true;
  } catch {
    return false;
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    return res.status(500).json({
      ok: false,
      message: "Server is not configured. Set ADMIN_EMAIL and ADMIN_PASSWORD in .env.local",
    });
  }

  const { email, password } = req.body as { email?: string; password?: string };

  const emailMatch =
    typeof email === "string" &&
    email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase();

  const passwordMatch =
    typeof password === "string" && password === ADMIN_PASSWORD;

  if (!emailMatch || !passwordMatch) {
    // Intentionally vague error message
    return res.status(401).json({ ok: false, message: "Invalid email or password." });
  }

  const token = createSessionToken(ADMIN_EMAIL);

  res.setHeader(
    "Set-Cookie",
    `admin_session=${token}; HttpOnly; Path=/; Max-Age=${SESSION_MAX_AGE}; SameSite=Lax${
      process.env.NODE_ENV === "production" ? "; Secure" : ""
    }`
  );

  return res.status(200).json({ ok: true });
}