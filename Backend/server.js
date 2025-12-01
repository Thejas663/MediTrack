const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const reminderRoutes = require('./routes/reminders');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/reminders', reminderRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'MediTrack API is running!' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Notification scheduler (runs every minute)
cron.schedule('* * * * *', async () => {
  try {
    const Reminder = require('./models/Reminder');
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);
    const currentDate = now.toISOString().split('T')[0];

    const reminders = await Reminder.find({
      isActive: true,
      startDate: { $lte: now },
      endDate: { $gte: now },
      times: currentTime
    }).populate('userId');

    // In production, you would send actual notifications here
    if (reminders.length > 0) {
      console.log(`${reminders.length} reminders triggered at ${currentTime}`);
    }
  } catch (error) {
    console.error('Notification scheduler error:', error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});