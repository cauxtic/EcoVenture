// backend/controllers/eventController.js
const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  const { name, category } = req.body;
  try {
    const event = new Event({ name, category, organizer: req.user.id });
    const currentUser = req.user;

    const savedEvent  =  await event.save();
    currentUser.adminEvents.push(savedEvent._id);
    await currentUser.save();
    res.status(201).send(event);
  } catch (error) {
    res.status(400).send('Error creating event');
  }
};

exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if(updateData.isPaid === 'on')
    {
      updateData.isPaid = true;
    }
    else
    updateData.isPaid = false;

  try {
    const event = await Event.findByIdAndUpdate(id, updateData, { new: true });
    if (!event) {
      return res.status(404).send('Event not found');
    }
    res.send(event);
  } catch (error) {
    //console.log(updateData);
    //console.log('Error updating event:', error);
    res.status(400).send('Error updating event');
  }
};

exports.getEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).send('Event not found');
    }
    res.send(event);
  } catch (error) {
    res.status(400).send('Error fetching evennt');
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.send(events);
  } catch (error) {
    res.status(500).send('Error fetching events');
  }
};

// Function to fetch events with optional filters
exports.getEvents = async (req, res) => {
  try {
    let query = {};

    // Apply filters if provided in query parameters
    if (req.query.category) {
      query.category = req.query.category;
    }

    if (req.query.date) {
      query.date = req.query.date;
    }
    

    // Fetch events from database based on filters
    const events = await Event.find(query);
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Error fetching eventts' });
  }
};

// New function to delete an event
exports.deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).send('Event not found');
    }
    res.send({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).send('Error deleting event');
  }
};

// Function to register for an event using current user's info
exports.registerToEvent = async (req, res) => {
  const { id } = req.params;
  const currentUser = req.user; // Assuming the authenticated user object is stored in req.user

  try {
    // Find the event by ID
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Check if registration is closed or event status is not suitable for registration
    if (event.status !== 'Published' || new Date(event.registrationDeadline) < new Date()) {
      return res.status(400).json({ error: 'Registration closed for this event' });
    }

    // Check if event has reached max participants
    if (event.currentParticipants >= event.maxParticipants) {
      return res.status(400).json({ error: 'Event is already full' });
    }

    // Add participant to event using current user's info
    event.participants.push({ name: currentUser.name, email: currentUser.email });
    event.currentParticipants += 1;

    // Save updated event
    await event.save();

    res.json(event); // Optionally, you can return the updated event object
  } catch (error) {
    console.error('Error registering for event:', error);
    res.status(500).json({ error: 'Error registering for event' });
  }
};

exports.cancelRegistration = async (req, res) => {
  const { id } = req.params; // Event ID
  const currentUser = req.user; // Authenticated user

  try {
    // Find the event by ID
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Check if the user is registered for the event
    const participantIndex = event.participants.findIndex(
      participant => participant.email === currentUser.email
    );

    if (participantIndex === -1) {
      return res.status(400).json({ error: 'You are not registered for this event' });
    }

    // Remove the participant from the event
    event.participants.splice(participantIndex, 1);
    event.currentParticipants -= 1;

    // Save the updated event
    await event.save();

    res.json({ message: 'Registration canceled successfully', event });
  } catch (error) {
    console.error('Error canceling registration:', error);
    res.status(500).json({ error: 'Error canceling registration' });
  }
};

exports.getRegisteredEvents = async (req, res) => {
  const currentUser = req.user; // Authenticated user

  try {
    // Find events where the current user is a participant
    const events = await Event.find({
      'participants.email': currentUser.email,
    });

    res.json(events);
  } catch (error) {
    console.error('Error fetching registered events:', error);
    res.status(500).json({ error: 'Error fetching registered events' });
  }
};


exports.addUpdate = async (req, res) => {
  const { id } = req.params; // Event ID
  const { title, description } = req.body;

  try {
    // Find the event by ID
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Add the new update to the event
    event.updates.push({ title, description });

    // Save the updated event
    await event.save();

    res.json(event.updates);
  } catch (error) {
    console.error('Error adding update:', error);
    res.status(500).json({ error: 'Error adding update' });
  }
};

// Function to get updates
exports.getUpdates = async (req, res) => {
  const { id } = req.params; // Event ID

  try {
    // Find the event by ID
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Return the updates
    res.json(event.updates);
  } catch (error) {
    console.error('Error fetching updates:', error);
    res.status(500).json({ error: 'Error fetching updates' });
  }
};

exports.postChatMessage = async (req, res) => {
  const { id } = req.params; // Event ID
  const { message } = req.body;
  const currentUser = req.user; // Authenticated user

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const isRegistered = event.participants.some(
      participant => participant.email === currentUser.email
    );

    if (!isRegistered) {
      return res.status(403).json({ error: 'You are not registered for this event' });
    }

    event.chats.push({ user: currentUser._id, message });
    await event.save();

    res.status(201).json(event);
  } catch (error) {
    console.error('Error posting chat message:', error);
    res.status(500).json({ error: 'Error posting chat message' });
  }
};

// Function to get chat messages
exports.getChatMessages = async (req, res) => {
  const { id } = req.params; // Event ID

  try {
    const event = await Event.findById(id).populate('chats.user', 'name email');

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json(event.chats);
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    res.status(500).json({ error: 'Error fetching chat messages' });
  }
};

exports.getCreatedEvents = async (req, res) => {
  const currentUser = req.user; // Authenticated user

  try {
    // Find events where the current user is a participant
    const events = await Event.find({
      'organizer': currentUser.id,
    });

    res.json(events);
  } catch (error) {
    console.error('Error fetching created events:', error);
    res.status(500).json({ error: 'Error fetching created events' });
  }
};