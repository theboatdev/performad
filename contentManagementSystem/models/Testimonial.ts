import mongoose, { Document, Schema } from "mongoose";

export interface TestimonialDocument extends Document {
  name: string;
  title: string;
  text: string;
  stars: number;
  image: string;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<TestimonialDocument>(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    stars: { type: Number, required: true, min: 1, max: 5 },
    image: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial ||
  mongoose.model<TestimonialDocument>("Testimonial", TestimonialSchema);
