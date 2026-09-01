import mongoose, { Document, Schema } from "mongoose";

interface Office {
  name: string;
  address: string;
  phone: string;
  email: string;
  mapUrl: string;
}

interface FAQ {
  question: string;
  answer: string;
}

export interface ContactUsDocument extends Document {
  heroTitle: string;
  heroSubtitle: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  offices: Office[];
  faqs: FAQ[];
  isDeleted: boolean;
  deletedAt?: Date;
}

const OfficeSchema = new Schema<Office>({
  name: String,
  address: String,
  phone: String,
  email: String,
  mapUrl: String,
});

const FAQSchema = new Schema<FAQ>({
  question: String,
  answer: String,
});

const ContactUsSchema = new Schema<ContactUsDocument>(
  {
    heroTitle: String,
    heroSubtitle: String,
    contactEmail: String,
    contactPhone: String,
    contactAddress: String,
    offices: [OfficeSchema],
    faqs: [FAQSchema],
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.ContactUsContent ||
  mongoose.model<ContactUsDocument>("ContactUsContent", ContactUsSchema);