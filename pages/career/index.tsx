import type { GetServerSideProps } from "next";
import dbConnect from "../../contentManagementSystem/lib/mongodb";
import Career from "../../contentManagementSystem/models/Career";
import JobBoard from "../../components/career/JobBoard";
import BlogSection from "../../components/layout/BlogSection";

interface JobOpening {
  title: string;
  category: string;
  description: string;
  location: string;
  salary: string;
  tags: string[];
  isActive: boolean;
}

interface CareerData {
  heroTag: string;
  heroTitle: string;
  heroDescription: string;
  jobOpenings: JobOpening[];
  categories: string[];
}

export default function CareerPage({ data }: { data: CareerData | null }) {
  const activeJobs = (data?.jobOpenings ?? []).filter((j) => j.isActive !== false);

  return (
    <div className="bg-background">
      <BlogSection
        tag={data?.heroTag || "Career"}
        title={data?.heroTitle || "Be Part Of Our Mission"}
        description={data?.heroDescription || "I'm a paragraph. Click here to add your own text and edit me."}
        component={
          <JobBoard
            jobs={activeJobs}
            categories={data?.categories ?? []}
          />
        }
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    await dbConnect();
    const doc = await Career.findOne({ isDeleted: false }).lean();
    return { props: { data: doc ? JSON.parse(JSON.stringify(doc)) : null } };
  } catch {
    return { props: { data: null } };
  }
};
