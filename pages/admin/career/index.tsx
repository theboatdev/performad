import type { GetServerSideProps, NextPage } from "next";
import { requireAdminAuth } from "../../../lib/adminAuth";
import { useRouter } from "next/router";
import { useEffect, useState, KeyboardEvent } from "react";

interface JobOpening {
  title: string;
  category: string;
  description: string;
  location: string;
  salary: string;
  tags: string[];
  isActive: boolean;
}

interface CareerForm {
  heroTag: string;
  heroTitle: string;
  heroDescription: string;
  jobOpenings: JobOpening[];
  categories: string[];
}

const emptyJob = (): JobOpening => ({
  title: "",
  category: "",
  description: "",
  location: "",
  salary: "",
  tags: [],
  isActive: true,
});

const defaultForm = (): CareerForm => ({
  heroTag: "",
  heroTitle: "",
  heroDescription: "",
  jobOpenings: [emptyJob()],
  categories: [],
});

type Tab = "hero" | "jobs" | "categories";
const TABS: { key: Tab; label: string }[] = [
  { key: "hero", label: "Hero" },
  { key: "jobs", label: "Job Openings" },
  { key: "categories", label: "Categories" },
];

const CareerAdmin: NextPage = () => {
  const router = useRouter();
  const [form, setForm] = useState<CareerForm>(defaultForm());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("hero");
  const [newCategory, setNewCategory] = useState("");
  // Per-job tag input state
  const [tagInputs, setTagInputs] = useState<string[]>([""]);

  useEffect(() => {
    fetch("/api/admin/career")
      .then((r) => r.json())
      .then((res) => {
        if (res.ok && res.data) {
          const d = res.data;
          const jobs = d.jobOpenings?.length ? d.jobOpenings : [emptyJob()];
          setForm({
            heroTag: d.heroTag ?? "",
            heroTitle: d.heroTitle ?? "",
            heroDescription: d.heroDescription ?? "",
            jobOpenings: jobs,
            categories: d.categories ?? [],
          });
          setTagInputs(jobs.map(() => ""));
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
      const res = await fetch("/api/admin/career", {
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

  function updateJob(
    i: number,
    field: keyof JobOpening,
    value: string | boolean
  ) {
    setForm((f) => {
      const jobs = [...f.jobOpenings];
      jobs[i] = { ...jobs[i], [field]: value };
      return { ...f, jobOpenings: jobs };
    });
  }

  function addJob() {
    setForm((f) => ({ ...f, jobOpenings: [...f.jobOpenings, emptyJob()] }));
    setTagInputs((t) => [...t, ""]);
  }

  function removeJob(i: number) {
    setForm((f) => ({
      ...f,
      jobOpenings: f.jobOpenings.filter((_, idx) => idx !== i),
    }));
    setTagInputs((t) => t.filter((_, idx) => idx !== i));
  }

  // Tag helpers
  function handleTagKeyDown(
    e: KeyboardEvent<HTMLInputElement>,
    jobIndex: number
  ) {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(jobIndex);
    }
  }

  function addTag(jobIndex: number) {
    const val = tagInputs[jobIndex]?.trim();
    if (!val) return;
    setForm((f) => {
      const jobs = [...f.jobOpenings];
      if (jobs[jobIndex].tags.includes(val)) return f; // no duplicates
      jobs[jobIndex] = {
        ...jobs[jobIndex],
        tags: [...jobs[jobIndex].tags, val],
      };
      return { ...f, jobOpenings: jobs };
    });
    setTagInputs((t) => {
      const n = [...t];
      n[jobIndex] = "";
      return n;
    });
  }

  function removeTag(jobIndex: number, tagIndex: number) {
    setForm((f) => {
      const jobs = [...f.jobOpenings];
      jobs[jobIndex] = {
        ...jobs[jobIndex],
        tags: jobs[jobIndex].tags.filter((_, i) => i !== tagIndex),
      };
      return { ...f, jobOpenings: jobs };
    });
  }

  // Category helpers
  function addCategory() {
    const trimmed = newCategory.trim();
    if (!trimmed || form.categories.includes(trimmed)) return;
    setForm((f) => ({ ...f, categories: [...f.categories, trimmed] }));
    setNewCategory("");
  }

  function removeCategory(i: number) {
    setForm((f) => ({
      ...f,
      categories: f.categories.filter((_, idx) => idx !== i),
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
            <span>Career</span>
          </div>
          <h1 style={s.pageTitle}>Career Content</h1>
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

      <div style={s.tabs}>
        {TABS.map((tab) => (
          <button
            key={tab.key}
            style={{ ...s.tab, ...(activeTab === tab.key ? s.tabActive : {}) }}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.key === "jobs"
              ? `Job Openings (${form.jobOpenings.length})`
              : tab.key === "categories"
              ? `Categories (${form.categories.length})`
              : tab.label}
          </button>
        ))}
      </div>

      <div style={s.content}>
        {/* ── Hero ── */}
        {activeTab === "hero" && (
          <div style={s.section}>
            <h2 style={s.sectionTitle}>Hero Section</h2>
            <div style={s.grid2}>
              <Field label="Tag (small label above title)">
                <Input
                  value={form.heroTag}
                  onChange={(v) => setForm((f) => ({ ...f, heroTag: v }))}
                  placeholder="Career"
                />
              </Field>
              <Field label="Title">
                <Input
                  value={form.heroTitle}
                  onChange={(v) => setForm((f) => ({ ...f, heroTitle: v }))}
                  placeholder="Be Part Of Our Mission"
                />
              </Field>
            </div>
            <Field label="Description">
              <Textarea
                value={form.heroDescription}
                onChange={(v) => setForm((f) => ({ ...f, heroDescription: v }))}
                placeholder="Join our team..."
                rows={4}
              />
            </Field>
          </div>
        )}

        {/* ── Jobs ── */}
        {activeTab === "jobs" && (
          <div style={s.section}>
            <div style={s.sectionHeader}>
              <h2 style={s.sectionTitle}>Job Openings</h2>
              <button style={s.addBtn} onClick={addJob}>
                + Add Job
              </button>
            </div>
            {form.jobOpenings.map((job, i) => (
              <div key={i} style={s.card}>
                <div style={s.cardHeader}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <span style={s.cardLabel}>
                      {job.title || `Job ${i + 1}`}
                    </span>
                    <button
                      onClick={() => updateJob(i, "isActive", !job.isActive)}
                      style={{
                        ...s.toggleBtn,
                        background: job.isActive
                          ? "rgba(34,197,94,0.15)"
                          : "rgba(239,68,68,0.1)",
                        borderColor: job.isActive
                          ? "rgba(34,197,94,0.4)"
                          : "rgba(239,68,68,0.3)",
                        color: job.isActive ? "#86efac" : "#f87171",
                      }}
                    >
                      {job.isActive ? "● Active" : "● Inactive"}
                    </button>
                  </div>
                  {form.jobOpenings.length > 1 && (
                    <button style={s.removeBtn} onClick={() => removeJob(i)}>
                      Remove
                    </button>
                  )}
                </div>

                <div style={s.grid2}>
                  <Field label="Job Title">
                    <Input
                      value={job.title}
                      onChange={(v) => updateJob(i, "title", v)}
                      placeholder="UI/UX Product Designer"
                    />
                  </Field>
                  <Field label="Category">
                    <select
                      style={s.select}
                      value={job.category}
                      onChange={(e) => updateJob(i, "category", e.target.value)}
                    >
                      <option value="">Select category...</option>
                      {form.categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Location">
                    <Input
                      value={job.location}
                      onChange={(v) => updateJob(i, "location", v)}
                      placeholder="Nugegoda"
                    />
                  </Field>
                  <Field label="Salary">
                    <Input
                      value={job.salary}
                      onChange={(v) => updateJob(i, "salary", v)}
                      placeholder="28k - 36k"
                    />
                  </Field>
                </div>

                {/* Tag input */}
                <Field label="Tags">
                  {/* Existing tags as pills */}
                  {job.tags.length > 0 && (
                    <div style={s.tagList}>
                      {job.tags.map((tag, ti) => (
                        <span key={ti} style={s.tag}>
                          {tag}
                          <button
                            style={s.tagRemove}
                            onClick={() => removeTag(i, ti)}
                          >
                            ✕
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  {/* Input to add new tag */}
                  <div style={s.tagInputRow}>
                    <input
                      style={s.input}
                      value={tagInputs[i] ?? ""}
                      onChange={(e) =>
                        setTagInputs((t) => {
                          const n = [...t];
                          n[i] = e.target.value;
                          return n;
                        })
                      }
                      onKeyDown={(e) => handleTagKeyDown(e, i)}
                      placeholder="Type a tag and press Enter"
                    />
                    <button style={s.addTagBtn} onClick={() => addTag(i)}>
                      Add
                    </button>
                  </div>
                  <p style={s.hint}>e.g. 100% Remote · Full Time · Part Time</p>
                </Field>

                <Field label="Description">
                  <Textarea
                    value={job.description}
                    onChange={(v) => updateJob(i, "description", v)}
                    placeholder="Job description..."
                    rows={3}
                  />
                </Field>
              </div>
            ))}
          </div>
        )}

        {/* ── Categories ── */}
        {activeTab === "categories" && (
          <div style={s.section}>
            <h2 style={s.sectionTitle}>Job Categories</h2>
            <p style={s.hint}>
              These appear as filter tabs on the career page.
            </p>
            <div style={s.addCatRow}>
              <input
                style={{ ...s.input, flex: 1 }}
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCategory()}
                placeholder="e.g. Development, Design, Marketing..."
              />
              <button style={s.addBtn} onClick={addCategory}>
                + Add
              </button>
            </div>
            <div style={s.catList}>
              {form.categories.length === 0 && (
                <p style={{ color: "#64748b", fontSize: 13 }}>
                  No categories yet. Add one above.
                </p>
              )}
              {form.categories.map((cat, i) => (
                <div key={i} style={s.catItem}>
                  <span style={{ fontSize: 14 }}>{cat}</span>
                  <button style={s.removeBtn} onClick={() => removeCategory(i)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

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

export default CareerAdmin;
export const getServerSideProps: GetServerSideProps = requireAdminAuth(
  async (_ctx) => ({ props: {} })
);

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
  hint: { fontSize: 12, color: "#64748b", margin: "4px 0 0" },
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
  select: {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "#0f172a",
    color: "#e2e8f0",
    fontSize: 14,
    outline: "none",
    cursor: "pointer",
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
  toggleBtn: {
    padding: "4px 10px",
    borderRadius: 20,
    border: "1px solid",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 500,
  },
  tagList: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: 6,
    marginBottom: 8,
  },
  tag: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    padding: "4px 10px",
    borderRadius: 20,
    background: "rgba(59,130,246,0.15)",
    border: "1px solid rgba(59,130,246,0.3)",
    color: "#93c5fd",
    fontSize: 12,
  },
  tagRemove: {
    background: "none",
    border: "none",
    color: "#93c5fd",
    cursor: "pointer",
    fontSize: 11,
    padding: "0 0 0 2px",
    lineHeight: 1,
  },
  tagInputRow: { display: "flex", gap: 8 },
  addTagBtn: {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid rgba(59,130,246,0.4)",
    background: "rgba(59,130,246,0.1)",
    color: "#60a5fa",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 500,
    whiteSpace: "nowrap" as const,
  },
  addCatRow: { display: "flex", gap: 10, marginBottom: 20 },
  catList: { display: "flex", flexDirection: "column" as const, gap: 8 },
  catItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 16px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.03)",
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
