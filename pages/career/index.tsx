import JobBoard from "../../components/career/JobBoard";
import BlogSection from "../../components/layout/BlogSection";

export default function CareerPage() {
  return (
    <div className="bg-background">
      <BlogSection
        tag="Career"
        title="Be Part Of Our Mission"
        description="I'm a paragraph. Click here to add your own text and edit me."
        component={
          <JobBoard
            jobs={[]}
            categories={[]}
          />
        }
      />
    </div>
  );
}
