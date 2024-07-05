import React, { useState } from 'react';
import api from '../../services/api';

const CreateEvent = ({ history }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/events', { name, description, date, venue, maxParticipants });
      history.push('/events'); // Navigate programmatically after event creation
    } catch (error) {
      console.error('Failed to create event', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-500 to-yellow-600 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Event Name
            </label>
            <input
              className="shadow bg-gray-100 border rounded w-full py-2 px-3 text-gray-700"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Event Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Event Description
            </label>
            <textarea
              className="shadow bg-gray-100 border rounded w-full py-2 px-3 text-gray-700"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Event Description"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
              Event Date
            </label>
            <input
              className="shadow bg-gray-100 border rounded w-full py-2 px-3 text-gray-700"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="venue">
              Event Venue
            </label>
            <input
              className="shadow bg-gray-100 border rounded w-full py-2 px-3 text-gray-700"
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              placeholder="Event Venue"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maxParticipants">
              Max Participants
            </label>
            <input
              className="shadow bg-gray-100 border rounded w-full py-2 px-3 text-gray-700"
              type="number"
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(e.target.value)}
              placeholder="Max Participants"
              required
            />
          </div>
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;