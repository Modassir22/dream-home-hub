import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  plot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plot',
    required: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['interested', 'contacted', 'visiting', 'negotiating', 'purchased'],
    default: 'interested'
  }
});

// Ensure a user can't add the same plot twice
wishlistSchema.index({ user: 1, plot: 1 }, { unique: true });

export default mongoose.model('Wishlist', wishlistSchema);
