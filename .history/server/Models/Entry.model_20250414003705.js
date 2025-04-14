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
    description: String,
    learnings: String,
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
    taskTitle: {
      type: String,
      required: true,
    },
    description: String, // what was assigned
    howItWasDone: String,
    notesOrLearnings: String,
    tags: [String], // ['feature', 'urgent']

    subEntries: [subEntrySchema], // timeline updates
    attachments: [attachmentSchema], // screenshots/docs etc.
  },
  { timestamps: true }
);

const Entry = mongoose.model("Entry", entrySchema);
export default Entry;
