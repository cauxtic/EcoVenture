import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

const EditEvent = ({ history }) => {
  const { id } = useParams();
  const [event, setEvent] = useState({
    name: '',
    category: '',
    date: '',
    time: '',
    venue: '',
    description: '',
    organizer: '',
    registrationDeadline: '',
    maxParticipants: 0,
    isPaid: false,
    price: 0,
    contactEmail: '',
    contactPhone: '',
    status: 'Draft'
  });
  

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/api/events/event/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Failed to fetch event details', error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent(prevEvent => ({
      ...prevEvent,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/events/${id}`, event);
      alert('Event updated successfully.');
      window.location.href = `/events/${id}`;
    } catch (error) {
      console.error('Failed to update event', error);
      alert('Failed to update event. Please try again.');
    }
  };

  return (
    <div className="bg-emerald-600 py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-4">Edit Event</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-white font-bold mb-2">Event Name</label>
          <input type="text" id="name" name="name" value={event.name} onChange={handleChange}
                 className="shadow appearance-none bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-white font-bold mb-2">Category</label>
          <input type="text" id="category" name="category" value={event.category} onChange={handleChange}
                 className="shadow appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-white font-bold mb-2">Date</label>
          <input type="date" id="date" name="date" value={event.date} onChange={handleChange}
                 className="shadow appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="time" className="block text-white font-bold mb-2">Time</label>
          <input type="time" id="time" name="time" value={event.time} onChange={handleChange}
                 className="shadow appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="venue" className="block text-white font-bold mb-2">Venue</label>
          <input type="text" id="venue" name="venue" value={event.venue} onChange={handleChange}
                 className="shadow appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-white font-bold mb-2">Description</label>
          <textarea id="description" name="description" value={event.description} onChange={handleChange}
                    className="shadow appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="maxParticipants" className="block text-white font-bold mb-2">Max Participants</label>
          <input type="number" id="maxParticipants" name="maxParticipants" value={event.maxParticipants} onChange={handleChange}
                 className="shadow appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="isPaid" className="block text-white font-bold mb-2">Is Paid</label>
          <input type="checkbox" id="isPaid" name="isPaid" checked={event.isPaid} onChange={handleChange}
                 className="mr-2 leading-tight focus:outline-none focus:shadow-outline" />
          <span className="text-white">Paid Event</span>
        </div>
        {event.isPaid && (
          <div className="mb-4">
            <label htmlFor="price" className="block text-white font-bold mb-2">Price</label>
            <input type="number" id="price" name="price" value={event.price} onChange={handleChange}
                   className="shadow appearance-none bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="contactEmail" className="block text-white font-bold mb-2">Contact Email</label>
          <input type="email" id="contactEmail" name="contactEmail" value={event.contactEmail} onChange={handleChange}
                 className="shadow appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="contactPhone" className="block text-white font-bold mb-2">Contact Phone</label>
          <input type="tel" id="contactPhone" name="contactPhone" value={event.contactPhone} onChange={handleChange}
                 className="shadow appearance-none bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        
        <div className="mb-4">
          <label htmlFor="status" className="block text-white font-bold mb-2">Status</label>
          <select id="status" name="status" value={event.status} onChange={handleChange}
                  className="shadow appearance-none bg-white border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline">
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>

        <div className="flex items-center justify-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Update Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEvent;
