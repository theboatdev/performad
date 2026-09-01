import type { GetServerSideProps, NextPage } from "next";
import { requireAdminAuth } from "../../../lib/adminAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ImageUpload from "../../../components/admin/ImageUpload";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Service {
  title: string;
  description: string;
  link: string;
}
interface Stat {
  value: string;
  label: string;
}
interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin: string;
}
interface Testimonial {
  text: string;
  name: string;
  role: string;
  image: string;
}
interface CoreValue {
  title: string;
  description: string;
}

interface AboutUsForm {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  services: Service[];
  stats: Stat[];
  team: TeamMember[];
  testimonials: Testimonial[];
  contentHeading: string;
  contentDescription: string;
  coreValues: CoreValue[];
}

const defaultForm = (): AboutUsForm => ({
  heroTitle: "",
  heroSubtitle: "",
  heroDescription: "",
  services: [{ title: "", description: "", link: "" }],
  stats: [{ value: "", label: "" }],
  team: [{ name: "", role: "", image: "", linkedin: "" }],
  testimonials: [{ text: "", name: "", role: "", image: "" }],
  contentHeading: "",
  contentDescription: "",
  coreValues: [{ title: "", description: "" }],
});

type Tab =
  | "hero"
  | "services"
  | "stats"
  | "team"
  | "testimonials"
  | "content"
  | "corevalues";

const TABS: { key: Tab; label: string }[] = [
  { key: "hero", label: "Hero" },
  { key: "services", label: "Services" },
  { key: "stats", label: "Stats" },
  { key: "team", label: "Team" },
  { key: "testimonials", label: "Testimonials" },
  { key: "content", label: "Content" },
  { key: "corevalues", label: "Core Values" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
const AboutUsAdmin: NextPage = () => {
  const router = useRouter();
  const [form, setForm] = useState<AboutUsForm>(defaultForm());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("hero");

  useEffect(() => {
    fetch("/api/admin/about-us")
      .then((r) => r.json())
      .then((res) => {
        if (res.ok && res.data) {
          const d = res.data;
          setForm({
            heroTitle: d.heroTitle ?? "",
            heroSubtitle: d.heroSubtitle ?? "",
            heroDescription: d.heroDescription ?? "",
            services: d.services?.length
              ? d.services
              : [{ title: "", description: "", link: "" }],
            stats: d.stats?.length ? d.stats : [{ value: "", label: "" }],
            team: d.team?.length
              ? d.team
              : [{ name: "", role: "", image: "", linkedin: "" }],
            testimonials: d.testimonials?.length
              ? d.testimonials
              : [{ text: "", name: "", role: "", image: "" }],
            contentHeading: d.contentHeading ?? "",
            contentDescription: d.contentDescription ?? "",
            coreValues: d.coreValues?.length
              ? d.coreValues
              : [{ title: "", description: "" }],
          });
        }
      })
      .catch(() => showToast("Failed to load data", "error"))
      .finally(() => setLoading(false));
  }, []);

  function showToast(msg: string, type: "success" | "error") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/about-us", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok)
        showToast(data.message ?? "Save failed", "error");
      else showToast("Saved successfully!", "success");
    } catch {
      showToast("Network error. Try again.", "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  // ── Array helpers ──────────────────────────────────────────────────────────
  function updateItem<T>(
    key: keyof AboutUsForm,
    i: number,
    field: keyof T,
    value: string
  ) {
    setForm((f) => {
      const arr = [...(f[key] as T[])];
      arr[i] = { ...arr[i], [field]: value };
      return { ...f, [key]: arr };
    });
  }
  function addItem<T>(key: keyof AboutUsForm, empty: T) {
    setForm((f) => ({ ...f, [key]: [...(f[key] as T[]), empty] }));
  }
  function removeItem(key: keyof AboutUsForm, i: number) {
    setForm((f) => ({
      ...f,
      [key]: (f[key] as any[]).filter((_, idx) => idx !== i),
    }));
  }

  if (loading) {
    return (
      <div style={s.page}>
        <div style={s.loadingWrap}>
          <p style={{ color: "#94a3b8" }}>Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      {toast && (
        <div
          style={{
            ...s.toast,
            background:
              toast.type === "success"
                ? "rgba(34,197,94,0.15)"
                : "rgba(239,68,68,0.15)",
            borderColor:
              toast.type === "success"
                ? "rgba(34,197,94,0.4)"
                : "rgba(239,68,68,0.4)",
            color: toast.type === "success" ? "#86efac" : "#fca5a5",
          }}
        >
          {toast.type === "success" ? "✓" : "✕"} {toast.msg}
        </div>
      )}

      {/* Header */}
      <header style={s.header}>
        <div style={s.headerLeft}>
          <div style={s.breadcrumb}>
            <span
              style={s.breadcrumbLink}
              onClick={() => router.push("/admin")}
            >
              Dashboard
            </span>
            <span style={{ opacity: 0.4 }}>/</span>
            <span>About Us</span>
          </div>
          <h1 style={s.pageTitle}>About Us Content</h1>
        </div>
        <div style={s.headerRight}>
          <button style={s.saveBtn} onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button style={s.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div style={s.tabs}>
        {TABS.map((tab) => (
          <button
            key={tab.key}
            style={{ ...s.tab, ...(activeTab === tab.key ? s.tabActive : {}) }}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={s.content}>
        {/* ── Hero ── */}
        {activeTab === "hero" && (
          <div style={s.section}>
            <h2 style={s.sectionTitle}>Hero Section</h2>
            <div style={s.grid2}>
              <Field label="Hero Title">
                <Input
                  value={form.heroTitle}
                  onChange={(v) => setForm((f) => ({ ...f, heroTitle: v }))}
                  placeholder="We Are Developers"
                />
              </Field>
              <Field label="Hero Subtitle">
                <Input
                  value={form.heroSubtitle}
                  onChange={(v) => setForm((f) => ({ ...f, heroSubtitle: v }))}
                  placeholder="Who Are We?"
                />
              </Field>
            </div>
            <Field label="Hero Description">
              <Textarea
                value={form.heroDescription}
                onChange={(v) => setForm((f) => ({ ...f, heroDescription: v }))}
                placeholder="We help ambitious companies..."
                rows={3}
              />
            </Field>
          </div>
        )}

        {/* ── Services ── */}
        {activeTab === "services" && (
          <div style={s.section}>
            <div style={s.sectionHeader}>
              <h2 style={s.sectionTitle}>Services</h2>
              <button
                style={s.addBtn}
                onClick={() =>
                  addItem("services", { title: "", description: "", link: "" })
                }
              >
                + Add Service
              </button>
            </div>
            {form.services.map((item, i) => (
              <div key={i} style={s.card}>
                <CardHeader
                  label={`Service ${i + 1}`}
                  showRemove={form.services.length > 1}
                  onRemove={() => removeItem("services", i)}
                />
                <div style={s.grid2}>
                  <Field label="Title">
                    <Input
                      value={item.title}
                      onChange={(v) =>
                        updateItem<Service>("services", i, "title", v)
                      }
                      placeholder="Web Designing"
                    />
                  </Field>
                  <Field label="Link">
                    <Input
                      value={item.link}
                      onChange={(v) =>
                        updateItem<Service>("services", i, "link", v)
                      }
                      placeholder="/services/web"
                    />
                  </Field>
                </div>
                <Field label="Description">
                  <Textarea
                    value={item.description}
                    onChange={(v) =>
                      updateItem<Service>("services", i, "description", v)
                    }
                    placeholder="Service description..."
                    rows={2}
                  />
                </Field>
              </div>
            ))}
          </div>
        )}

        {/* ── Stats ── */}
        {activeTab === "stats" && (
          <div style={s.section}>
            <div style={s.sectionHeader}>
              <h2 style={s.sectionTitle}>Stats</h2>
              <button
                style={s.addBtn}
                onClick={() => addItem("stats", { value: "", label: "" })}
              >
                + Add Stat
              </button>
            </div>
            {form.stats.map((item, i) => (
              <div key={i} style={s.card}>
                <CardHeader
                  label={`Stat ${i + 1}`}
                  showRemove={form.stats.length > 1}
                  onRemove={() => removeItem("stats", i)}
                />
                <div style={s.grid2}>
                  <Field label="Value">
                    <Input
                      value={item.value}
                      onChange={(v) => updateItem<Stat>("stats", i, "value", v)}
                      placeholder="500+"
                    />
                  </Field>
                  <Field label="Label">
                    <Input
                      value={item.label}
                      onChange={(v) => updateItem<Stat>("stats", i, "label", v)}
                      placeholder="Happy Clients"
                    />
                  </Field>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Team ── */}
        {activeTab === "team" && (
          <div style={s.section}>
            <div style={s.sectionHeader}>
              <h2 style={s.sectionTitle}>Team Members</h2>
              <button
                style={s.addBtn}
                onClick={() =>
                  addItem("team", {
                    name: "",
                    role: "",
                    image: "",
                    linkedin: "",
                  })
                }
              >
                + Add Member
              </button>
            </div>
            {form.team.map((item, i) => (
              <div key={i} style={s.card}>
                <CardHeader
                  label={`Member ${i + 1}`}
                  showRemove={form.team.length > 1}
                  onRemove={() => removeItem("team", i)}
                />
                <div style={s.grid2}>
                  <Field label="Name">
                    <Input
                      value={item.name}
                      onChange={(v) =>
                        updateItem<TeamMember>("team", i, "name", v)
                      }
                      placeholder="John Doe"
                    />
                  </Field>
                  <Field label="Role">
                    <Input
                      value={item.role}
                      onChange={(v) =>
                        updateItem<TeamMember>("team", i, "role", v)
                      }
                      placeholder="CEO & Co-Founder"
                    />
                  </Field>
                  <ImageUpload
                    label="Image"
                    value={item.image}
                    onChange={(url) => updateItem("team", i, "image", url)}
                  />
                  <Field label="LinkedIn URL">
                    <Input
                      value={item.linkedin}
                      onChange={(v) =>
                        updateItem<TeamMember>("team", i, "linkedin", v)
                      }
                      placeholder="https://linkedin.com/in/..."
                    />
                  </Field>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Testimonials ── */}
        {activeTab === "testimonials" && (
          <div style={s.section}>
            <div style={s.sectionHeader}>
              <h2 style={s.sectionTitle}>Testimonials</h2>
              <button
                style={s.addBtn}
                onClick={() =>
                  addItem("testimonials", {
                    text: "",
                    name: "",
                    role: "",
                    image: "",
                  })
                }
              >
                + Add Testimonial
              </button>
            </div>
            {form.testimonials.map((item, i) => (
              <div key={i} style={s.card}>
                <CardHeader
                  label={`Testimonial ${i + 1}`}
                  showRemove={form.testimonials.length > 1}
                  onRemove={() => removeItem("testimonials", i)}
                />
                <div style={s.grid2}>
                  <Field label="Name">
                    <Input
                      value={item.name}
                      onChange={(v) =>
                        updateItem<Testimonial>("testimonials", i, "name", v)
                      }
                      placeholder="Peter Braun"
                    />
                  </Field>
                  <Field label="Role">
                    <Input
                      value={item.role}
                      onChange={(v) =>
                        updateItem<Testimonial>("testimonials", i, "role", v)
                      }
                      placeholder="Business Owner"
                    />
                  </Field>
                  <ImageUpload
                    label="Image"
                    value={item.image}
                    onChange={(url) => updateItem("testimonials", i, "image", url)}
                  />
                </div>
                <Field label="Testimonial Text">
                  <Textarea
                    value={item.text}
                    onChange={(v) =>
                      updateItem<Testimonial>("testimonials", i, "text", v)
                    }
                    placeholder="Great experience working with..."
                    rows={3}
                  />
                </Field>
              </div>
            ))}
          </div>
        )}

        {/* ── Content ── */}
        {activeTab === "content" && (
          <div style={s.section}>
            <h2 style={s.sectionTitle}>Content Section</h2>
            <Field label="Heading">
              <Input
                value={form.contentHeading}
                onChange={(v) => setForm((f) => ({ ...f, contentHeading: v }))}
                placeholder="Grow Your Business with Strategic Marketing"
              />
            </Field>
            <Field label="Description">
              <Textarea
                value={form.contentDescription}
                onChange={(v) =>
                  setForm((f) => ({ ...f, contentDescription: v }))
                }
                placeholder="As much as we help our clients..."
                rows={5}
              />
            </Field>
          </div>
        )}

        {/* ── Core Values ── */}
        {activeTab === "corevalues" && (
          <div style={s.section}>
            <div style={s.sectionHeader}>
              <h2 style={s.sectionTitle}>Core Values</h2>
              <button
                style={s.addBtn}
                onClick={() =>
                  addItem("coreValues", { title: "", description: "" })
                }
              >
                + Add Value
              </button>
            </div>
            {form.coreValues.map((item, i) => (
              <div key={i} style={s.card}>
                <CardHeader
                  label={`Value ${i + 1}`}
                  showRemove={form.coreValues.length > 1}
                  onRemove={() => removeItem("coreValues", i)}
                />
                <Field label="Title">
                  <Input
                    value={item.title}
                    onChange={(v) =>
                      updateItem<CoreValue>("coreValues", i, "title", v)
                    }
                    placeholder="Finding Balance"
                  />
                </Field>
                <Field label="Description">
                  <Textarea
                    value={item.description}
                    onChange={(v) =>
                      updateItem<CoreValue>("coreValues", i, "description", v)
                    }
                    placeholder="Description..."
                    rows={3}
                  />
                </Field>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sticky Save Bar */}
      <div style={s.saveBar}>
        <span style={{ fontSize: 13, color: "#64748b" }}>
          Remember to save your changes
        </span>
        <button style={s.saveBtn} onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default AboutUsAdmin;
export const getServerSideProps: GetServerSideProps = requireAdminAuth(
  async (_ctx) => ({ props: {} })
);

// ─── Small reusable components ────────────────────────────────────────────────
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={s.field}>
      <label style={s.label}>{label}</label>
      {children}
    </div>
  );
}
function Input({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      style={s.input}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}
function Textarea({
  value,
  onChange,
  placeholder,
  rows,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      style={s.textarea}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows ?? 3}
    />
  );
}
function CardHeader({
  label,
  showRemove,
  onRemove,
}: {
  label: string;
  showRemove: boolean;
  onRemove: () => void;
}) {
  return (
    <div style={s.cardHeader}>
      <span style={s.cardLabel}>{label}</span>
      {showRemove && (
        <button style={s.removeBtn} onClick={onRemove}>
          Remove
        </button>
      )}
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#080e1a",
    color: "#e2e8f0",
    fontFamily: "ui-sans-serif, system-ui, sans-serif",
    paddingBottom: 100,
  },
  loadingWrap: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  toast: {
    position: "fixed",
    top: 24,
    right: 24,
    zIndex: 1000,
    padding: "12px 20px",
    borderRadius: 12,
    border: "1px solid",
    fontSize: 14,
    fontWeight: 500,
    backdropFilter: "blur(10px)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "24px 32px",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    background: "rgba(255,255,255,0.02)",
    flexWrap: "wrap" as const,
    gap: 16,
  },
  headerLeft: { display: "flex", flexDirection: "column" as const, gap: 4 },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 13,
    opacity: 0.6,
  },
  breadcrumbLink: { cursor: "pointer", color: "#60a5fa" },
  pageTitle: { fontSize: 22, fontWeight: 700, margin: 0 },
  headerRight: { display: "flex", gap: 10 },
  saveBtn: {
    padding: "10px 22px",
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: 14,
  },
  logoutBtn: {
    padding: "10px 18px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "transparent",
    color: "#94a3b8",
    cursor: "pointer",
    fontSize: 14,
  },
  tabs: {
    display: "flex",
    gap: 4,
    padding: "16px 32px 0",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    flexWrap: "wrap" as const,
  },
  tab: {
    padding: "10px 16px",
    border: "none",
    borderBottom: "2px solid transparent",
    background: "transparent",
    color: "#64748b",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 500,
    borderRadius: "8px 8px 0 0",
  },
  tabActive: {
    color: "#60a5fa",
    borderBottomColor: "#3b82f6",
    background: "rgba(59,130,246,0.06)",
  },
  content: { padding: "32px" },
  section: { maxWidth: 860 },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 600,
    margin: "0 0 20px",
    color: "#cbd5e1",
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 16,
    marginBottom: 4,
  },
  field: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 6,
    marginBottom: 16,
  },
  label: { fontSize: 13, fontWeight: 500, color: "#94a3b8" },
  input: {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.04)",
    color: "#e2e8f0",
    fontSize: 14,
    outline: "none",
  },
  textarea: {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.04)",
    color: "#e2e8f0",
    fontSize: 14,
    outline: "none",
    resize: "vertical" as const,
    fontFamily: "inherit",
  },
  card: {
    padding: 20,
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.03)",
    marginBottom: 16,
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  cardLabel: { fontSize: 13, fontWeight: 600, color: "#60a5fa" },
  addBtn: {
    padding: "8px 16px",
    borderRadius: 8,
    border: "1px solid rgba(59,130,246,0.4)",
    background: "rgba(59,130,246,0.1)",
    color: "#60a5fa",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 500,
  },
  removeBtn: {
    padding: "5px 12px",
    borderRadius: 8,
    border: "1px solid rgba(239,68,68,0.3)",
    background: "rgba(239,68,68,0.08)",
    color: "#f87171",
    cursor: "pointer",
    fontSize: 12,
  },
  saveBar: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "16px 32px",
    background: "rgba(8,14,26,0.95)",
    borderTop: "1px solid rgba(255,255,255,0.07)",
    backdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 16,
  },
};
