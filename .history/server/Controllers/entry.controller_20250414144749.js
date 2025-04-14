import Entry from "../Models/Entry.model.js";

// Create new entry
// export const createEntry = async (req, res) => {
//   try {
//     const newEntry = new Entry(req.body);
//     const savedEntry = await newEntry.save();
//     res.status(201).json(savedEntry);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };
// Create a new entry for a specific project
export const createEntryForProject = async (req, res) => {
  const { projectId } = req.params; // The project ID from the route params
  const { entryTitle, description, notesOrLearnings, subEntries } = req.body; // Fields for the new entry

  try {
    // Check if the project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Create a new entry
    const newEntry = new Entry({
      project: projectId,
      entryTitle,
      description,
      notesOrLearnings,
      subEntries,  // Sub-entries array passed from the request body
    });

    // Save the entry to the database
    await newEntry.save();

    // Respond with the created entry
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ message: "Error creating entry", error });
  }
};

// Add sub-entry

export const addSubEntry = async (req, res) => {
  const { entryId } = req.params;
  const subEntry = req.body;

  try {
    // Ensure that the subEntry has required fields and is in the correct format
    console.log("Entry ID:", entryId);
    console.log("Sub Entry:", subEntry);

    const updatedEntry = await Entry.findByIdAndUpdate(
      entryId,
      { $push: { subEntries: subEntry } },
      { new: true }
    );

    if (!updatedEntry) {
      return res.status(404).json({ error: "Entry not found" });
    }

    res.status(200).json(updatedEntry);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// Get all entries
export const getAllEntries = async (req, res) => {
  try {
    const entries = await Entry.find().populate("project");
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get total spent time per entry
export const getTotalSpentTimePerEntry = async (req, res) => {
  try {
    const entries = await Entry.find();

    const result = entries.map((entry) => {
      const totalTime = entry.subEntries.reduce((sum, sub) => {
        return sum + (sub.spentTime || 0);
      }, 0);

      return {
        entryId: entry._id,
        title: entry.title || "Untitled Entry",
        totalSpentTime: totalTime, // in hours
      };
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getAllEntriesWithEntryTitle = async (req, res) => {
  try {
    const entries = await Entry.find()
      .populate("project", "title") // Only get project title
      .sort({ createdAt: -1 });

    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getSubEntriesOfEntry = async (req, res) => {
  const { entryId } = req.params;

  try {
    const entry = await Entry.findById(entryId);

    if (!entry) {
      return res.status(404).json({ error: "Entry not found" });
    }

    res.status(200).json(entry.subEntries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
