import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Settings.css';

const Settings = () => {
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
              <li className="nav-item"><a className="nav-link" href="messaging.html">Messaging</a></li>
              <li className="nav-item"><a className="nav-link" href="videoconf.html">Video</a></li>
              <li className="nav-item"><a className="nav-link" href="email.html">Email</a></li>
              <li className="nav-item"><a className="nav-link active" href="settings.html">Settings</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container text-center">
          <h1 className="display-4">Manage Your Settings</h1>
          <p className="lead">Customize your preferences and platform settings easily.</p>
        </div>
      </section>

      {/* Settings Form */}
      <section className="container">
        <div className="settings-box">
          <h3 className="text-center">Account Settings</h3>
          <form className="settings-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" className="form-control" id="username" placeholder="Enter your username" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" className="form-control" id="email" placeholder="Enter your email" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Enter new password" />
            </div>

            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input type="password" className="form-control" id="confirm-password" placeholder="Confirm new password" />
            </div>

            {/* Notification Settings */}
            <h4 className="mt-4">Notification Settings</h4>
            <div className="form-group toggle-btn-label">
              <label htmlFor="email-notifications">Email Notifications</label>
              <input type="checkbox" id="email-notifications" />
            </div>
            <div className="form-group toggle-btn-label">
              <label htmlFor="sms-notifications">SMS Notifications</label>
              <input type="checkbox" id="sms-notifications" />
            </div>

            {/* Privacy Settings */}
            <h4 className="mt-4">Privacy Settings</h4>
            <div className="form-group toggle-btn-label">
              <label htmlFor="profile-visibility">Profile Visibility</label>
              <input type="checkbox" id="profile-visibility" />
            </div>

            {/* AI Preferences */}
            <h4 className="mt-4">AI Preferences</h4>
            <div className="form-group toggle-btn-label">
              <label htmlFor="ai-assistant">AI Assistant</label>
              <input type="checkbox" id="ai-assistant" />
            </div>

            {/* General Settings */}
            <h4 className="mt-4">General Settings</h4>
            <div className="form-group">
              <label htmlFor="theme-selection">Select Theme</label>
              <select className="form-select" id="theme-selection">
                <option value="light">Light Theme</option>
                <option value="dark">Dark Theme</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="language-selection">Select Language</label>
              <select className="form-select" id="language-selection">
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="timezone-selection">Select Timezone</label>
              <select className="form-select" id="timezone-selection">
                <option value="utc-5">UTC -5 (EST)</option>
                <option value="utc+1">UTC +1 (CET)</option>
                <option value="utc+8">UTC +8 (SGT)</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary btn-block mt-4">Save Settings</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Unified Communication Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Settings;
