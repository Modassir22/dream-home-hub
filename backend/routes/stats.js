import express from 'express';
import Stats from '../models/Stats.js';

const router = express.Router();

// Get stats
router.get('/', async (req, res) => {
  try {
    let stats = await Stats.findOne();
    if (!stats) {
      // Create default stats if none exist
      stats = new Stats({
        yearsExperience: 15,
        happyFamilies: 500,
        activePlots: 50
      });
      await stats.save();
    }
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
