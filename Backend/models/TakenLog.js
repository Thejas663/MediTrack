const mongoose = require('mongoose');

const takenLogSchema = new mongoose.Schema({
  reminderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Reminder', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  takenAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['taken', 'missed', 'skipped'], default: 'taken' },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('TakenLog', takenLogSchema);