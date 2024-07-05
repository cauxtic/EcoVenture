const Event = require('../models/Event');

module.exports = async (req, res, next) => {
  const user = req.user; // Authenticated user
  const eventId = req.params.id; // Event ID from the request parameters

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const isRegistered = event.participants.some(participant => participant.email === user.email);

    if (!isRegistered) {
      return res.status(403).json({ error: 'You are not registered for this event' });
    }

    next();
  } catch (error) {
    console.error('Error checking event participation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
