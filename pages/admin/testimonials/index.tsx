import type { GetServerSideProps, NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import ImageUpload from "../../../components/admin/ImageUpload";
import { requireAdminAuth } from "../../../lib/adminAuth";

interface TestimonialItem {
  _id: string;
  name: string;
  title: string;
  text: string;
  stars: number;
  image: string;
}

interface TestimonialForm {
  name: string;
  title: string;
  text: string;
  stars: number;
  image: string;
}

const emptyForm = (): TestimonialForm => ({
  name: "",
  title: "",
  text: "",
  stars: 5,
  image: "",
});

function toForm(testimonial: TestimonialItem): TestimonialForm {
  return {
    name: testimonial.name || "",
    title: testimonial.title || "",
    text: testimonial.text || "",
    stars: testimonial.stars || 5,
    image: testimonial.image || "",
  };
}

function buildPayload(form: TestimonialForm) {
  return {
    name: form.name.trim(),
    title: form.title.trim(),
    text: form.text.trim(),
    stars: Number(form.stars),
    image: form.image.trim(),
  };
}

const TestimonialAdmin: NextPage = () => {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState<TestimonialForm>(emptyForm());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);

  const selectedTestimonial = useMemo(
    () => testimonials.find((item) => item._id === selectedId) || null,
    [testimonials, selectedId]
  );

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/testimonials");
      const data = await res.json();
      if (!res.ok || !data.ok) {
        showToast(data.message ?? "Failed to load testimonials", "error");
        return;
      }

      const items = Array.isArray(data.data) ? data.data : [];
      setTestimonials(items);

      if (items.length > 0) {
        setSelectedId((current) => {
          const nextId =
            current && items.some((item: TestimonialItem) => item._id === current)
              ? current
              : items[0]._id;
          const nextItem = items.find((item: TestimonialItem) => item._id === nextId);
          if (nextItem) {
            setForm(toForm(nextItem));
            setIsCreating(false);
          }
          return nextId;
        });
      } else {
        startNewTestimonial();
      }
    } catch {
      showToast("Failed to load testimonials", "error");
    } finally {
      setLoading(false);
    }
  }

  function showToast(msg: string, type: "success" | "error") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }

  function startNewTestimonial() {
    setSelectedId(null);
    setForm(emptyForm());
    setIsCreating(true);
  }

  function selectTestimonial(item: TestimonialItem) {
    setSelectedId(item._id);
    setForm(toForm(item));
    setIsCreating(false);
  }

  function updateForm<K extends keyof TestimonialForm>(key: K, value: TestimonialForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSave() {
    if (!form.name.trim()) {
      showToast("Name is required", "error");
      return;
    }

    if (!form.text.trim()) {
      showToast("Testimonial text is required", "error");
      return;
    }

    setSaving(true);

    try {
      const url = isCreating
        ? "/api/admin/testimonials"
        : `/api/admin/testimonials/${selectedId}`;
      const method = isCreating ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload(form)),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        showToast(data.message ?? "Failed to save testimonial", "error");
        return;
      }

      const savedItem = data.data as TestimonialItem;
      if (isCreating) {
        setTestimonials((current) => [savedItem, ...current]);
        setSelectedId(savedItem._id);
        setForm(toForm(savedItem));
        setIsCreating(false);
        showToast("Testimonial created successfully", "success");
      } else {
        setTestimonials((current) =>
          current.map((item) => (item._id === savedItem._id ? savedItem : item))
        );
        setForm(toForm(savedItem));
        showToast("Testimonial updated successfully", "success");
      }
    } catch {
      showToast("Network error. Try again.", "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!selectedId || isCreating) {
      return;
    }

    const confirmed = window.confirm("Delete this testimonial?");
    if (!confirmed) {
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/testimonials/${selectedId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        showToast(data.message ?? "Failed to delete testimonial", "error");
        return;
      }

      const nextItems = testimonials.filter((item) => item._id !== selectedId);
      setTestimonials(nextItems);
      if (nextItems.length > 0) {
        selectTestimonial(nextItems[0]);
      } else {
        startNewTestimonial();
      }
      showToast("Testimonial deleted successfully", "success");
    } catch {
      showToast("Network error. Try again.", "error");
    } finally {
      setDeleting(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  return (
    <div style={s.page}>
      <style>{`
        @media (max-width: 1024px) {
          .admin-layout {
            grid-template-columns: 1fr !important;
            padding: 16px !important;
          }
          .admin-sidebar {
            position: static !important;
          }
          .admin-header {
            padding: 16px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
        @media (max-width: 600px) {
          .admin-grid2 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
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
          {toast.msg}
        </div>
      )}

      <header style={s.header} className="admin-header">
        <div style={s.headerLeft}>
          <div style={s.breadcrumb}>
            <span style={s.breadcrumbLink} onClick={() => router.push("/admin")}>
              Dashboard
            </span>
            <span style={{ opacity: 0.4 }}>/</span>
            <span>Testimonials</span>
          </div>
          <h1 style={s.pageTitle}>Testimonials Manager</h1>
          <p style={s.subtitle}>Create, update, and delete testimonials</p>
        </div>
        <div style={s.headerRight}>
          <button style={s.secondaryBtn} onClick={startNewTestimonial}>
            + New Testimonial
          </button>
          <button style={s.saveBtn} onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : isCreating ? "Create Testimonial" : "Save Changes"}
          </button>
          <button style={s.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div style={s.layout} className="admin-layout">
        <aside style={s.sidebar} className="admin-sidebar">
          <div style={s.sidebarHeader}>
            <h2 style={s.sidebarTitle}>Testimonials</h2>
            <span style={s.sidebarCount}>{testimonials.length}</span>
          </div>
          {loading ? (
            <p style={s.emptyText}>Loading...</p>
          ) : testimonials.length === 0 ? (
            <p style={s.emptyText}>No testimonials yet.</p>
          ) : (
            <div style={s.postList}>
              {testimonials.map((item) => (
                <button
                  key={item._id}
                  style={{
                    ...s.postItem,
                    ...(selectedId === item._id && !isCreating ? s.postItemActive : {}),
                  }}
                  onClick={() => selectTestimonial(item)}
                >
                  <span style={s.postTitle}>{item.name || "Untitled"}</span>
                  <span style={s.postMeta}>{item.title || "No Title"}</span>
                </button>
              ))}
            </div>
          )}
        </aside>

        <main style={s.editor}>
          <div style={s.editorCard}>
            <div style={s.editorHeader}>
              <div>
                <h2 style={s.editorTitle}>
                  {isCreating
                    ? "Add New Testimonial"
                    : `Edit ${selectedTestimonial?.name || "Testimonial"}`}
                </h2>
                <p style={s.editorSubtitle}>Fill in the details below.</p>
              </div>
              {!isCreating && (
                <button
                  style={s.deleteBtn}
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              )}
            </div>

            <div style={s.grid2} className="admin-grid2">
              <Field label="Name">
                <Input
                  value={form.name}
                  onChange={(value) => updateForm("name", value)}
                  placeholder="John Doe"
                />
              </Field>
              <Field label="Title / Role">
                <Input
                  value={form.title}
                  onChange={(value) => updateForm("title", value)}
                  placeholder="Business Owner"
                />
              </Field>
            </div>

            <Field label="Rating (1-5)">
              <Input
                type="number"
                value={String(form.stars)}
                onChange={(value) => updateForm("stars", Number(value))}
                placeholder="5"
              />
            </Field>

            <ImageUpload
              label="Reviewer Image"
              value={form.image}
              onChange={(url) => updateForm("image", url)}
            />

            <Field label="Testimonial Text">
              <Textarea
                value={form.text}
                onChange={(value) => updateForm("text", value)}
                placeholder={"Write their feedback here..."}
                rows={5}
              />
            </Field>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TestimonialAdmin;
export const getServerSideProps: GetServerSideProps = requireAdminAuth(
  async () => ({ props: {} })
);

function Field({ label, children }: { label: string; children: React.ReactNode }) {
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
  type = "text",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      style={s.input}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      min={type === "number" ? 1 : undefined}
      max={type === "number" ? 5 : undefined}
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
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      style={s.textarea}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows ?? 4}
    />
  );
}

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#080e1a",
    color: "#e2e8f0",
    fontFamily: "ui-sans-serif, system-ui, sans-serif",
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
  headerLeft: { display: "flex", flexDirection: "column" as const, gap: 6 },
  headerRight: { display: "flex", gap: 10, flexWrap: "wrap" as const },
  breadcrumb: { display: "flex", alignItems: "center", gap: 6, fontSize: 13, opacity: 0.6 },
  breadcrumbLink: { cursor: "pointer", color: "#60a5fa" },
  pageTitle: { fontSize: 22, fontWeight: 700, margin: 0 },
  subtitle: { fontSize: 13, color: "#64748b", margin: 0 },
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
  secondaryBtn: {
    padding: "10px 18px",
    borderRadius: 10,
    border: "1px solid rgba(59,130,246,0.4)",
    background: "rgba(59,130,246,0.1)",
    color: "#60a5fa",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 500,
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
  layout: {
    display: "grid",
    gridTemplateColumns: "320px 1fr",
    gap: 24,
    padding: 24,
    alignItems: "start",
  },
  sidebar: {
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 18,
    background: "rgba(255,255,255,0.03)",
    padding: 18,
    position: "sticky" as const,
    top: 24,
  },
  sidebarHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sidebarTitle: { fontSize: 16, fontWeight: 600, margin: 0 },
  sidebarCount: {
    fontSize: 12,
    color: "#94a3b8",
    padding: "4px 10px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.04)",
  },
  postList: { display: "flex", flexDirection: "column" as const, gap: 10 },
  postItem: {
    textAlign: "left" as const,
    padding: "14px 16px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(255,255,255,0.02)",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column" as const,
    gap: 6,
  },
  postItemActive: {
    borderColor: "rgba(59,130,246,0.45)",
    background: "rgba(59,130,246,0.12)",
  },
  postTitle: { fontSize: 14, fontWeight: 600, color: "#e2e8f0" },
  postMeta: { fontSize: 12, color: "#94a3b8" },
  emptyText: { fontSize: 13, color: "#64748b", margin: 0 },
  editor: { minWidth: 0 },
  editorCard: {
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 18,
    background: "rgba(255,255,255,0.03)",
    padding: 24,
  },
  editorHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 24,
    flexWrap: "wrap" as const,
  },
  editorTitle: { fontSize: 18, fontWeight: 700, margin: "0 0 6px" },
  editorSubtitle: { fontSize: 13, color: "#64748b", margin: 0 },
  deleteBtn: {
    padding: "9px 16px",
    borderRadius: 10,
    border: "1px solid rgba(239,68,68,0.3)",
    background: "rgba(239,68,68,0.08)",
    color: "#f87171",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
  },
  grid2: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 },
  field: { display: "flex", flexDirection: "column" as const, gap: 6, marginBottom: 16 },
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
};
