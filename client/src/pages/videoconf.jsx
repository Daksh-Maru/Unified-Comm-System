import React from 'react';
import '../css/VideoConferencing.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';

const VideoConferencing = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container text-white text-center py-5">
          <h1 className="display-4">Host and Collaborate with Ease</h1>
          <p className="lead">Join high-quality video meetings and collaborate with team members effortlessly.</p>
          <a href="dashboard.html" className="btn btn-light btn-lg">Get Started</a>
        </div>
      </section>

      {/* Features Section */}
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4 feature-box">
            <h3>Create a New Meeting</h3>
            <p>Instantly start a new meeting with just a click.</p>
          </div>
          <div className="col-md-4 feature-box">
            <h3>End a Meeting</h3>
            <p>End meetings when done and save your progress.</p>
          </div>
          <div className="col-md-4 feature-box">
            <h3>Summarize with AI</h3>
            <p>Use AI to generate meeting summaries automatically.</p>
          </div>
        </div>
      </div>

      {/* Video Options */}
      <div className="video-options mt-5">
        <h2>Collaborate with Others</h2>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <select id="user-dropdown" className="form-select">
                <option value="user1">User 1</option>
                <option value="user2">User 2</option>
                <option value="user3">User 3</option>
                <option value="user4">User 4</option>
              </select>
            </div>
            <div className="col-md-4">
              <button className="btn btn-primary me-2">Invite to Meeting</button>
              <button className="btn btn-danger">End Meeting</button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="cta-section mt-5">
        <div className="container text-white text-center py-5">
          <h2>Boost Your Team's Productivity</h2>
          <p>Host seamless video conferences and collaborate like never before with UCP.</p>
          <a href="dashboard.html" className="btn btn-primary btn-lg">Join Now</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container text-center">
          <p>&copy; 2025 Unified Communication Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default VideoConferencing;