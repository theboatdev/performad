import type { SanityImageSource } from "@sanity/image-url";
import { JobListing, normalizeJobListing, slugifyJob } from "../../lib/jobs";
import { hasSanityConfig } from "../env";
import { client } from "./client";
import { urlForImage } from "./image";
import {
  jobListingBySlugQuery,
  jobListingSlugsQuery,
  jobListingsQuery,
} from "./queries";

type SanityJobListing = {
  _id: string;
  title?: string;
  slug?: string;
  category?: string;
  description?: string;
  body?: unknown[];
  location?: string;
  salary?: string;
  tags?: string[];
  applyUrl?: string;
  image?: SanityImageSource;
  isPublished?: boolean;
};

function mapSanityJob(job: SanityJobListing): JobListing {
  return normalizeJobListing({
    _id: job._id,
    slug: job.slug || slugifyJob(job.title || ""),
    title: job.title,
    category: job.category,
    description: job.description,
    body: job.body,
    location: job.location,
    salary: job.salary,
    tags: job.tags,
    applyUrl: job.applyUrl,
    image: job.image ? urlForImage(job.image).width(1600).height(900).url() : "",
    isPublished: job.isPublished,
  });
}

export async function getAllJobListings(): Promise<JobListing[]> {
  if (!hasSanityConfig()) {
    return [];
  }

  try {
    const jobs = await client.fetch<SanityJobListing[]>(jobListingsQuery);
    return jobs.map(mapSanityJob);
  } catch (error) {
    console.error("Failed to fetch job listings from Sanity:", error);
    return [];
  }
}

export async function getJobListingBySlug(
  slug: string
): Promise<JobListing | null> {
  if (!hasSanityConfig()) {
    return null;
  }

  try {
    const job = await client.fetch<SanityJobListing | null>(
      jobListingBySlugQuery,
      { slug }
    );
    return job ? mapSanityJob(job) : null;
  } catch (error) {
    console.error("Failed to fetch job listing from Sanity:", error);
    return null;
  }
}

export async function getJobListingSlugs(): Promise<string[]> {
  if (!hasSanityConfig()) {
    return [];
  }

  try {
    return await client.fetch<string[]>(jobListingSlugsQuery);
  } catch (error) {
    console.error("Failed to fetch job slugs from Sanity:", error);
    return [];
  }
}
