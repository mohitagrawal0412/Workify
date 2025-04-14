import express from "express";

import { createPersonalFeed } from "../Controllers/PersonalFeed/createPersonalFeed.js";
import { deletePersonalFeed } from "../Controllers/PersonalFeed/deletePersonalFeed.js";
import { getAllPersonalFeeds } from "../Controllers/PersonalFeed/getAllPersonalFeed.js";
import { updatePersonalFeed } from "../Controllers/PersonalFeed/updatePersonalFeed.js";

const router = express.Router();

// Create a new personal feed entry
router.post("/", createPersonalFeed);

// Get all personal feed entries
router.get("/", getAllPersonalFeeds);

// Update a personal feed entry
router.put("/:feedId", updatePersonalFeed);

// Delete a personal feed entry
router.delete("/:feedId", deletePersonalFeed);

export default router;
