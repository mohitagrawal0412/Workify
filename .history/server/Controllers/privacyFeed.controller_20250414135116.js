// Controllers/privacyFeed.controller.js
import PrivacyFeed from "../Models/Privacy.model.js";

// Create a new privacy feed
export const createPrivacyFeed = async (req, res) => {
  try {
    const newFeed = new PrivacyFeed(req.body);
    const savedFeed = await newFeed.save();
    res.status(201).json(savedFeed);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all privacy feeds
export const getAllPrivacyFeeds = async (req, res) => {
  try {
    const feeds = await PrivacyFeed.find().sort({ createdAt: -1 });
    res.status(200).json(feeds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single privacy feed by ID
export const getPrivacyFeedById = async (req, res) => {
  try {
    const feed = await PrivacyFeed.findById(req.params.feedId);
    if (!feed) return res.status(404).json({ error: "Feed not found" });
    res.status(200).json(feed);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a privacy feed
export const updatePrivacyFeed = async (req, res) => {
  try {
    const updatedFeed = await PrivacyFeed.findByIdAndUpdate(
      req.params.feedId,
      req.body,
      { new: true }
    );
    if (!updatedFeed) return res.status(404).json({ error: "Feed not found" });
    res.status(200).json(updatedFeed);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a privacy feed
export const deletePrivacyFeed = async (req, res) => {
  try {
    const deletedFeed = await PrivacyFeed.findByIdAndDelete(req.params.feedId);
    if (!deletedFeed) return res.status(404).json({ error: "Feed not found" });
    res.status(200).json({ message: "Feed deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
