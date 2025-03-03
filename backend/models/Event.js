const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  startTime: Date,
  endTime: Date,
  type: { type: String, enum: ['appointment', 'event'] },
  recurrence: {
    frequency: {
      type: String,
      enum: ['none', 'daily', 'weekly', 'monthly'],
      default: 'none',
    },
    interval: { type: Number, default: 1 }, // 1 = every day/week/month
    endDate: { type: Date, default: null },
  },
});

module.exports = mongoose.model('Event', eventSchema);
