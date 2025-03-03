const express = require('express');
const Event = require('../models/Event');

const router = express.Router();

router.get('/events', async (req, res) => {
  const events = await Event.find();
  const expandedEvents = [];

  events.forEach((event) => {
    if (event.recurrence.frequency === 'none') {
      expandedEvents.push(event);
    } else {
      let startDate = new Date(event.startTime);
      let endDate = event.recurrence.endDate
        ? new Date(event.recurrence.endDate)
        : new Date(startDate);
      let interval = event.recurrence.interval;

      while (startDate <= endDate) {
        expandedEvents.push({
          ...event.toObject(),
          startTime: new Date(startDate),
        });

        if (event.recurrence.frequency === 'daily')
          startDate.setDate(startDate.getDate() + interval);
        else if (event.recurrence.frequency === 'weekly')
          startDate.setDate(startDate.getDate() + 7 * interval);
        else if (event.recurrence.frequency === 'monthly')
          startDate.setMonth(startDate.getMonth() + interval);
      }
    }
  });

  res.json(expandedEvents);
});

router.put('/events/:id', async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error });
  }
});

router.delete('/events/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error });
  }
});

module.exports = router;
