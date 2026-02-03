import express from 'express';
import Plot from '../models/Plot.js';

const router = express.Router();

// Get all plots
router.get('/', async (req, res) => {
  try {
    const plots = await Plot.find().sort({ createdAt: -1 });
    res.json(plots);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get featured plots
router.get('/featured', async (req, res) => {
  try {
    const plots = await Plot.find({ isFeatured: true }).sort({ createdAt: -1 });
    res.json(plots);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single plot
router.get('/:id', async (req, res) => {
  try {
    const plot = await Plot.findById(req.params.id);
    if (!plot) {
      return res.status(404).json({ message: 'Plot not found' });
    }
    res.json(plot);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
