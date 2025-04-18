import Entry from "../models/Entry.js"; // Import the Entry model

// Controller function to get an entry by its ID
export const getEntryById = async (req, res) => {
  const { entryId } = req.params; // Get the entryId from the request params

  try {
    // Fetch the entry from the database using Mongoose's findById
    const entry = await Entry.findById(entryId);
    ); // Populate the project details (if needed)

    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    // Return the entry data as a response
    return res.status(200).json(entry);
  } catch (error) {
    console.error("Error fetching entry:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};
