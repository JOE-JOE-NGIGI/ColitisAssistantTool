import express from "express";

import {
  createSymptomEntry,
  getSymptomEntries
} from "../controllers/symptomController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .post(protect, createSymptomEntry)
  .get(protect, getSymptomEntries);

export default router;