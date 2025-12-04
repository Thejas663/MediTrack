const express = require('express');
const TakenLog = require('../models/TakenLog');
const auth = require('../middleware/auth');
const router = express.Router();

// Mark medicine as taken
router.post('/', auth, async (req, res) => {
  try {
    const { reminderId, status, notes } = req.body;
    
    const takenLog = new TakenLog({
      reminderId,
      userId: req.user._id,
      status: status || 'taken',
      notes
    });
    
    await takenLog.save();
    res.status(201).json({ message: 'Medicine marked as taken!', takenLog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get taken history for a reminder
router.get('/:reminderId', auth, async (req, res) => {
  try {
    const logs = await TakenLog.find({
      reminderId: req.params.reminderId,
      userId: req.user._id
    }).sort({ takenAt: -1 });
    
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;