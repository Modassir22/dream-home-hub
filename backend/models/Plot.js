import mongoose from 'mongoose';

const plotSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  pricePerSqFt: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'booked'],
    default: 'available'
  },
  image: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  description: {
    type: String,
    required: true
  },
  amenities: [{
    type: String
  }],
  isFeatured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Plot', plotSchema);
