import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import '../css/UserDashboard.css';
import Navbar from "../components/Navbar";

const UserDashboard = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Dashboard Section */}
      <section className="dashboard-section" style={{ padding: "50px 0", background: "#f8f9fa" }}>
        <div className="container">
          <h1 className="text-center mb-4">User Dashboard</h1>
          <div className="row">
            {[
              { title: "Messaging", desc: "Access your real-time messages and chatbots.", link: "messaging" },
              { title: "Video Calls", desc: "Start or join HD video meetings.", link: "video" },
              { title: "Email", desc: "Manage your emails efficiently.", link: "email" },
              { title: "Projects", desc: "Organize and track your projects.", link: "projects" },
              { title: "Finance", desc: "Monitor and manage your business finances.", link: "finance" },
              { title: "Analytics", desc: "Gain insights through business analytics.", link: "business" }
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