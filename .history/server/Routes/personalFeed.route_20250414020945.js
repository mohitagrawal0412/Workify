import express from "express";
import {
  createPersonalFeed,
  getAllPersonalFeeds,
  updatePersonalFeed,
  deletePersonalFeed,
  getPersonalFeedById,
} from "../Controllers/personalFeed.controller.js";

const router = express.Router();


export default router;
