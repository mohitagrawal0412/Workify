import Entry from "../Models/Entry.model.js";

// Create new entry
export const createEntry = async (req, res) => {
  try {
    const newEntry = new Entry(req.body);
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (err) {
    res.status(400).json({ error: err.message });
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

export const getRunningProjects = async (req, res) => {
  try {
    const entries = await Entry.find().populate("project");

    const runningProjectsMap = {};

    entries.forEach((entry) => {
      const project = entry.project;
      if (!project) return;

      const isRunning = entry.subEntries?.some(
        (sub) =>
          !sub.spentTime || sub.spentTime === "running" || sub.spentTime === 0
      );

      if (isRunning) {
        runningProjectsMap[project._id] = project;
      }
    });

    const runningProjects = Object.values(runningProjectsMap);

    res.status(200).json({ runningProjects });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
