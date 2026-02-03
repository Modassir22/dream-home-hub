import mongoose from 'mongoose';

const statsSchema = new mongoose.Schema({
  yearsExperience: {
    type: Number,
    required: true,
    default: 15
  },
  happyFamilies: {
    type: Number,
    required: true,
    default: 500
  },
  activePlots: {
    type: Number,
    required: true,
    default: 50
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Stats', statsSchema);
