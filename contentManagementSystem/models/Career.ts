import mongoose, { Document, Schema } from "mongoose";

interface JobOpening {
  title: string;
  category: string;
  description: string;
  location: string;
  salary: string;
  tags: string[];
  isActive: boolean;
}

export interface CareerDocument extends Document {
  heroTag: string;
  heroTitle: string;
  heroDescription: string;
  jobOpenings: JobOpening[];
  categories: string[];
  isDeleted: boolean;
  deletedAt?: Date;
}

const JobOpeningSchema = new Schema<JobOpening>(
  {
    title: { type: String, default: "" },
    category: { type: String, default: "" },
    description: { type: String, default: "" },
    location: { type: String, default: "" },
    salary: { type: String, default: "" },
    tags: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { _id: true }
);

const CareerSchema = new Schema<CareerDocument>(
  {
    heroTag: { type: String, default: "" },
    heroTitle: { type: String, default: "" },
    heroDescription: { type: String, default: "" },
    jobOpenings: { type: [JobOpeningSchema], default: [] },
    categories: { type: [String], default: [] },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.CareerContent ||
  mongoose.model<CareerDocument>("CareerContent", CareerSchema);
