const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medicineName: { type: String, required: true },
  category: { type: String, enum: ['tablet', 'liquid', 'injection', 'inhaler', 'drops'], default: 'tablet' },
  dosage: { type: String, required: true },
  frequency: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  times: [{ type: String, required: true }],
  notes: { type: String },
  isActive: { type: Boolean, default: true },
  inventoryCount: { type: Number, default: 0 },
  lowStockAlert: { type: Number, default: 5 }
}, { timestamps: true });

module.exports = mongoose.model('Reminder', reminderSchema);