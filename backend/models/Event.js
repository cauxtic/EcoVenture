// backend/models/Event.js
const mongoose = require('mongoose');


const updateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const chatSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true, // e.g., Cultural, Sports, Tech
  },
  date: {
    type: Date,
  },
  time: {
    type: String,
  },
  venue: {
    type: String,
  },
  description: {
    type: String,
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  registrationDeadline: {
    type: Date,
  },
  maxParticipants: {
    type: Number,
  },
  currentParticipants: {
    type: Number,
    default: 0,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    default: 0,
  },
  contactEmail: {
    type: String,
  },
  contactPhone: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Draft', 'Published', 'Upcoming', 'Ongoing', 'Completed', 'Cancelled'],
    default: 'Draft',
  },
  feedback: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      comment: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  images: [
    {
      url: String,
      description: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  registrationDeadline: {
    type: Date,
  },
  maxParticipants: {
    type: Number,
  },
  currentParticipants: {
    type: Number,
    default: 0,
  },
  participants: [
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
  ],
  updates: [updateSchema],
  chats: [chatSchema],
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
