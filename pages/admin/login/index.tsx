import type { NextPage } from "next";
import { useMemo, useState } from "react";
import { useRouter } from "next/router";

const AdminLoginPage: NextPage = () => {
  const router = useRouter();

  const nextUrl = useMemo(() => {
    if (!router.isReady) return "/admin";

    const nextParam = router.query.next;
    const next =
      typeof nextParam === "string" && nextParam.trim().length > 0
        ? nextParam
        : "/admin";

    if (!next.startsWith("/")) return "/admin";
    if (next.startsWith("/admin/login")) return "/admin"; // prevent loop

    return next;
  }, [router.isReady, router.query.next]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValidEmail = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const emailTrim = email.trim();

    if (!emailTrim || !password) {
      setError("Please enter both email and password.");
      return;
    }

    if (!isValidEmail(emailTrim)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailTrim, password }),
      });

      const data = (await res.json()) as { ok: boolean; message?: string };

      if (!res.ok || !data.ok) {
        setError(data.message || "Login failed. Please try again.");
        return;
      }

      router.replace(nextUrl);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.badge}>Admin</div>
          <h1 style={styles.title}>Sign in</h1>
          <p style={styles.subtitle}>Use your admin credentials to continue.</p>
        </div>

        <form onSubmit={onSubmit} style={styles.form}>
          <label style={styles.label}>
            Email
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@company.com"
              autoComplete="email"
              inputMode="email"
              style={styles.input}
              disabled={loading}
            />
          </label>

          <label style={styles.label}>
            Password
            <div style={styles.passwordWrap}>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                type={showPw ? "text" : "password"}
                autoComplete="current-password"
                style={{ ...styles.input, paddingRight: 44 }}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                style={styles.pwBtn}
                aria-label={showPw ? "Hide password" : "Show password"}
                disabled={loading}
              >
                {showPw ? "🙈" : "👁️"}
              </button>
            </div>
          </label>

          {error ? <div style={styles.error}>{error}</div> : null}

          <button type="submit" style={styles.submit} disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: 16,
    background:
      "radial-gradient(1200px 600px at 20% 10%, rgba(59,130,246,0.18), transparent 55%), radial-gradient(1000px 500px at 90% 30%, rgba(168,85,247,0.18), transparent 60%), #0b1020",
    color: "#e5e7eb",
    fontFamily: "ui-sans-serif, system-ui, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    borderRadius: 20,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 18px 50px rgba(0,0,0,0.45)",
    padding: 32,
  },
  header: { marginBottom: 16 },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.06)",
    fontSize: 12,
    marginBottom: 10,
  },
  title: { fontSize: 26, margin: "6px 0 6px" },
  subtitle: { margin: 0, opacity: 0.8, fontSize: 14 },
  form: { display: "grid", gap: 12, marginTop: 16 },
  label: { display: "grid", gap: 6, fontSize: 13, opacity: 0.95 },
  input: {
    width: "100%",
    padding: "12px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(0,0,0,0.22)",
    color: "#e5e7eb",
    outline: "none",
    fontSize: 14,
    boxSizing: "border-box",
  },
  passwordWrap: { position: "relative" },
  pwBtn: {
    position: "absolute",
    right: 8,
    top: "50%",
    transform: "translateY(-50%)",
    height: 34,
    width: 34,
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.06)",
    color: "#e5e7eb",
    cursor: "pointer",
  },
  error: {
    borderRadius: 12,
    padding: "10px 12px",
    background: "rgba(239,68,68,0.12)",
    border: "1px solid rgba(239,68,68,0.35)",
    color: "#fecaca",
    fontSize: 13,
  },
  submit: {
    marginTop: 6,
    padding: "12px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(59,130,246,0.9)",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: 15,
  },
};
