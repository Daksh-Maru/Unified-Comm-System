import { Link } from "react-router"; // Use react-router-dom instead of react-router
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">UCP</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/home">Home</Link></li>
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

          {/* Authentication Buttons */}
          <div className="d-flex align-items-center ms-3">
            {/* Show Sign-In button when Signed Out */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="btn btn-primary">Sign In</button>
              </SignInButton>
            </SignedOut>

            {/* Show User Button (Profile & Sign-Out) when Signed In */}
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
