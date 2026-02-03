import express from 'express';
import ContactInfo from '../models/ContactInfo.js';

const router = express.Router();

// Get contact info
router.get('/', async (req, res) => {
  try {
    let contact = await ContactInfo.findOne();
    
    // If no contact info exists, create default
    if (!contact) {
      contact = new ContactInfo({
        phone: '+91 9835405160',
        whatsapp: '919835405160',
        email: 'contact@dreamhomedeveloper.com',
        address: 'Dream Home\'z Developer, Phulwari Sharif, Patna, Bihar - 801505',
        workingHours: 'Mon - Sat: 9:00 AM - 7:00 PM'
      });
      await contact.save();
    }
    
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
