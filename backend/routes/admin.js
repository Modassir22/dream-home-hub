import express from 'express';
import Plot from '../models/Plot.js';
import TeamMember from '../models/TeamMember.js';
import ContactInfo from '../models/ContactInfo.js';
import Testimonial from '../models/Testimonial.js';
import Stats from '../models/Stats.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// All routes require admin authentication
router.use(authenticate);
router.use(isAdmin);

// ===== PLOTS MANAGEMENT =====

// Create plot
router.post('/plots', async (req, res) => {
  try {
    const plot = new Plot(req.body);
    await plot.save();
    res.status(201).json(plot);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update plot
router.put('/plots/:id', async (req, res) => {
  try {
    const plot = await Plot.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!plot) {
      return res.status(404).json({ message: 'Plot not found' });
    }
    res.json(plot);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete plot
router.delete('/plots/:id', async (req, res) => {
  try {
    const plot = await Plot.findByIdAndDelete(req.params.id);
    if (!plot) {
      return res.status(404).json({ message: 'Plot not found' });
    }
    res.json({ message: 'Plot deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ===== TEAM MANAGEMENT =====

// Create team member
router.post('/team', async (req, res) => {
  try {
    const member = new TeamMember(req.body);
    await member.save();
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update team member
router.put('/team/:id', async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete team member
router.delete('/team/:id', async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ===== CONTACT INFO MANAGEMENT =====

// Update contact info
router.put('/contact', async (req, res) => {
  try {
    let contact = await ContactInfo.findOne();
    if (!contact) {
      contact = new ContactInfo(req.body);
    } else {
      Object.assign(contact, req.body);
      contact.updatedAt = Date.now();
    }
    await contact.save();
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ===== TESTIMONIALS MANAGEMENT =====

// Create testimonial
router.post('/testimonials', async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update testimonial
router.put('/testimonials/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete testimonial
router.delete('/testimonials/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ===== STATS MANAGEMENT =====

// Update stats
router.put('/stats', async (req, res) => {
  try {
    let stats = await Stats.findOne();
    if (!stats) {
      stats = new Stats(req.body);
    } else {
      Object.assign(stats, req.body);
      stats.updatedAt = Date.now();
    }
    await stats.save();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
