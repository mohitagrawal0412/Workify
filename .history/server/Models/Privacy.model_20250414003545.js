import mongoose from "mongoose";

const privacylFeedSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const privacyFeed = mongoose.model("Reflection", privacylFeedSchema);
export default privacylFeedSchema;
