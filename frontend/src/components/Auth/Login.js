import React from 'react';
import api from '../../services/api';

const Login = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await api.post('http://localhost:5001/api/auth/login', { email, password });

      if (response.status === 200) {
        // Redirect to dashboard after successful login
        // Replace '/dashboard' with actual dashboard route
        window.location.href = '/dashboard';
      } else {
        // Handle login failure
        alert('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login to EcoVenture</h2>
        <p className="text-lg text-center text-gray-600 mb-4">Join the movement towards a greener tomorrow!</p>
        <form className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow bg-gray-100 border rounded w-full py-2 px-3 text-gray-700"
              id="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow bg-gray-100 xl:border-dashed rounded w-full py-2 px-3 text-gray-700"
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
              Login
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">Don't have an account? <a href="/register" className="text-green-500 hover:text-green-700">Sign up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
