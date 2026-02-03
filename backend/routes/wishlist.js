import express from 'express';
import Wishlist from '../models/Wishlist.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get user's wishlist
router.get('/', async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ user: req.user._id })
      .populate('plot')
      .sort({ addedAt: -1 });
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add plot to wishlist
router.post('/', async (req, res) => {
  try {
    const { plotId, notes } = req.body;

    // Check if already in wishlist
    const existing = await Wishlist.findOne({ user: req.user._id, plot: plotId });
    if (existing) {
      return res.status(400).json({ message: 'Plot already in wishlist' });
    }

    const wishlistItem = new Wishlist({
      user: req.user._id,
      plot: plotId,
      notes: notes || ''
    });

    await wishlistItem.save();
    await wishlistItem.populate('plot');
    
    res.status(201).json(wishlistItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update wishlist item status
router.put('/:id', async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    const wishlistItem = await Wishlist.findOne({ 
      _id: req.params.id, 
      user: req.user._id 
    });

    if (!wishlistItem) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }

    if (status) wishlistItem.status = status;
    if (notes !== undefined) wishlistItem.notes = notes;

    await wishlistItem.save();
    await wishlistItem.populate('plot');
    
    res.json(wishlistItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Remove from wishlist
router.delete('/:id', async (req, res) => {
  try {
    const wishlistItem = await Wishlist.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user._id 
    });

    if (!wishlistItem) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }

    res.json({ message: 'Removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Check if plot is in wishlist
router.get('/check/:plotId', async (req, res) => {
  try {
    const exists = await Wishlist.findOne({ 
      user: req.user._id, 
      plot: req.params.plotId 
    });
    res.json({ inWishlist: !!exists, wishlistId: exists?._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
