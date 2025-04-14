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
// export const addSubEntry = async (req, res) => {
//   const { entryId } = req.params;
//   const subEntry = req.body;

//   try {
//     const updatedEntry = await Entry.findByIdAndUpdate(
//       entryId,
//       { $push: { subEntries: subEntry } },
//       { new: true }
//     );
//     res.status(200).json(updatedEntry);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };
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
