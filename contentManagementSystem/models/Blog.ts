import mongoose, { Document, Schema } from "mongoose";

interface BlogAuthor {
  name: string;
  photo: string;
}

export interface BlogDocument extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  image: string;
  category: string;
  author: BlogAuthor;
  publishedAt: Date;
  isPublished: boolean;
  isDeleted: boolean;
  deletedAt?: Date | null;
}

const BlogAuthorSchema = new Schema<BlogAuthor>(
  {
    name: { type: String, default: "" },
    photo: { type: String, default: "" },
  },
  { _id: false }
);

const BlogSchema = new Schema<BlogDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },
    excerpt: { type: String, default: "" },
    content: { type: [String], default: [] },
    image: { type: String, default: "" },
    category: { type: String, default: "" },
    author: { type: BlogAuthorSchema, default: () => ({ name: "", photo: "" }) },
    publishedAt: { type: Date, default: Date.now },
    isPublished: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.BlogContent ||
  mongoose.model<BlogDocument>("BlogContent", BlogSchema);
