import React from "react";
import Link from "next/link";
import { MapPin, ArrowUpRight, Wallet } from "lucide-react";
import { JobListing } from "../../lib/jobs";

const JobCard: React.FC<{ job: JobListing }> = ({ job }) => {
  return (
    <Link
      href={`/career/${job.slug}`}
      className="bg-white rounded-xl shadow-sm border border-primary p-4 sm:p-5 flex flex-col gap-3 relative overflow-hidden hover:shadow-md transition-all duration-200 text-left"
    >
      {job.image && (
        <div className="relative -mx-4 -mt-4 sm:-mx-5 sm:-mt-5 mb-1 h-40 overflow-hidden">
          <img
            src={job.image}
            alt={job.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1">
          <h2 className="text-base sm:text-lg font-bold text-left text-gray-900">
            {job.title}
          </h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {job.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs border border-gray-300 text-gray-700 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="w-9 h-9 sm:w-11 sm:h-11 bg-primary text-white flex items-center justify-center rounded-full shrink-0">
          <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </div>

      <p className="text-sm border-t border-gray-200 pt-3 leading-relaxed text-justify text-gray-600">
        {job.description}
      </p>

      <div className="flex flex-wrap items-center mt-3 text-xs sm:text-sm text-gray-700 gap-x-4 gap-y-2">
        <div className="flex items-center gap-1">
          <Wallet className="w-4 h-4" />
          <span>{job.salary}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-24 h-24 sm:w-36 sm:h-36 bg-primary/20 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />
    </Link>
  );
};

export default JobCard;
