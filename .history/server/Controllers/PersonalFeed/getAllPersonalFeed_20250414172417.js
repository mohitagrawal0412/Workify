import PersonalFeed from "../Models/PersonalFeed.model.js";
// Get all personal feed entries
export const getAllPersonalFeeds = async (req, res) => {
  try {
    const feeds = await PersonalFeed.find().sort({ date: -1 }); // Sort by most recent
    res.status(200).json(feeds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
