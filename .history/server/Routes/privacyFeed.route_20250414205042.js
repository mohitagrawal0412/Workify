// Routes/privacyFeed.route.js
import express from "express";
import {
  createPrivacyFeed,
  getAllPrivacyFeeds,
  getPrivacyFeedById,
  updatePrivacyFeed,
  deletePrivacyFeed,
} from "../Controllers/privacyFeed.controller.js";
import { createPrivacyFeed } from "../Controllers/PrivacyFeed/createPrivacyFeed.js";
import { deletePrivacyFeed } from "../Controllers/PrivacyFeed/deletePrivacyFeed.js";
import { getAllPrivacyFeeds } from "../Controllers/PrivacyFeed/getAllPrivacyFeed.js";
import { updatePrivacyFeed } from "../Controllers/PrivacyFeed/updatePersonalFeed.js";

const router = express.Router();

router.post("/", createPrivacyFeed);
router.get("/", getAllPrivacyFeeds);
router.get("/:feedId", getPrivacyFeedById);
router.put("/:feedId", updatePrivacyFeed);
router.delete("/:feedId", deletePrivacyFeed);

export default router;
