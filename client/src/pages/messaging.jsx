import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Messaging.css';
import Navbar from '../components/Navbar';

const Messaging = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [clerkUsers, setClerkUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Clerk users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:3000/clerkUser'); // Adjust if your API base path differs
        const data = await res.json();
        const formatted = data.map(user => ({
          id: user.id,
          name: user.name
        }));
        setClerkUsers(formatted);
        if (formatted.length > 0) {
          setSelectedUser(formatted[0].id);
        }
      } catch (err) {
        console.error('Failed to fetch Clerk users:', err);
      }
    };

    fetchUsers();
  }, []);

  // AI Summarization
  const summarizeWithAI = async (textToSummarize) => {
    const apiKey = import.meta.env.VITE_AI_API_KEY;
    const systemPrompt = "You are a helpful assistant";
    const userPrompt = `Summarize the following text:\n\n${textToSummarize}`;

    try {
      const response = await fetch("https://api.aimlapi.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.7,
          max_tokens: 256,
        }),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error during AI summarization:", error);
      return "Failed to summarize with AI.";
    }
  };

  // AI Smart Reply
  const generateAIReply = async (textToReply) => {
    const apiKey = import.meta.env.VITE_AI_API_KEY;
    const systemPrompt = "You are a professional assistant who helps in chat conversations";
    const userPrompt = `Reply to this user message as an AI assistant:\n\n${textToReply}`;

    try {
      const response = await fetch("https://api.aimlapi.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.7,
          max_tokens: 256,
        }),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error during AI reply generation:", error);
      return "Failed to generate a smart reply with AI.";
    }
  };

  const getUserNameById = (id) => clerkUsers.find(u => u.id === id)?.name || 'Me';

  const handleSendMessage = () => {
    if (message.trim()) {
      setChat([...chat, { sender: getUserNameById(selectedUser), text: message }]);
      setMessage('');
    }
  };

  const handleStartNewChat = () => {
    const userName = getUserNameById(selectedUser);
    setChat([
      { sender: userName, text: `Hi, this is ${userName}. Starting a new chat.` },
      { sender: 'AI', text: 'Hello! How can I help you today?' },
    ]);
  };

  const handleDeleteChat = () => {
    if (chat.length === 0) return;
    setChat(chat.slice(0, chat.length - 1));
  };

  const handleSummarizeMessage = async () => {
    const lastUserMsg = [...chat].reverse().find(msg => clerkUsers.some(u => u.name === msg.sender));
    if (!lastUserMsg) {
      alert('No user message to summarize.');
      return;
    }
    setLoading(true);
    const summary = await summarizeWithAI(lastUserMsg.text);
    setChat([...chat, { sender: 'AI', text: summary }]);
    setLoading(false);
  };

  const handleGenerateAIResponse = async () => {
    const lastUserMsg = [...chat].reverse().find(msg => clerkUsers.some(u => u.name === msg.sender));
    if (!lastUserMsg) {
      alert('No user message to respond to.');
      return;
    }
    setLoading(true);
    const aiReply = await generateAIReply(lastUserMsg.text);
    setChat([...chat, { sender: 'AI', text: aiReply }]);
    setLoading(false);
  };

  return (
    <div>
      <Navbar />

      <div
        className="chat-container"
        style={{
          maxWidth: '800px',
          margin: '50px auto',
          background: '#fff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 className="text-center">Real-Time Messaging</h2>

        <div style={{ marginBottom: 10 }}>
          <strong>Selected User:</strong> {getUserNameById(selectedUser)}
        </div>

        <div
          className="sub-features"
          style={{
            marginTop: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          <button className="btn btn-outline-primary" onClick={handleStartNewChat}>Start a New Chat</button>
          <button className="btn btn-outline-danger" onClick={handleDeleteChat}>Delete Last Message</button>
          <button className="btn btn-outline-warning" onClick={handleSummarizeMessage} disabled={loading}>
            Summarize Last Message
          </button>
          <button className="btn btn-outline-success" onClick={handleGenerateAIResponse} disabled={loading}>
            Generate AI Response
          </button>
        </div>

        {loading && (
          <div className="mt-3 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        <div
          className="chat-box"
          style={{
            height: '400px',
            overflowY: 'auto',
            border: '1px solid #ddd',
            padding: '10px',
            borderRadius: '5px',
            background: '#f9f9f9',
            marginTop: '15px',
          }}
        >
          {chat.map((msg, index) => (
            <p key={index}>
              <strong>{msg.sender}:</strong> {msg.text}
            </p>
          ))}
        </div>

        <div
          className="chat-input"
          style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <select
            id="user-dropdown"
            className="form-select"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            style={{ maxWidth: '150px' }}
          >
            {clerkUsers.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          <input
            type="text"
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
          />
          <button className="btn btn-primary" onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Messaging;
