import express from "express";
import {
  createEntry,
  addSubEntry,
  getAllEntries,
  getAllEntriesWithProjectTitle,
  getSubEntriesOfEntry,
} from "../Controllers/entry.controller.js";

const router = express.Router();

router.post("/", createEntry);
router.post("/:entryId/addSubEntry", addSubEntry);
router.get("/", getAllEntries);
router.get("/withProjectTitle", getAllEntriesWithProjectTitle);
router.get("/:entryId/subEntries", getSubEntriesOfEntry);

export default router;
