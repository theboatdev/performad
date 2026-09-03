import React from "react";
import Head from "next/head";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { ArrowLeft, MapPin, Wallet } from "lucide-react";
import BlogBody from "../../components/blogs/BlogBody";
import { JobListing } from "../../lib/jobs";
import {
  getJobListingBySlug,
  getJobListingSlugs,
} from "../../sanity/lib/jobs";

interface JobDetailPageProps {
  job: JobListing | null;
}

const JobDetailPage: NextPage<JobDetailPageProps> = ({ job }) => {
  if (!job) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">Job not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-roboto">
      <Head>
        <title>{job.title} | Careers | Perfomad</title>
        <meta name="description" content={job.description} />
      </Head>

      <main className="py-20">
        <div className="container max-w-4xl px-4 mx-auto">
          <Link
            href="/career"
            className="inline-flex items-center gap-2 mb-8 text-sm font-semibold text-primary hover:gap-3 transition-all"
          >
            <ArrowLeft size={16} /> Back to Careers
          </Link>

          <header className="mb-10">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold uppercase tracking-wider bg-secondary text-primary rounded-lg">
              {job.category}
            </span>
            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl leading-tight">
              {job.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-700">
              <div className="flex items-center gap-1">
                <Wallet className="w-4 h-4" />
                <span>{job.salary}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </div>
            </div>
            {job.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs border border-gray-300 text-gray-700 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {job.image && (
            <div className="relative mb-10 overflow-hidden rounded-3xl shadow-xl aspect-video">
              <img
                src={job.image}
                alt={job.title}
                className="object-cover w-full h-full"
              />
            </div>
          )}

          <p className="mb-8 text-lg text-gray-700 leading-relaxed">
            {job.description}
          </p>

          {job.body && job.body.length > 0 && (
            <BlogBody body={job.body} />
          )}

          {job.applyUrl && (
            <a
              href={job.applyUrl}
              target={job.applyUrl.startsWith("mailto:") ? undefined : "_blank"}
              rel={
                job.applyUrl.startsWith("mailto:")
                  ? undefined
                  : "noopener noreferrer"
              }
              className="inline-flex mt-10 px-8 py-3 text-sm font-bold text-white bg-primary rounded-full hover:bg-opacity-90 transition-all"
            >
              Apply now
            </a>
          )}
        </div>
      </main>
    </div>
  );
};

export default JobDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getJobListingSlugs();

  return {
    paths: slugs.map((slug) => ({ params: { id: slug } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<JobDetailPageProps> = async (
  ctx
) => {
  const id = Array.isArray(ctx.params?.id) ? ctx.params?.id[0] : ctx.params?.id;
  const job = id ? await getJobListingBySlug(id) : null;

  if (!job) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  return {
    props: {
      job,
    },
    revalidate: 60,
  };
};
