import PersonalFeed from "../";

// Create a new personal feed entry
export const createPersonalFeed = async (req, res) => {
  const { text } = req.body;

  try {
    const newFeed = new PersonalFeed({ text });
    const savedFeed = await newFeed.save();
    res.status(201).json(savedFeed);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all personal feed entries
export const getAllPersonalFeeds = async (req, res) => {
  try {
    const feeds = await PersonalFeed.find().sort({ date: -1 }); // Sort by most recent
    res.status(200).json(feeds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a specific personal feed entry by ID
export const getPersonalFeedById = async (req, res) => {
  const { feedId } = req.params;

  try {
    const feed = await PersonalFeed.findById(feedId);
    if (!feed) {
      return res.status(404).json({ error: "Feed entry not found" });
    }
    res.status(200).json(feed);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a personal feed entry
export const updatePersonalFeed = async (req, res) => {
  const { feedId } = req.params;
  const { text } = req.body;

  try {
    const updatedFeed = await PersonalFeed.findByIdAndUpdate(
      feedId,
      { text },
      { new: true }
    );
    if (!updatedFeed) {
      return res.status(404).json({ error: "Feed entry not found" });
    }
    res.status(200).json(updatedFeed);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a personal feed entry
export const deletePersonalFeed = async (req, res) => {
  const { feedId } = req.params;

  try {
    const deletedFeed = await PersonalFeed.findByIdAndDelete(feedId);
    if (!deletedFeed) {
      return res.status(404).json({ error: "Feed entry not found" });
    }
    res.status(200).json({ message: "Feed entry deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
