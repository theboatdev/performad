import type { GetServerSideProps, NextPage } from "next";
import { requireAdminAuth } from "../../../lib/adminAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Office {
  name: string;
  address: string;
  phone: string;
  email: string;
  mapUrl: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface ContactUsForm {
  heroTitle: string;
  heroSubtitle: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  offices: Office[];
  faqs: FAQ[];
}

const emptyOffice = (): Office => ({
  name: "",
  address: "",
  phone: "",
  email: "",
  mapUrl: "",
});
const emptyFAQ = (): FAQ => ({ question: "", answer: "" });
const defaultForm = (): ContactUsForm => ({
  heroTitle: "",
  heroSubtitle: "",
  contactEmail: "",
  contactPhone: "",
  contactAddress: "",
  offices: [emptyOffice()],
  faqs: [emptyFAQ()],
});

const ContactUsAdmin: NextPage = () => {
  const router = useRouter();
  const [form, setForm] = useState<ContactUsForm>(defaultForm());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);
  const [activeTab, setActiveTab] = useState<"hero" | "offices" | "faqs">(
    "hero"
  );

  useEffect(() => {
    fetch("/api/admin/contact-us")
      .then((r) => r.json())
      .then((res) => {
        if (res.ok && res.data) {
          setForm({
            heroTitle: res.data.heroTitle ?? "",
            heroSubtitle: res.data.heroSubtitle ?? "",
            contactEmail: res.data.contactEmail ?? "",
            contactPhone: res.data.contactPhone ?? "",
            contactAddress: res.data.contactAddress ?? "",
            offices: res.data.offices?.length
              ? res.data.offices
              : [emptyOffice()],
            faqs: res.data.faqs?.length ? res.data.faqs : [emptyFAQ()],
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
      const res = await fetch("/api/admin/contact-us", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        showToast(data.message ?? "Save failed", "error");
      } else {
        showToast("Saved successfully!", "success");
      }
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

  function setField<K extends keyof ContactUsForm>(
    key: K,
    value: ContactUsForm[K]
  ) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function setOffice(i: number, key: keyof Office, value: string) {
    setForm((f) => {
      const offices = [...f.offices];
      offices[i] = { ...offices[i], [key]: value };
      return { ...f, offices };
    });
  }
  function addOffice() {
    setForm((f) => ({ ...f, offices: [...f.offices, emptyOffice()] }));
  }
  function removeOffice(i: number) {
    setForm((f) => ({
      ...f,
      offices: f.offices.filter((_, idx) => idx !== i),
    }));
  }

  function setFaq(i: number, key: keyof FAQ, value: string) {
    setForm((f) => {
      const faqs = [...f.faqs];
      faqs[i] = { ...faqs[i], [key]: value };
      return { ...f, faqs };
    });
  }
  function addFaq() {
    setForm((f) => ({ ...f, faqs: [...f.faqs, emptyFAQ()] }));
  }
  function removeFaq(i: number) {
    setForm((f) => ({ ...f, faqs: f.faqs.filter((_, idx) => idx !== i) }));
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
            <span>Contact Us</span>
          </div>
          <h1 style={s.pageTitle}>Contact Us Content</h1>
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
        {(["hero", "offices", "faqs"] as const).map((tab) => (
          <button
            key={tab}
            style={{ ...s.tab, ...(activeTab === tab ? s.tabActive : {}) }}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "hero"
              ? "Hero & Contact Info"
              : tab === "offices"
              ? `Offices (${form.offices.length})`
              : `FAQs (${form.faqs.length})`}
          </button>
        ))}
      </div>

      <div style={s.content}>
        {activeTab === "hero" && (
          <div style={s.section}>
            <h2 style={s.sectionTitle}>Hero Section</h2>
            <div style={s.grid2}>
              <div style={s.field}>
                <label style={s.label}>Hero Title</label>
                <input
                  style={s.input}
                  value={form.heroTitle}
                  onChange={(e) => setField("heroTitle", e.target.value)}
                  placeholder="Contact Us"
                />
              </div>
              <div style={s.field}>
                <label style={s.label}>Hero Subtitle</label>
                <input
                  style={s.input}
                  value={form.heroSubtitle}
                  onChange={(e) => setField("heroSubtitle", e.target.value)}
                  placeholder="Get in touch with us"
                />
              </div>
            </div>
            <h2 style={{ ...s.sectionTitle, marginTop: 32 }}>
              Contact Information
            </h2>
            <div style={s.grid2}>
              <div style={s.field}>
                <label style={s.label}>Contact Email</label>
                <input
                  style={s.input}
                  type="email"
                  value={form.contactEmail}
                  onChange={(e) => setField("contactEmail", e.target.value)}
                  placeholder="contact@company.com"
                />
              </div>
              <div style={s.field}>
                <label style={s.label}>Contact Phone</label>
                <input
                  style={s.input}
                  value={form.contactPhone}
                  onChange={(e) => setField("contactPhone", e.target.value)}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>
            <div style={s.field}>
              <label style={s.label}>Contact Address</label>
              <textarea
                style={s.textarea}
                value={form.contactAddress}
                onChange={(e) => setField("contactAddress", e.target.value)}
                placeholder="123 Main Street, City, Country"
                rows={3}
              />
            </div>
          </div>
        )}

        {activeTab === "offices" && (
          <div style={s.section}>
            <div style={s.sectionHeader}>
              <h2 style={s.sectionTitle}>Office Locations</h2>
              <button style={s.addBtn} onClick={addOffice}>
                + Add Office
              </button>
            </div>
            {form.offices.map((office, i) => (
              <div key={i} style={s.card}>
                <div style={s.cardHeader}>
                  <span style={s.cardLabel}>Office {i + 1}</span>
                  {form.offices.length > 1 && (
                    <button style={s.removeBtn} onClick={() => removeOffice(i)}>
                      Remove
                    </button>
                  )}
                </div>
                <div style={s.grid2}>
                  <div style={s.field}>
                    <label style={s.label}>Office Name</label>
                    <input
                      style={s.input}
                      value={office.name}
                      onChange={(e) => setOffice(i, "name", e.target.value)}
                      placeholder="Headquarters"
                    />
                  </div>
                  <div style={s.field}>
                    <label style={s.label}>Phone</label>
                    <input
                      style={s.input}
                      value={office.phone}
                      onChange={(e) => setOffice(i, "phone", e.target.value)}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div style={s.field}>
                    <label style={s.label}>Email</label>
                    <input
                      style={s.input}
                      type="email"
                      value={office.email}
                      onChange={(e) => setOffice(i, "email", e.target.value)}
                      placeholder="office@company.com"
                    />
                  </div>
                  <div style={s.field}>
                    <label style={s.label}>Google Maps URL</label>
                    <input
                      style={s.input}
                      value={office.mapUrl}
                      onChange={(e) => setOffice(i, "mapUrl", e.target.value)}
                      placeholder="https://maps.google.com/..."
                    />
                  </div>
                </div>
                <div style={s.field}>
                  <label style={s.label}>Address</label>
                  <textarea
                    style={s.textarea}
                    value={office.address}
                    onChange={(e) => setOffice(i, "address", e.target.value)}
                    placeholder="123 Street, City, Country"
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "faqs" && (
          <div style={s.section}>
            <div style={s.sectionHeader}>
              <h2 style={s.sectionTitle}>Frequently Asked Questions</h2>
              <button style={s.addBtn} onClick={addFaq}>
                + Add FAQ
              </button>
            </div>
            {form.faqs.map((faq, i) => (
              <div key={i} style={s.card}>
                <div style={s.cardHeader}>
                  <span style={s.cardLabel}>FAQ {i + 1}</span>
                  {form.faqs.length > 1 && (
                    <button style={s.removeBtn} onClick={() => removeFaq(i)}>
                      Remove
                    </button>
                  )}
                </div>
                <div style={s.field}>
                  <label style={s.label}>Question</label>
                  <input
                    style={s.input}
                    value={faq.question}
                    onChange={(e) => setFaq(i, "question", e.target.value)}
                    placeholder="What are your business hours?"
                  />
                </div>
                <div style={s.field}>
                  <label style={s.label}>Answer</label>
                  <textarea
                    style={s.textarea}
                    value={faq.answer}
                    onChange={(e) => setFaq(i, "answer", e.target.value)}
                    placeholder="We are open Monday to Friday..."
                    rows={3}
                  />
                </div>
              </div>
            ))}
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

export default ContactUsAdmin;

export const getServerSideProps: GetServerSideProps = requireAdminAuth(
  async (_ctx) => {
    return { props: {} };
  }
);

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
  },
  tab: {
    padding: "10px 20px",
    border: "none",
    borderBottom: "2px solid transparent",
    background: "transparent",
    color: "#64748b",
    cursor: "pointer",
    fontSize: 14,
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
    marginBottom: 16,
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
