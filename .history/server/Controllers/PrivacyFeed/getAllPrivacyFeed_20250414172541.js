import PrivacyFeed from "../../Models/Privacy.model.js";
// Get all privacy feeds
export const getAllPrivacyFeeds = async (req, res) => {
  try {
    const feeds = await PrivacyFeed.find().sort({ createdAt: -1 });
    res.status(200).json(feeds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
