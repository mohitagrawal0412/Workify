import mongoose from "mongoose";

const attachmentSchema = new mongoose.Schema(
  {
    fileName: String,
    fileUrl: String,
    fileType: String,
  },
  { _id: false }
);

const subEntrySchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    taskTitle: {
      type: String,
      required: true,
    },
    spentTime: {
      type: Number, // hours (e.g., 1.5 means 1 hour 30 mins)
    },
    description: String,
    learnings: String,
    howItWasDone: String,
    tags: [String], // ['feature', 'urgent']
    attachments: [attachmentSchema], // screenshots/docs etc.
  },
  { _id: false }
);

const entrySchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    entryTitle: {
      type: String,
      required: true,
    },
    description: String, // what was assigned
    notesOrLearnings: String,
    subEntries: [subEntrySchema], // timeline updatesattachments: [attachmentSchema], // screenshots/docs etc.
  },
  { timestamps: true }
);

const Entry = mongoose.model("Entry", entrySchema);
export default Entry;
