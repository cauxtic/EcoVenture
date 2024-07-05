import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import EventList from './components/Events/EventList';
import EventDetails from './components/Events/EventDetails';
import CreateEvent from './components/Events/CreateEvent';
import AuthProvider from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import LandingPage from './components/LandingPage';
import EditEvent from './components/Events/EditEvent';

function App() {
  return (
    
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events/new" element={<CreateEvent />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/events/edit/:id" element={<EditEvent />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/start" element={<LandingPage />} />
        </Routes>
      </Router>
    
  );
}

export default App;
