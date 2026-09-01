import type { GetServerSideProps, NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import ImageUpload from "../../../components/admin/ImageUpload";
import { requireAdminAuth } from "../../../lib/adminAuth";
import { slugify } from "../../../lib/blogs";

interface BlogItem {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  image: string;
  category: string;
  author: {
    name: string;
    photo: string;
  };
  publishedAt: string;
  isPublished: boolean;
}

interface BlogForm {
  title: string;
  slug: string;
  excerpt: string;
  contentText: string;
  image: string;
  category: string;
  authorName: string;
  authorPhoto: string;
  publishedAt: string;
  isPublished: boolean;
}

const emptyForm = (): BlogForm => ({
  title: "",
  slug: "",
  excerpt: "",
  contentText: "",
  image: "",
  category: "",
  authorName: "Admin",
  authorPhoto: "/images/logo.png",
  publishedAt: new Date().toISOString().slice(0, 16),
  isPublished: true,
});

function toForm(blog: BlogItem): BlogForm {
  return {
    title: blog.title || "",
    slug: blog.slug || "",
    excerpt: blog.excerpt || "",
    contentText: (blog.content || []).join("\n\n"),
    image: blog.image || "",
    category: blog.category || "",
    authorName: blog.author?.name || "",
    authorPhoto: blog.author?.photo || "",
    publishedAt: blog.publishedAt
      ? new Date(blog.publishedAt).toISOString().slice(0, 16)
      : new Date().toISOString().slice(0, 16),
    isPublished: blog.isPublished ?? true,
  };
}

function buildPayload(form: BlogForm) {
  return {
    title: form.title.trim(),
    slug: form.slug.trim(),
    excerpt: form.excerpt.trim(),
    content: form.contentText
      .split(/\n{2,}/)
      .map((item) => item.trim())
      .filter(Boolean),
    image: form.image.trim(),
    category: form.category.trim(),
    author: {
      name: form.authorName.trim(),
      photo: form.authorPhoto.trim(),
    },
    publishedAt: new Date(form.publishedAt).toISOString(),
    isPublished: form.isPublished,
  };
}

const BlogsAdmin: NextPage = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState<BlogForm>(emptyForm());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);

  const selectedBlog = useMemo(
    () => blogs.find((blog) => blog._id === selectedId) || null,
    [blogs, selectedId]
  );

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blogs");
      const data = await res.json();
      if (!res.ok || !data.ok) {
        showToast(data.message ?? "Failed to load blogs", "error");
        return;
      }

      const items = Array.isArray(data.data) ? data.data : [];
      setBlogs(items);

      if (items.length > 0) {
        setSelectedId((current) => {
          const nextId = current && items.some((item: BlogItem) => item._id === current)
            ? current
            : items[0]._id;
          const nextBlog = items.find((item: BlogItem) => item._id === nextId);
          if (nextBlog) {
            setForm(toForm(nextBlog));
            setIsCreating(false);
          }
          return nextId;
        });
      } else {
        startNewPost();
      }
    } catch {
      showToast("Failed to load blogs", "error");
    } finally {
      setLoading(false);
    }
  }

  function showToast(msg: string, type: "success" | "error") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }

  function startNewPost() {
    setSelectedId(null);
    setForm(emptyForm());
    setIsCreating(true);
  }

  function selectBlog(blog: BlogItem) {
    setSelectedId(blog._id);
    setForm(toForm(blog));
    setIsCreating(false);
  }

  function updateForm<K extends keyof BlogForm>(key: K, value: BlogForm[K]) {
    setForm((current) => {
      const next = { ...current, [key]: value };
      if (key === "title") {
        next.slug = slugify(String(value));
      }
      return next;
    });
  }

  async function handleSave() {
    if (!form.title.trim()) {
      showToast("Title is required", "error");
      return;
    }

    if (!form.slug.trim()) {
      showToast("Slug is required", "error");
      return;
    }

    if (!form.publishedAt) {
      showToast("Publish date is required", "error");
      return;
    }

    setSaving(true);

    try {
      const url = isCreating ? "/api/admin/blogs" : `/api/admin/blogs/${selectedId}`;
      const method = isCreating ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload(form)),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        showToast(data.message ?? "Failed to save blog", "error");
        return;
      }

      const savedBlog = data.data as BlogItem;
      if (isCreating) {
        setBlogs((current) => [savedBlog, ...current]);
        setSelectedId(savedBlog._id);
        setForm(toForm(savedBlog));
        setIsCreating(false);
        showToast("Blog created successfully", "success");
      } else {
        setBlogs((current) =>
          current.map((blog) => (blog._id === savedBlog._id ? savedBlog : blog))
        );
        setForm(toForm(savedBlog));
        showToast("Blog updated successfully", "success");
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

    const confirmed = window.confirm("Delete this blog post?");
    if (!confirmed) {
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/blogs/${selectedId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        showToast(data.message ?? "Failed to delete blog", "error");
        return;
      }

      const nextBlogs = blogs.filter((blog) => blog._id !== selectedId);
      setBlogs(nextBlogs);
      if (nextBlogs.length > 0) {
        selectBlog(nextBlogs[0]);
      } else {
        startNewPost();
      }
      showToast("Blog deleted successfully", "success");
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
            <span>Blogs</span>
          </div>
          <h1 style={s.pageTitle}>Blog Manager</h1>
          <p style={s.subtitle}>Create, update, and delete blog posts</p>
        </div>
        <div style={s.headerRight}>
          <button style={s.secondaryBtn} onClick={startNewPost}>
            + New Blog
          </button>
          <button style={s.saveBtn} onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : isCreating ? "Create Blog" : "Save Changes"}
          </button>
          <button style={s.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div style={s.layout} className="admin-layout">
        <aside style={s.sidebar} className="admin-sidebar">
          <div style={s.sidebarHeader}>
            <h2 style={s.sidebarTitle}>Posts</h2>
            <span style={s.sidebarCount}>{blogs.length}</span>
          </div>
          {loading ? (
            <p style={s.emptyText}>Loading blogs...</p>
          ) : blogs.length === 0 ? (
            <p style={s.emptyText}>No blogs yet. Create your first post.</p>
          ) : (
            <div style={s.postList}>
              {blogs.map((blog) => (
                <button
                  key={blog._id}
                  style={{
                    ...s.postItem,
                    ...(selectedId === blog._id && !isCreating ? s.postItemActive : {}),
                  }}
                  onClick={() => selectBlog(blog)}
                >
                  <span style={s.postTitle}>{blog.title || "Untitled Blog"}</span>
                  <span style={s.postMeta}>
                    {blog.category || "Uncategorized"} - {blog.isPublished ? "Published" : "Draft"}
                  </span>
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
                  {isCreating ? "Create New Blog" : selectedBlog?.title || "Edit Blog"}
                </h2>
                <p style={s.editorSubtitle}>
                  Images uploaded here are stored in the server `public/uploads` folder.
                </p>
              </div>
              {!isCreating && (
                <button
                  style={s.deleteBtn}
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "Delete Blog"}
                </button>
              )}
            </div>

            <div style={s.grid2} className="admin-grid2">
              <Field label="Title">
                <Input
                  value={form.title}
                  onChange={(value) => updateForm("title", value)}
                  placeholder="How to write a high-performing blog post"
                />
              </Field>
              <Field label="Slug">
                <Input
                  value={form.slug}
                  onChange={(value) => updateForm("slug", slugify(value))}
                  placeholder="how-to-write-a-high-performing-blog-post"
                />
              </Field>
            </div>

            <Field label="Excerpt">
              <Textarea
                value={form.excerpt}
                onChange={(value) => updateForm("excerpt", value)}
                placeholder="Short summary shown on the blog listing page"
                rows={3}
              />
            </Field>

            <div style={s.grid2} className="admin-grid2">
              <Field label="Category">
                <Input
                  value={form.category}
                  onChange={(value) => updateForm("category", value)}
                  placeholder="Marketing Tips"
                />
              </Field>
              <Field label="Publish Date">
                <input
                  style={s.input}
                  type="datetime-local"
                  value={form.publishedAt}
                  onChange={(e) => updateForm("publishedAt", e.target.value)}
                />
              </Field>
            </div>

            <div style={s.grid2} className="admin-grid2">
              <Field label="Author Name">
                <Input
                  value={form.authorName}
                  onChange={(value) => updateForm("authorName", value)}
                  placeholder="Admin"
                />
              </Field>
              <Field label="Status">
                <label style={s.toggleWrap}>
                  <input
                    type="checkbox"
                    checked={form.isPublished}
                    onChange={(e) => updateForm("isPublished", e.target.checked)}
                  />
                  <span>{form.isPublished ? "Published" : "Draft"}</span>
                </label>
              </Field>
            </div>

            <ImageUpload
              label="Featured Image"
              value={form.image}
              onChange={(url) => updateForm("image", url)}
            />

            <ImageUpload
              label="Author Photo"
              value={form.authorPhoto}
              onChange={(url) => updateForm("authorPhoto", url)}
            />

            <Field label="Content">
              <Textarea
                value={form.contentText}
                onChange={(value) => updateForm("contentText", value)}
                placeholder={"Write each paragraph, then leave a blank line before the next one."}
                rows={14}
              />
            </Field>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BlogsAdmin;
export const getServerSideProps: GetServerSideProps = requireAdminAuth(
  async () => ({ props: {} })
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
  onChange: (value: string) => void;
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
  headerLeft: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 6,
  },
  headerRight: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap" as const,
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 13,
    opacity: 0.6,
  },
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
  sidebarTitle: {
    fontSize: 16,
    fontWeight: 600,
    margin: 0,
  },
  sidebarCount: {
    fontSize: 12,
    color: "#94a3b8",
    padding: "4px 10px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.04)",
  },
  postList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 10,
  },
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
  postTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: "#e2e8f0",
  },
  postMeta: {
    fontSize: 12,
    color: "#94a3b8",
  },
  emptyText: {
    fontSize: 13,
    color: "#64748b",
    margin: 0,
  },
  editor: {
    minWidth: 0,
  },
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
  editorTitle: {
    fontSize: 18,
    fontWeight: 700,
    margin: "0 0 6px",
  },
  editorSubtitle: {
    fontSize: 13,
    color: "#64748b",
    margin: 0,
  },
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
  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 16,
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
  toggleWrap: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    minHeight: 42,
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.04)",
    color: "#e2e8f0",
    fontSize: 14,
  },
};
