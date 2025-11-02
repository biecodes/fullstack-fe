import mongoose, { model, models, Schema } from "mongoose";

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    imageType: { type: String, required: true },
    slug: { type: String },
    content: { type: String, required: true },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    categories: [{ type: String }],
    likes: { type: Number, default: 0 },
    seo: {
      title: String,
      description: String,
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const BlogModel = models.Blog || model("Blog", BlogSchema);

export default BlogModel;
