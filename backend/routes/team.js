import express from 'express';
import TeamMember from '../models/TeamMember.js';

const router = express.Router();

// Get all team members
router.get('/', async (req, res) => {
  try {
    const members = await TeamMember.find().sort({ order: 1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
