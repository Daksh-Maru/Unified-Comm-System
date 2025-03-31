// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Email from './pages/Email.jsx'
import Dashboard from './pages/User.jsx'
import Messaging from './pages/Messaging.jsx'
import Video from './pages/Video.jsx'
import Projects from './pages/Projects.jsx'
import Finance from './pages/Finance.jsx'
import Analytics from './pages/Business.jsx'
import Settings from './pages/Settings.jsx'
import Help from './pages/Help.jsx'
import Home from './pages/Home.jsx'
import Navbar from './components/Navbar.jsx';
import { Routes, Route } from 'react-router';

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

function App() {
  return (
    <>
      <Navbar />
      <div className="mt-4 pt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/user" element={<Dashboard />} />
          <Route path="/messaging" element={<Messaging />} />
          <Route path="/video" element={<Video />} />
          <Route path="/email" element={<Email />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/business" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </div>
      {/* <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      </header> */}
    </>
  )
}

export default App
