import type { GetStaticProps, NextPage } from "next";
import JobBoard from "../../components/career/JobBoard";
import BlogSection from "../../components/layout/BlogSection";
import { JobListing, getJobCategories } from "../../lib/jobs";
import { getAllJobListings } from "../../sanity/lib/jobs";

interface CareerPageProps {
  jobs: JobListing[];
}

const CareerPage: NextPage<CareerPageProps> = ({ jobs }) => {
  const categories = getJobCategories(jobs);

  return (
    <div className="bg-background">
      <BlogSection
        tag="Career"
        title="Be Part Of Our Mission"
        description="Join a team that helps brands grow with performance marketing, paid media, and digital strategy."
        component={<JobBoard jobs={jobs} categories={categories} />}
      />
    </div>
  );
};

export default CareerPage;

export const getStaticProps: GetStaticProps<CareerPageProps> = async () => {
  const jobs = await getAllJobListings();

  return {
    props: {
      jobs,
    },
    revalidate: 60,
  };
};
