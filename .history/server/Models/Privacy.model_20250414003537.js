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

const personalFeed = mongoose.model("Reflection", privacylFeedSchema);
export default personalFeed;
