const Event = require('../models/Event');

module.exports = async (req, res, next) => {
  const user = req.user; // Authenticated user
  const eventId = req.params.id; // Event ID from the request parameters
  //console.log(user);
  
  try {
    // Check if the user has admin privileges for the specific event
    if (user.adminEvents.includes(eventId)) {
      next();
    } else {
      res.status(403).json({ error: 'Access denied, you are not an admin for this event' });
    }
  } catch (error) {
    console.error('Error checking admin privileges:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
