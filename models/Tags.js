import { Schema, model, models } from "mongoose";

const TagShcema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Title is required"],
      unique: [true, "title must be unique"],
    },
  },
  { timestamps: true }
);

const Tags = models.Tags || model("Tags", TagShcema);
export default Tags;
