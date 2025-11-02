import mongoose from "mongoose";

const WidgetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    settings: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

export default mongoose.models.Widget || mongoose.model("Widget", WidgetSchema);
