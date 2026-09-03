import React, { useState } from "react";
import JobCard from "./JobCardProps";
import { JobListing } from "../../lib/jobs";

interface Props {
  jobs: JobListing[];
  categories: string[];
}

const JobBoard: React.FC<Props> = ({ jobs, categories }) => {
  const catList = categories.length > 0 ? categories : ["All"];
  const [activeTab, setActiveTab] = useState<string>("All");
  const filteredJobs =
    activeTab === "All"
      ? jobs
      : jobs.filter((job) => job.category === activeTab);

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-10">
      <div className="w-full bg-white rounded-2xl shadow-sm p-4 sm:p-6">
        <div className="mb-6">
          <div className="flex gap-2 sm:gap-3 overflow-x-auto no-scrollbar whitespace-nowrap">
            {catList.map((cat) => {
              const isActive = activeTab === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200
                    ${isActive ? "bg-primary text-white border border-primary" : "bg-white text-primary border border-primary hover:bg-primary/10"}`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 min-h-[300px] w-full transition-all duration-300">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => <JobCard key={job.slug} job={job} />)
          ) : (
            <div className="col-span-full flex justify-center items-center text-gray-500 text-sm h-[300px] w-full">
              No jobs available in this category
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobBoard;
