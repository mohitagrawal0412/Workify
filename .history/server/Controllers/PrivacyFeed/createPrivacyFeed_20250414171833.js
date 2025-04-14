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
