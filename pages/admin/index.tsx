import type { GetServerSideProps, NextPage } from "next";
import { requireAdminAuth } from "../../lib/adminAuth";
import { useRouter } from "next/router";

const pages = [
  {
    title: "About Us",
    path: "/admin/about-us",
    description: "Edit hero, services, team, stats, testimonials, core values",
  },
  {
    title: "Contact Us",
    path: "/admin/contact-us",
    description: "Edit hero, offices, FAQs, contact info",
  },
  {
    title: "Careers",
    path: "/admin/career",
    description: "Edit hero, job openings, categories",
  },
  {
    title: "Blogs",
    path: "/admin/blogs",
    description: "Create, edit, publish, and delete blog posts",
  },
  {
    title: "Testimonials",
    path: "/admin/testimonials",
    description: "Manage client testimonials and reviews",
  },
];

const AdminDashboard: NextPage = () => {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  return (
    <div style={s.page}>
      <header style={s.header}>
        <h1 style={s.title}>Admin Dashboard</h1>
        <button style={s.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div style={s.content}>
        <p style={s.subtitle}>Select a page to manage its content</p>
        <div style={s.grid}>
          {pages.map((page) => (
            <div
              key={page.path}
              style={s.card}
              onClick={() => router.push(page.path)}
            >
              <h2 style={s.cardTitle}>{page.title}</h2>
              <p style={s.cardDesc}>{page.description}</p>
              <span style={s.cardLink}>Manage →</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
export const getServerSideProps: GetServerSideProps = requireAdminAuth(
  async (_ctx) => ({ props: {} })
);

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#080e1a",
    color: "#e2e8f0",
    fontFamily: "ui-sans-serif, system-ui, sans-serif",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "24px 32px",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    background: "rgba(255,255,255,0.02)",
  },
  title: { fontSize: 22, fontWeight: 700, margin: 0 },
  logoutBtn: {
    padding: "10px 18px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "transparent",
    color: "#94a3b8",
    cursor: "pointer",
    fontSize: 14,
  },
  content: { padding: "40px 32px" },
  subtitle: { color: "#64748b", marginBottom: 24, fontSize: 14 },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 16,
  },
  card: {
    padding: 24,
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.03)",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  cardTitle: { fontSize: 18, fontWeight: 600, margin: "0 0 8px" },
  cardDesc: {
    fontSize: 13,
    color: "#64748b",
    margin: "0 0 16px",
    lineHeight: 1.5,
  },
  cardLink: { fontSize: 13, color: "#60a5fa", fontWeight: 500 },
};
