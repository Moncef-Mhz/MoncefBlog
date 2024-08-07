import { Schema, model, models } from "mongoose";

const BestPostSchema = new Schema(
  {
    post: {
      type: [Schema.Types.ObjectId],
      ref: "Posts",
      required: true,
    },
  },
  { timestamps: true }
);
const BestPosts = models.Posts || model("Posts", BestPostSchema);
export default BestPosts;
