import mongoose from "mongoose";

const symptomEntrySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    rawText: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["remission", "mild_flare", "active_flare"],
      default: "remission"
    },
    confidence: {
      type: String,
      enum: ["low", "moderate", "high"],
      default: "low"
    },
    summary: { type: String },
    recommendations: [{ type: String }],
    urgency: {
      type: String,
      enum: ["routine", "soon", "urgent"],
      default: "routine"
    }
  },
  { timestamps: true }
);

export default mongoose.model("SymptomEntry", symptomEntrySchema);