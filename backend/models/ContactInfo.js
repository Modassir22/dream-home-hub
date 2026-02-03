import mongoose from 'mongoose';

const contactInfoSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true
  },
  whatsapp: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  workingHours: {
    type: String,
    default: 'Mon - Sat: 9:00 AM - 7:00 PM'
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('ContactInfo', contactInfoSchema);
