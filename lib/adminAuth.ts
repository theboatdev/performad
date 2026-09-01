import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import crypto from "crypto";

const SESSION_SECRET =
  process.env.SESSION_SECRET ?? "change-this-secret-in-env";

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

/**
 * Wrap your admin page's getServerSideProps with this to require login.
 *
 * Usage:
 *   export const getServerSideProps = requireAdminAuth(async (ctx) => {
 *     return { props: { ... } };
 *   });
 */
export function requireAdminAuth<P extends Record<string, unknown>>(
  handler: (
    ctx: GetServerSidePropsContext
  ) => Promise<GetServerSidePropsResult<P>>
) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const token = ctx.req.cookies["admin_session"];

    if (!token || !verifySessionToken(token)) {
      // Prevent redirect loop — never send user back to login page as "next"
      const currentPath =
        ctx.resolvedUrl && !ctx.resolvedUrl.startsWith("/admin/login")
          ? ctx.resolvedUrl
          : "/admin";

      return {
        redirect: {
          destination: `/admin/login?next=${encodeURIComponent(currentPath)}`,
          permanent: false,
        },
      };
    }

    return handler(ctx);
  };
}