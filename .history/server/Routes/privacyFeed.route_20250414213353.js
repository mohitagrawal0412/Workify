// Routes/privacyFeed.route.js
import express from "express";

import { createPrivacyFeed } from "../Controllers/PrivacyFeed/createPrivacyFeed.js";
import { deletePrivacyFeed } from "../Controllers/PrivacyFeed/deletePrivacyFeed.js";
import { getAllPrivacyFeeds } from "../Controllers/PrivacyFeed/getAllPrivacyFeed.js";
import { updatePrivacyFeed } from "../Controllers/PrivacyFeed/updatePrivacyFeed.js";

const router = express.Router();

router.post("/", createPrivacyFeed);
router.get("/getAllPrivacyFeed", getAllPrivacyFeeds);

router.put("/:feedId/updatePrivacyFeed", updatePrivacyFeed);
router.delete("/:feedId", deletePrivacyFeed);

export default router;
