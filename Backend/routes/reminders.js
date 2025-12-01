const express = require('express');
const Reminder = require('../models/Reminder');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all reminders with filtering, searching, sorting, pagination
router.get('/', auth, async (req, res) => {
  try {
    const { search, sortBy = 'createdAt', sortOrder = 'desc', page = 1, limit = 10 } = req.query;
    
    let query = { userId: req.user._id };
    
    if (search) {
      query.medicineName = { $regex: search, $options: 'i' };
    }

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const reminders = await Reminder.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Reminder.countDocuments(query);

    res.json({
      reminders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create reminder
router.post('/', auth, async (req, res) => {
  try {
    const reminder = new Reminder({
      ...req.body,
      userId: req.user._id
    });
    await reminder.save();
    res.status(201).json(reminder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update reminder
router.put('/:id', auth, async (req, res) => {
  try {
    const reminder = await Reminder.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }
    res.json(reminder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete reminder
router.delete('/:id', auth, async (req, res) => {
  try {
    const reminder = await Reminder.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });
    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }
    res.json({ message: 'Reminder deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;