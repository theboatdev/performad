import mongoose, { Document, Schema } from "mongoose";

interface Service {
  title: string;
  description: string;
  link: string;
}

interface Stat {
  value: string;
  label: string;
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin: string;
}

interface CoreValue {
  title: string;
  description: string;
}

interface Testimonial {
  text: string;
  name: string;
  role: string;
  image: string;
}

export interface AboutUsDocument extends Document {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  services: Service[];
  stats: Stat[];
  team: TeamMember[];
  coreValues: CoreValue[];
  testimonials: Testimonial[];
  contentHeading: string;
  contentDescription: string;
  isDeleted: boolean;
  deletedAt?: Date;
}

const ServiceSchema = new Schema<Service>({ title: String, description: String, link: String });
const StatSchema = new Schema<Stat>({ value: String, label: String });
const TeamMemberSchema = new Schema<TeamMember>({ name: String, role: String, image: String, linkedin: String });
const CoreValueSchema = new Schema<CoreValue>({ title: String, description: String });
const TestimonialSchema = new Schema<Testimonial>({ text: String, name: String, role: String, image: String });

const AboutUsSchema = new Schema<AboutUsDocument>(
  {
    heroTitle: String,
    heroSubtitle: String,
    heroDescription: String,
    services: [ServiceSchema],
    stats: [StatSchema],
    team: [TeamMemberSchema],
    coreValues: [CoreValueSchema],
    testimonials: [TestimonialSchema],
    contentHeading: String,
    contentDescription: String,
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.AboutUsContent ||
  mongoose.model<AboutUsDocument>("AboutUsContent", AboutUsSchema);