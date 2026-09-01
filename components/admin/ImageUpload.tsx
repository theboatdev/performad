import React, { useRef, useState } from "react";

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({
  value,
  onChange,
  label = "Image",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB.");
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.message ?? "Upload failed.");
      } else {
        onChange(data.url);
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div style={s.wrap}>
      <label style={s.label}>{label}</label>
      <div style={s.row}>
        {value ? (
          <img src={value} alt="preview" style={s.preview} />
        ) : (
          <div style={s.placeholder}>No image</div>
        )}
        <div style={s.controls}>
          <input
            style={s.input}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/uploads/image.png or https://..."
          />
          <button
            type="button"
            style={s.uploadBtn}
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFile}
          />
        </div>
      </div>
      {error && <p style={s.error}>{error}</p>}
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  wrap: { display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 },
  label: { fontSize: 13, fontWeight: 500, color: "#94a3b8" },
  row: { display: "flex", gap: 12, alignItems: "flex-start" },
  preview: {
    width: 64,
    height: 64,
    borderRadius: 8,
    objectFit: "cover",
    border: "1px solid rgba(255,255,255,0.1)",
    flexShrink: 0,
  },
  placeholder: {
    width: 64,
    height: 64,
    borderRadius: 8,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 10,
    color: "#64748b",
    flexShrink: 0,
  },
  controls: { display: "flex", flexDirection: "column", gap: 8, flex: 1 },
  input: {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.04)",
    color: "#e2e8f0",
    fontSize: 13,
    outline: "none",
  },
  uploadBtn: {
    padding: "8px 14px",
    borderRadius: 8,
    border: "1px solid rgba(59,130,246,0.4)",
    background: "rgba(59,130,246,0.1)",
    color: "#60a5fa",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 500,
    alignSelf: "flex-start",
  },
  error: { fontSize: 12, color: "#f87171", margin: 0 },
};
