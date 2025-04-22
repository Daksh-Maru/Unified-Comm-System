import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router';
import '../css/Home.css';
import Navbar from '../components/Navbar';
import { SignedIn, SignedOut, SignInButton, UserButton, OrganizationSwitcher} from "@clerk/clerk-react";

function Home() {
  return (
    <>
      {/* Navbar */}
      <Navbar />

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
          <div>
            {/* Show Sign-In button when Signed Out */}
            <SignedOut>
              <SignInButton mode="modal">
                {/* <button className="btn btn-primary">Sign In</button> */}
                <button className="btn btn-light btn-lg">Get Started</button>
              </SignInButton>
            </SignedOut>
            {/* Show  when Signed In */}
            {/* <SignedIn>
              <OrganizationSwitcher/>
              <UserButton afterSignOutUrl="/" />
            </SignedIn> */}
          </div>
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
