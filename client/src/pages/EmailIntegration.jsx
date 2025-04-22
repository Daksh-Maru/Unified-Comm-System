import React, { useState } from 'react';
import '../css/EmailIntegration.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import emailjs from 'emailjs-com'; // ✅ Import EmailJS
import Navbar from '../components/Navbar';

const EmailIntegration = () => {
  const [selectedUser, setSelectedUser] = useState("user1");
  const [userEmail, setUserEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState('');

  const handleSendEmail = () => {
    const templateParams = {
      to_email: userEmail,
      name : selectedUser,
      from_name: 'UCP Team',
      subject: 'Welcome to UCP!',
      message: `Hello ${selectedUser},\n\nThis is a test email from UCP's integrated email system. Stay connected!`,
    };

    emailjs.send('service_fkb1ayp', 'template_9ut3ofb', templateParams, 'gGQWsiUo91FHLEz2s')
      .then(() => {
        setEmailStatus('Email sent successfully!');
      })
      .catch((error) => {
        setEmailStatus('Failed to send email.');
        console.error(error);
      });
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container text-center">
          <h1 className="display-4">Effortless Email Management</h1>
          <p className="lead">Integrate your email, generate AI-driven responses, and stay connected with ease.</p>
          <a href="/dashboard" className="btn btn-light btn-lg">Get Started</a>
        </div>
      </section>

      {/* Features Section */}
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4 feature-box">
            <h3>AI Chatbot Help</h3>
            <p>Get assistance with your email operations instantly using AI.</p>
          </div>
          <div className="col-md-4 feature-box">
            <h3>Generate Response</h3>
            <p>Let AI generate professional email responses for you.</p>
          </div>
          <div className="col-md-4 feature-box">
            <h3>Connect to Other Mail Servers</h3>
            <p>Easily integrate with external mail servers for better communication.</p>
          </div>
        </div>
      </div>

      {/* Email Options Section */}
      <div className="email-options text-center mt-5">
        <h2>Send Email to Users</h2>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-3">
              <select id="user-dropdown" className="form-select" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                <option value="user1">User 1</option>
                <option value="user2">User 2</option>
                <option value="user3">User 3</option>
                <option value="user4">User 4</option>
              </select>
            </div>
            <div className="col-md-4 mt-2 mt-md-0">
              <input
                type="email"
                className="form-control"
                placeholder="Enter user email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
            <div className="col-md-3 mt-3 mt-md-0">
              <button className="btn btn-primary me-2" onClick={handleSendEmail}>Send Email</button>
              <button className="btn btn-success">Connect to Mail Server</button>
            </div>
          </div>
          {emailStatus && <p className="mt-3 text-info">{emailStatus}</p>}
        </div>
      </div>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container text-center">
          <h2>Streamline Your Email Communication</h2>
          <p>Manage emails efficiently and boost productivity with UCP's email integration features.</p>
          <a href="/dashboard" className="btn btn-primary btn-lg">Join Now</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container text-center">
          <p>&copy; 2025 Unified Communication Platform. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default EmailIntegration;
