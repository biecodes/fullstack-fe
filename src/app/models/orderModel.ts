import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    templateId: { type: String, required: true }, // atau Number
    paketId: { type: String, required: true },
    name: { type: String, required: true },
    namaUsaha: { type: String, required: true },
    email: { type: String, required: true },
    noHp: { type: String, required: true },
    pembayaran: { type: String, required: true },
    status: { type: String, enum: ["pending", "progress", "success"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
