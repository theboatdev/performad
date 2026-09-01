import mongoose, { Document, Schema } from "mongoose";

interface HeroContent {
  badge: string;
  title: string;
  highlight: string;
  description: string;
  buttonText: string;
  image: string;
}

interface ServiceCard {
  title: string;
  cardImage: string;
  description: string;
  cardSize: "m" | "l";
}

interface SeoFeature {
  icon: string;
  title: string;
  description: string;
}

interface BusinessPillar {
  title: string;
  text: string;
}

interface DontDoItem {
  text: string;
}

interface CtaContent {
  title: string;
  description: string;
  image: string;
  buttonText: string;
}

export interface ServicesDocument extends Document {
  hero: HeroContent;
  servicesSection: {
    heading: string;
    description: string;
  };
  serviceCards: ServiceCard[];
  seoSection: {
    headingPrefix: string;
    headingHighlight: string;
    supportingText: string;
  };
  seoFeatures: SeoFeature[];
  businessSection: {
    heading: string;
    highlight: string;
  };
  businessPillars: BusinessPillar[];
  dontSection: {
    heading: string;
    image: string;
  };
  dontDoItems: DontDoItem[];
  ctaSection: CtaContent;
  isDeleted: boolean;
  deletedAt?: Date;
}

const HeroSchema = new Schema<HeroContent>(
  {
    badge: { type: String, required: true },
    title: { type: String, required: true },
    highlight: { type: String, required: true },
    description: { type: String, required: true },
    buttonText: { type: String, required: true },
    image: { type: String, required: true },
  },
  { _id: false }
);

const ServiceCardSchema = new Schema<ServiceCard>(
  {
    title: { type: String, required: true },
    cardImage: { type: String, required: true },
    description: { type: String, required: true },
    cardSize: { type: String, enum: ["m", "l"], required: true },
  },
  { _id: true }
);

const SeoFeatureSchema = new Schema<SeoFeature>(
  {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: true }
);

const BusinessPillarSchema = new Schema<BusinessPillar>(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
  },
  { _id: true }
);

const DontDoItemSchema = new Schema<DontDoItem>(
  {
    text: { type: String, required: true },
  },
  { _id: true }
);

const CtaSchema = new Schema<CtaContent>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    buttonText: { type: String, required: true },
  },
  { _id: false }
);

const ServicesSchema = new Schema<ServicesDocument>(
  {
    hero: { type: HeroSchema, required: true },
    servicesSection: {
      heading: { type: String, required: true },
      description: { type: String, required: true },
    },
    serviceCards: { type: [ServiceCardSchema], default: [] },
    seoSection: {
      headingPrefix: { type: String, required: true },
      headingHighlight: { type: String, required: true },
      supportingText: { type: String, required: true },
    },
    seoFeatures: { type: [SeoFeatureSchema], default: [] },
    businessSection: {
      heading: { type: String, required: true },
      highlight: { type: String, required: true },
    },
    businessPillars: { type: [BusinessPillarSchema], default: [] },
    dontSection: {
      heading: { type: String, required: true },
      image: { type: String, required: true },
    },
    dontDoItems: { type: [DontDoItemSchema], default: [] },
    ctaSection: { type: CtaSchema, required: true },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.ServicesContent ||
  mongoose.model<ServicesDocument>("ServicesContent", ServicesSchema);
