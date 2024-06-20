import { Schema, model, models } from "mongoose";

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: [true, "Title must be unique"],
    },
    slug: {
      type: String,
      required: true,
      unique: [true, "Slug must be unique"],
    },
    description: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: String, required: true },
    tag: { type: String, required: true },
  },
  { timestamps: true }
);
const Posts = models.Posts || model("Posts", PostSchema);
export default Posts;
