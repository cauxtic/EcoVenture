// backend/routes/events.js
const express = require('express');
const { createEvent, updateEvent, getEvent,getChatMessages,postChatMessage,addUpdate, getAllEvents,getUpdates ,deleteEvent, getEvents,registerToEvent,cancelRegistration,getRegisteredEvents, getCreatedEvents } = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const eventParticipantMiddleware = require('../middlewares/eventParticipantMiddleware');
const router = express.Router();

router.get('/registered', authMiddleware, getRegisteredEvents); 
router.post('/register/:id',authMiddleware, registerToEvent); // Register for an event
router.post('/', authMiddleware, createEvent);
router.put('/:id', authMiddleware, updateEvent);
router.get('/filter',authMiddleware,getEvents);
router.get('/created',authMiddleware,getCreatedEvents);
router.get('/', authMiddleware, getAllEvents); // New route for fetching all events
router.delete('/:id', authMiddleware, deleteEvent);
router.delete('/cancel/:id', authMiddleware, cancelRegistration); 
router.get('/event/:id', authMiddleware, getEvent);
router.get('/:id/updates',authMiddleware, getUpdates);
router.post('/:id/updates',authMiddleware,adminMiddleware, addUpdate);
router.post('/:id/chats', authMiddleware, eventParticipantMiddleware, postChatMessage); // Route for posting chat messages
router.get('/:id/chats', authMiddleware, eventParticipantMiddleware, getChatMessages); // Route for getting chat messages

module.exports = router;
