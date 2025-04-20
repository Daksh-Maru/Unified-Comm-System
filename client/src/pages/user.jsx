import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import '../css/UserDashboard.css';

const UserDashboard = () => {
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
              <li className="nav-item"><a className="nav-link active" href="user.html">Dashboard</a></li>
              <li className="nav-item"><a className="nav-link" href="messaging.html">Messaging</a></li>
              <li className="nav-item"><a className="nav-link" href="videoconf.html">Video</a></li>
              <li className="nav-item"><a className="nav-link" href="email.html">Email</a></li>
              <li className="nav-item"><a className="nav-link" href="projects.html">Projects</a></li>
              <li className="nav-item"><a className="nav-link" href="finance.html">Finance</a></li>
              <li className="nav-item"><a className="nav-link" href="business.html">Analytics</a></li>
              <li className="nav-item"><a className="nav-link" href="settings.html">Settings</a></li>
              <li className="nav-item"><a className="nav-link" href="help.html">Help</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Login/Signup Button */}
      <div style={{ position: "absolute", right: 20, top: 70 }}>
        <a href="login.html" className="btn btn-outline-dark me-2">Login</a>
        <a href="signup.html" className="btn btn-primary">Sign Up</a>
      </div>

      {/* Dashboard Section */}
      <section className="dashboard-section" style={{ padding: "50px 0", background: "#f8f9fa" }}>
        <div className="container">
          <h1 className="text-center mb-4">User Dashboard</h1>
          <div className="row">
            {[
              { title: "Messaging", desc: "Access your real-time messages and chatbots.", link: "messaging.html" },
              { title: "Video Calls", desc: "Start or join HD video meetings.", link: "video.html" },
              { title: "Email", desc: "Manage your emails efficiently.", link: "email.html" },
              { title: "Projects", desc: "Organize and track your projects.", link: "project.html" },
              { title: "Finance", desc: "Monitor and manage your business finances.", link: "finance.html" },
              { title: "Analytics", desc: "Gain insights through business analytics.", link: "analytics.html" }
            ].map((card, index) => (
              <div key={index} className="col-md-4 mb-4 d-flex">
                <div className="dashboard-card w-100" style={cardStyle}>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                  <a href={card.link} className="btn btn-primary">Go to {card.title}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer bg-dark text-white text-center py-3 mt-5">
        <div className="container">
          <p>&copy; 2025 Unified Communication Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const cardStyle = {
  textAlign: "center",
  padding: "30px",
  background: "white",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between"
};

export default UserDashboard;