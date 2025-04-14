import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ProjectSchema = new Schema({
  projectName: { type: String, required: true },
  description: String,
  dateStarted: Date,
  deadline: Date,
  totalSpentTime: { type: Number, default: 0 }, // In hours or minutes
  learning: String,
  status: {
    type: String,
    enum: ["running", "completed", "under seen of manager"],
    default: "running",
  },
  entries: [{ type: Schema.Types.ObjectId, ref: "Entry" }],
  personalFeedback: String,
  createdAt: { type: Date, default: Date.now },
});

// Cascade delete entries when project is deleted
ProjectSchema.pre("findOneAndDelete", async function (next) {
  const project = await this.model.findOne(this.getQuery());
  await mongoose.model("Entry").deleteMany({ projectId: project._id });
  next();
});

const Project = model("Project", ProjectSchema);

export default Project;
