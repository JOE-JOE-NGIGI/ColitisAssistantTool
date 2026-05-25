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

    createdAt: {
      type: Date,
      default: Date.now
    }
  }
);

export default mongoose.model(
  "SymptomEntry",
  symptomEntrySchema
);