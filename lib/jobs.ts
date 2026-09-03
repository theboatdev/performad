export interface JobListing {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  body: unknown[] | null;
  location: string;
  salary: string;
  tags: string[];
  applyUrl: string;
  image: string;
  isPublished: boolean;
}

type JobSource = {
  _id?: string;
  slug?: string;
  title?: string;
  category?: string;
  description?: string;
  body?: unknown[];
  location?: string;
  salary?: string;
  tags?: string[];
  applyUrl?: string;
  image?: string;
  isPublished?: boolean;
};

export function slugifyJob(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function toApplyHref(value?: string) {
  const applyUrl = (value || "").trim();
  if (!applyUrl) return "";
  if (applyUrl.includes("@") && !applyUrl.includes("://") && !applyUrl.startsWith("mailto:")) {
    return `mailto:${applyUrl}`;
  }
  return applyUrl;
}

export function normalizeJobListing(job: JobSource): JobListing {
  const slug =
    job.slug || slugifyJob(job.title || "") || String(job._id || "");

  return {
    id: slug,
    slug,
    title: job.title || "",
    category: job.category || "",
    description: job.description || "",
    body: Array.isArray(job.body) ? job.body : null,
    location: job.location || "",
    salary: job.salary || "",
    tags: Array.isArray(job.tags) ? job.tags.filter(Boolean) : [],
    applyUrl: toApplyHref(job.applyUrl),
    image: job.image || "",
    isPublished: job.isPublished ?? true,
  };
}

export function getJobCategories(jobs: JobListing[]) {
  return [
    "All",
    ...Array.from(new Set(jobs.map((job) => job.category).filter(Boolean))),
  ];
}
