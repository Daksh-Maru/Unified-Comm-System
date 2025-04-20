import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router';
import '../css/Home.css';

function Home() {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#">UCP</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/user">Dashboard</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/messaging">Messaging</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/videoconf">Video</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/email">Email</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/projects">Projects</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/finance">Finance</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/business">Analytics</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/settings">Settings</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/help">Help</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section text-white text-center py-5" style={{
        background: 'linear-gradient(to right, #007bff, #6610f2)',
        paddingTop: '100px',
        paddingBottom: '100px',
        marginTop: '56px'
      }}>
        <div className="container">
          <h1 className="display-4">Seamless Business Communication</h1>
          <p className="lead">Unify messaging, video conferencing, project management, and more in one powerful platform.</p>
          <Link to="/user" className="btn btn-light btn-lg">Get Started</Link>
        </div>
      </section>

      {/* Feature Boxes */}
      <div className="container mt-5">
        <div className="row">
          {[
            { title: "Real-time Messaging", desc: "Stay connected with instant messaging and chatbots." },
            { title: "Video Conferencing", desc: "Host HD video calls with built-in AI summaries." },
            { title: "Project Management", desc: "Organize tasks and track progress effortlessly." }
          ].map((feature, i) => (
            <div className="col-md-4 mb-4" key={i}>
              <div className="feature-box p-4 bg-light rounded shadow-sm text-center h-100" style={{ transition: 'transform 0.3s' }}>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <section className="cta-section text-white text-center py-5" style={{ background: '#343a40' }}>
        <div className="container">
          <h2>Boost Your Productivity Today!</h2>
          <p>Start collaborating with your team more efficiently using UCP.</p>
          <Link to="/user" className="btn btn-primary btn-lg">Join Now</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer text-white text-center py-3" style={{ background: '#212529' }}>
        <div className="container">
          <p>&copy; 2025 Unified Communication Platform. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default Home;
