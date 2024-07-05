import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-r from-green-500 to-blue-600 min-h-screen text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <h1 className="text-3xl font-bold">EcoVenture</h1>
        <nav className="flex space-x-4">
          <Link to="/login" className="hover:underline ">Login</Link>
          <Link to="/register" className="hover:underline">Register</Link>
          <Link to="/events" className="hover:underline">Events</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-20 px-6">
        <h2 className="text-5xl font-bold mb-4">Empowering Sustainable Innovation</h2>
        <p className="text-lg mb-6">Join the movement towards a greener future with EcoVenture, your platform for eco-friendly events and initiatives.</p>
        <Link to="/register" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white text-gray-800">
        <h3 className="text-3xl font-bold text-center mb-10">What You Can Do</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-100 rounded-lg shadow-lg text-center">
            <h4 className="text-2xl font-semibold mb-2">Host Eco-Friendly Events</h4>
            <p>Organize events that promote sustainability and reduce waste.</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-lg text-center">
            <h4 className="text-2xl font-semibold mb-2">Discover Green Initiatives</h4>
            <p>Find and support projects that make a positive impact on the environment.</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-lg text-center">
            <h4 className="text-2xl font-semibold mb-2">Connect with Like-Minded Individuals</h4>
            <p>Network with people who share your passion for sustainability and eco-friendliness.</p>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 px-6">
        <h3 className="text-3xl font-bold text-center mb-10">Upcoming Events</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-green-600 bg-opacity-40 rounded-lg shadow-lg text-center">
            <h4 className="text-2xl text-black font-semibold mb-2">Sustainable Living Workshop</h4>
            <p className='text-black'>Date: June 25, 2024</p>
            <Link to="/events/1" className="text-blue-500 hover:underline">View Details</Link>
          </div>
          <div className="p-6 bg-yellow-900  bg-opacity-80 rounded-lg shadow-lg text-center">
            <h4 className="text-2xl text-black font-semibold mb-2">Eco-Friendly Product Expo</h4>
            <p>Date: July 10, 2024</p>
            <Link to="/events/2" className="text-blue-500 hover:underline">View Details</Link>
          </div>
          <div className="p-6 bg-blue-700 bg-opacity-50 rounded-lg shadow-lg text-center">
            <h4 className="text-2xl text-black font-semibold mb-2">Climate Change Conference</h4>
            <p>Date: August 15, 2024</p>
            <Link to="/events/3" className="text-blue-500 hover:underline">View Details</Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 bg-white text-gray-800">
        <h3 className="text-3xl font-bold text-center mb-10">What Our Users Say</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-100 rounded-lg shadow-lgtext-center">
            <p className="mb-4">"EcoVenture has made it so easy to find and participate in eco-friendly events!"</p>
            <p className="font-bold">- John Doe</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-lg text-center">
            <p className="mb-4">"I love the community aspect of EcoVenture - it's great to connect with others who care about the environment."</p>
            <p className="font-bold">- Jane Smith</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-lg text-center">
            <p className="mb-4">"EcoVenture has helped me learn so much about sustainability and how I can make a difference."</p>
            <p className="font-bold">- Bob Johnson</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-6 bg-gray-800 text-white text-center">
        <p>&copy; 2024 EcoVenture. All rights reserved.</p>
        <div className="mt-4">
          <a href="#" className="text-blue-500 hover:underline mx-2">Facebook</a>
          <a href="#" className="text-blue-500 hover:underline mx-2">Twitter</a>
          <a href="#" className="text-blue-500 hover:underline mx-2">Instagram</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;