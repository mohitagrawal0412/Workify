import express from "express";
import {
  createEntry,
  addSubEntry,
  getAllEntries,
} from "../Controllers/";

const router = express.Router();

router.post("/", createEntry);
router.post("/:entryId/sub-entry", addSubEntry);
router.get("/", getAllEntries);

export default router;
