import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Clear the session cookie
  res.setHeader(
    "Set-Cookie",
    "admin_session=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax"
  );
  return res.status(200).json({ ok: true });
}