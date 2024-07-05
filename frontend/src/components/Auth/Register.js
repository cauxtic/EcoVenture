import React from 'react';
import api from '../../services/api';

const Register = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle registration logic here
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log(name, email, password);
    
    try {
      const user = await api.post('http://localhost:5001/api/auth/register', { name, email, password });
  
      if (user) {
        // Redirect to login page after successful registration
        // Replace '/login' with actual login route
        window.location.href = '/login';
      } else {
        // Handle registration failure
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration failed', error);
      alert('Registration failed. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800">Join the EcoVenture Community</h2>
        <p className="text-lg text-center text-gray-600 mb-4">Create an account to start making a positive impact on the environment!</p>
        <form className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              className="shadow bg-gray-100 border rounded w-full py-2 px-3 text-gray-700"
              id="name"
              type="text"
              placeholder="John Doe"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow bg-gray-100 border rounded w-full py-2 px-3 text-gray-700"
              id="email"
              type="email"
              placeholder="johndoe@example.com"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow bg-gray-100 border rounded w-full py-2 px-3 text-gray-700"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button" onClick={handleSubmit}
            >
              Register
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800"
              href="/login"
            >
              Already have an account?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
