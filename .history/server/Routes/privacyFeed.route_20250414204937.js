// Routes/privacyFeed.route.js
import express from "express";
import {
  createPrivacyFeed,
  getAllPrivacyFeeds,
  getPrivacyFeedById,
  updatePrivacyFeed,
  deletePrivacyFeed,
} from "../Controllers/privacyFeed.controller.js";
import { createPrivacyFeed } from "../Controllers/PersonalFeed/createPersonalFeed.js";
import { delete } from "../Controllers/PersonalFeed/deletePersonalFeed.js";
import { getAllPersonalFeeds } from "../Controllers/PersonalFeed/getAllPersonalFeed.js";
import { updatePersonalFeed } from "../Controllers/PersonalFeed/updatePersonalFeed.js";

const router = express.Router();

router.post("/", createPrivacyFeed);
router.get("/", getAllPrivacyFeeds);
router.get("/:feedId", getPrivacyFeedById);
router.put("/:feedId", updatePrivacyFeed);
router.delete("/:feedId", deletePrivacyFeed);

export default router;
