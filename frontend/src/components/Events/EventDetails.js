import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import UpdateModal from './UpdateModal';
const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [user, setUser] = useState(null);
  const [isCreator, setIsCreator] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);


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

    // Fetch event details
    const fetchEventDetails = async () => {
      try {
        const response = await api.get(`/api/events/event/${id}`);
        setEvent(response.data);
        setIsCreator(response.data.organizer === user?._id);
      } catch (error) {
        console.error('Failed to fetch event details', error);
      }
    };

    // Fetch event updates
    const fetchEventUpdates = async () => {
      try {
        const response = await api.get(`/api/events/${id}/updates`);
        setUpdates(response.data);
      } catch (error) {
        console.error('Failed to fetch event updates', error);
      }
    };

    // Fetch registered events
    const fetchRegisteredEvents = async () => {
      try {
        const response = await api.get('/api/events/registered');
        for(let x=0; x<response.data.length; x++){
          if(response.data[x]._id === id){
            setIsRegistered(true);
          }
        }
        setRegisteredEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch registered events', error);
      }
    };

    fetchUser();
    fetchEventDetails();
    fetchEventUpdates();
    fetchRegisteredEvents();
  }, [id, user?._id]);

  const handleRegister = async () => {
    try {
      await api.post(`/api/events/register/${id}`);
      alert('Successfully registered for the event.');
      // Update registered events and UI accordingly
      setRegisteredEvents([...registeredEvents, id]);
      setIsRegistered(true);
      // Assuming `id` is added to registered events
    } catch (error) {
      alert(`${error.response.data.error}`);
      console.error('Failed to register for the event', error);
    }
  };

  const handleCancelRegistration = async () => {
    try {
      await api.delete(`/api/events/cancel/${id}`);
      alert('Successfully canceled registration.');
      // Update registered events and UI accordingly
      setRegisteredEvents(registeredEvents.filter(eventId => eventId !== id));
      setIsRegistered(false);
    } catch (error) {
      console.error('Failed to cancel registration', error);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      await api.delete(`/api/events/${id}`);
      alert('Event deleted successfully.');
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to delete event', error);
    }
  };

  const handleAddUpdate = async (update) => {
    try {
      const response = await api.post(`/api/events/${id}/updates`, update);
      setUpdates(response.data);
      console.log(response.data);
      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error('Failed to add update', error);
    }
  };

  return (
    <div className="bg-emerald-700 py-16 px-6">
      {event && (
        <div className="max-w-4xl mx-auto">
          <Link to="/dashboard" className="text-white hover:text-blue-700 mb-4 block">Back to Dashboard</Link>
          <h2 className="text-4xl text-white font-bold text-center mb-2">{event.name}</h2>
          <h3 className="text-2xl text-center text-white mb-8">{event.category}</h3>

          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex-1 md:pr-6">
              <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                <h3 className="text-2xl font-bold mb-2">Event Information</h3>
                <p className="text-gray-600">Date: {new Date(event.date).toLocaleDateString()}</p>
                <p className="text-gray-600">Time: {event.time}</p>
                <p className="text-gray-600">Venue: {event.venue}</p>
                <p className="text-gray-600">Description: {event.description}</p>
                <p className="text-gray-600">Organizer: {event.organizer}</p>
                <p className="text-gray-600">Max Participants: {event.maxParticipants}</p>
                <p className="text-gray-600">Current Participants: {event.currentParticipants}</p>
                <p className="text-gray-600">Price: {event.isPaid ? `$${event.price}` : 'Free'}</p>
              </div>

              <div className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-2xl font-bold mb-2">Updates</h3>
                {updates.length > 0 ? (
                  updates.map(update => (
                    <div key={update._id} className="border-b border-gray-200 py-2">
                      <h4 className="text-lg font-bold">{update.title}</h4>
                      <p className="text-gray-600">{update.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No updates available.</p>
                )}
              </div>
            </div>

            <div className="w-full md:w-1/3">
              <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                <h3 className="text-2xl font-bold mb-2">Actions</h3>
                {!isRegistered ? (
                  <button
                    onClick={handleRegister}
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mb-4 w-full"
                  >
                    Register Now
                  </button>
                ) : (
                  <button
                    onClick={handleCancelRegistration}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4 w-full"
                  >
                    Cancel Registration
                  </button>
                )}

                {isCreator && (
                  <div>

                    <button
                      onClick={() => setIsUpdateModalOpen(true)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                    >
                      Add Update
                    </button>
                    <Link
                      to={`/events/edit/${id}`}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4 w-full block text-center"
                    >
                      Edit Event
                    </Link>
                    <button
                      onClick={handleDeleteEvent}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
                    >
                      Delete Event
                    </button>
                  </div>
                )}
               
              </div>
            </div>
          </div>
        </div>
      )}
       <UpdateModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSubmit={handleAddUpdate}
      />
    </div>
  );
};

export default EventDetails;
