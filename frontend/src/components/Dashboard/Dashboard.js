import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [createdEvents, setCreatedEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ name: '', category: '' });

  useEffect(() => {
    // Fetch user details
    const fetchUser = async () => {
      try {
        const response = await api.get('/api/auth/user');
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user details', error);
      }
    };

    // Fetch all events
    const fetchEvents = async () => {
      try {
        const response = await api.get('/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch events', error);
      }
    };

    // Fetch registered events
    const fetchRegisteredEvents = async () => {
      try {
        const response = await api.get('/api/events/registered');
        setRegisteredEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch registered events', error);
      }
    };

    // Fetch created events
    const fetchCreatedEvents = async () => {
      try {
        const response = await api.get('/api/events/created');
        setCreatedEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch created events', error);
      }
    };

    fetchUser();
    fetchEvents();
    fetchRegisteredEvents();
    fetchCreatedEvents();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to render event cards
  const renderEventCards = (eventsArray) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {eventsArray.map(event => (
          <div key={event._id} className="bg-white shadow-lg rounded-lg p-4">
            <Link to={`/events/${event._id}`} className="block">
              <h3 className="text-lg font-bold mb-2">{event.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{event.category}</p>
              <p className="text-xs text-gray-500">{formatDate(event.createdAt)}</p>
            </Link>
          </div>
        ))}
      </div>
    );
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/events', newEvent);
      setShowModal(false);
      // Fetch updated events after creating a new one
      const updatedEvents = await api.get('/api/events');
      const updatedCreatedEvents = await api.get('/api/events/created');
      setEvents(updatedEvents.data);
      setCreatedEvents(updatedCreatedEvents.data);
    } catch (error) {
      console.error('Failed to create event', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-500 to-yellow-600 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Dashboard</h2>

        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-semibold text-gray-700">Hello, {user?.name}</h3>
            <p className="text-gray-600">Welcome to your event management dashboard</p>
          </div>
          <button onClick={() => setShowModal(true)} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
            Create New Event
          </button>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Registered Events</h3>
          {registeredEvents.length > 0 ? (
            renderEventCards(registeredEvents.slice(0, 4))
          ) : (
            <p className="text-gray-600">You are not registered for any events yet.</p>
          )}
          {registeredEvents.length > 4 && (
            <div className="text-center mt-4">
              <Link to="/registered-events" className="text-blue-500 hover:text-blue-700">View All Registered Events</Link>
            </div>
          )}
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Created Events</h3>
          {createdEvents.length > 0 ? (
            renderEventCards(createdEvents.slice(0, 4))
          ) : (
            <p className="text-gray-600">You have not created any events yet.</p>
          )}
          {createdEvents.length > 4 && (
            <div className="text-center mt-4">
              <Link to="/created-events" className="text-blue-500 hover:text-blue-700">View All Created Events</Link>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">All Events</h3>
          {events.length > 0 ? (
            renderEventCards(events.slice(0, 4))
          ) : (
            <p className="text-gray-600">No events available.</p>
          )}
          {events.length > 4 && (
            <div className="text-center mt-4">
              <Link to="/all-events" className="text-blue-500 hover:text-blue-700">View All Events</Link>
            </div>
          )}
        </div>
      </div>

      {/* Modal for creating a new event */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Create New Event</h3>
            <form onSubmit={handleCreateEvent}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Event Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className=" bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={newEvent.name}
                  onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  required
                  className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={newEvent.category}
                  onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Create
                </button>
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
