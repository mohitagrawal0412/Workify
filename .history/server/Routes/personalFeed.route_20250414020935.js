import express from "express";
import { createPersonalFeed,getAllPersonalFeeds,updatePersonalFeed,deletePersonalFeed,getPersonalFeedById} from "../Controllers/personalFeed.controller.js";

const router = express.Router();

router.post("/", createProject);
router.get("/", getAllProjects);

export default router;
