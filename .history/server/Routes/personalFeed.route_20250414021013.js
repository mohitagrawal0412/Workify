import express from "express";
import {
  createPersonalFeed,
  getAllPersonalFeeds,
  getPersonalFeedById,
  updatePersonalFeed,
  deletePersonalFeed,
} from "../Controllers/personalFeed.controller.js";

const router = express.Router();

// Create a new personal feed entry
router.post("/", createPersonalFeed);

// Get all personal feed entries
router.get("/", getAllPersonalFeeds);

// Get a single personal feed entry by ID
router.get("/:feedId", getPersonalFeedById);

// Update a personal feed entry
router.put("/:feedId", updatePersonalFeed);

// Delete a personal feed entry
router.delete("/:feedId", deletePersonalFeed);

export default router;
