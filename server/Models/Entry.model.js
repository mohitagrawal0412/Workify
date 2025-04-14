import mongoose from "mongoose";

const { Schema, model } = mongoose;

const SubEntrySchema = new Schema({
  workTitle: String,
  description: String,
  whatLearned: String,
  tags: [String],
  notes: String,
  attachments: [String], // File URLs or filenames
  spentTime: { type: Number, default: 0 }, // In hours or minutes
  createdAt: { type: Date, default: Date.now },
});

const EntrySchema = new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: "Project" },
  entryTitle: { type: String, required: true },
  description: String,
  subEntries: [SubEntrySchema],
  totalSpentTime: { type: Number, default: 0 }, // Sum of subEntries
  createdAt: { type: Date, default: Date.now },
});

// Cascade hook: updates project's totalSpentTime after deleting entry
EntrySchema.pre("findOneAndDelete", async function (next) {
  const entry = await this.model.findOne(this.getQuery());

  const Project = mongoose.model("Project");
  const totalToSubtract = entry.totalSpentTime;

  await Project.updateOne(
    { _id: entry.projectId },
    { $inc: { totalSpentTime: -totalToSubtract } }
  );

  next();
});

// Method to recalculate total time from subEntries
EntrySchema.methods.recalculateTime = function () {
  const total = this.subEntries.reduce(
    (acc, sub) => acc + (sub.spentTime || 0),
    0
  );
  this.totalSpentTime = total;
  return total;
};

const Entry = model("Entry", EntrySchema);

export default Entry;
