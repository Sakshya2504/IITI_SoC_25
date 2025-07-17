import express from 'express';
import { Clubs_ } from "../models/Club.js";


const router = express.Router();
router.get("/:clubname", async (req, res) => {
  try {
    if (!req.params.clubname) return res.status(400).json({ error: "Name is required" });
    const club = await Clubs_.findOne({ name: req.params.clubname });
    if (!club) {
      return res.status(404).json({ error: "Club not found" });
    }
    res.json(club);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;