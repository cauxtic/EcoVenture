import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import useAuth from '../../hooks/useAuth';

const ChatBox = ({ eventId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get(`/events/${eventId}/chats`);
        setMessages(response.data);
      } catch (error) {
        console.error('Failed to fetch messages', error);
      }
    };
    fetchMessages();
  }, [eventId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/events/${eventId}/chats`, { message });
      setMessages([...messages, response.data]);
      setMessage('');
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user.name}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBox;
