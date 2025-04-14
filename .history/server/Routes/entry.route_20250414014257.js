import express from "express";
import {
  createEntry,
  addSubEntry,
  getAllEntries,
} from "../Controllers/entry.controller.js";

const router = express.Router();

router.post("/", createEntry);
router.post("/:entryId/addSubEtry", addSubEntry);
router.get("/", getAllEntries);

export default router;
