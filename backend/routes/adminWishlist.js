import express from 'express';
import Wishlist from '../models/Wishlist.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// All routes require admin authentication
router.use(authenticate);
router.use(isAdmin);

// Get all wishlists (for admin to see which users are interested in which plots)
router.get('/', async (req, res) => {
  try {
    const wishlists = await Wishlist.find()
      .populate('user', 'username email')
      .populate('plot')
      .sort({ addedAt: -1 });
    res.json(wishlists);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get wishlists by plot
router.get('/plot/:plotId', async (req, res) => {
  try {
    const wishlists = await Wishlist.find({ plot: req.params.plotId })
      .populate('user', 'username email')
      .sort({ addedAt: -1 });
    res.json(wishlists);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get wishlists by user
router.get('/user/:userId', async (req, res) => {
  try {
    const wishlists = await Wishlist.find({ user: req.params.userId })
      .populate('plot')
      .sort({ addedAt: -1 });
    res.json(wishlists);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get wishlist statistics
router.get('/stats', async (req, res) => {
  try {
    const totalWishlists = await Wishlist.countDocuments();
    const byStatus = await Wishlist.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    const topPlots = await Wishlist.aggregate([
      { $group: { _id: '$plot', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $lookup: { from: 'plots', localField: '_id', foreignField: '_id', as: 'plotDetails' } }
    ]);

    res.json({
      total: totalWishlists,
      byStatus,
      topPlots
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
