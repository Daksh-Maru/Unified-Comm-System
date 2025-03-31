// Home.jsx
import "../css/Home.css";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container text-center">
          <h1 className="display-4">Seamless Business Communication</h1>
          <p className="lead">
            Unify messaging, video conferencing, project management, and more in
            one powerful platform.
          </p>
          <a href="/user" className="btn btn-light btn-lg">
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4 feature-box">
            <h3>Real-time Messaging</h3>
            <p>Stay connected with instant messaging and chatbot.</p>
          </div>
          <div className="col-md-4 feature-box">
            <h3>Video Conferencing</h3>
            <p>Host HD video calls with built-in AI summaries.</p>
          </div>
          <div className="col-md-4 feature-box">
            <h3>Project Management</h3>
            <p>Organize tasks and track progress effortlessly.</p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container text-center">
          <h2>Boost Your Productivity Today!</h2>
          <p>Start collaborating with your team more efficiently using UCP.</p>
          <a href="/user" className="btn btn-primary btn-lg">
            Join Now
          </a>
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

export default Home;