import React from 'react';
import { Link } from 'react-router-dom';

const EventList = () => {
  // Replace with actual event data and mapping logic
  const events = [
    { id: 1, name: 'Sustainable Living Workshop' },
    { id: 2, name: 'Eco-Friendly Product Expo' },
    { id: 3, name: 'Climate Change Conference' },
  ];

  return (
    <div className="bg-white py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-4">Upcoming Eco-Events</h2>
      <ul className="flex flex-wrap justify-center">
        {events.map((event) => (
          <li key={event.id} className="w-full md:w-1/2 xl:w-1/3 p-4">
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-2xl font-bold">{event.name}</h3>
              <p className="text-gray-600">Learn more about this event</p>
              <Link to={`/events/${event.id}`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                <i className="fas fa-arrow-right"></i> View Details
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;