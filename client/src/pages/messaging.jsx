import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Messaging.css';

function Messaging() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([
    { sender: 'User', text: 'Hello!' },
    { sender: 'AI', text: 'Hi! How can I assist you today?' },
  ]);
  const [selectedUser, setSelectedUser] = useState('user1');

  const handleSendMessage = () => {
    if (message.trim()) {
      setChat([...chat, { sender: 'User', text: message }]);
      setMessage('');
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#">UCP</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link" href="home.html">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="user.html">Dashboard</a></li>
              <li className="nav-item"><a className="nav-link active" href="messaging.html">Messaging</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Chat Container */}
      <div className="chat-container" style={{ maxWidth: '800px', margin: '50px auto', background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h2 className="text-center">Real-Time Messaging</h2>
        
        {/* Sub-features */}
        <div className="sub-features" style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between' }}>
          <button className="btn btn-outline-primary">Start a New Chat</button>
          <button className="btn btn-outline-danger">Delete a Chat</button>
          <button className="btn btn-outline-warning">Summarize a Message</button>
          <button className="btn btn-outline-success">Generate AI Response</button>
        </div>

        {/* Chat Box */}
        <div className="chat-box" id="chat-box" style={{ height: '400px', overflowY: 'auto', border: '1px solid #ddd', padding: '10px', borderRadius: '5px', background: '#f9f9f9' }}>
          {chat.map((msg, index) => (
            <p key={index}><strong>{msg.sender}:</strong> {msg.text}</p>
          ))}
        </div>

        {/* Chat Input */}
        <div className="chat-input" style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
          <select id="user-dropdown" className="form-select" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
            <option value="user1">User 1</option>
            <option value="user2">User 2</option>
            <option value="user3">User 3</option>
            <option value="user4">User 4</option>
          </select>
          <input
            type="text"
            id="message"
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button className="btn btn-primary" onClick={handleSendMessage}>Send</button>
        </div>
      </div>

      {/* AI Chatbot Help Button */}
      <button className="chatbot-button" style={{ position: 'fixed', bottom: '20px', left: '20px', background: '#007bff', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '50px', cursor: 'pointer', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
        AI Chatbot Help
      </button>
    </div>
  );
}

export default Messaging;
