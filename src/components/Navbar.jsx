// src/components/Navbar.jsx
import React, { useRef } from "react";
import "../App.css";

const Navbar = ({ user, onScrollToHero, onScrollToCourses, onOpenContact }) => {
  return (
    <header className="navbar">
      <div
        className="navbar-logo"
        onClick={onScrollToHero}
        style={{ cursor: "pointer" }}
      >
        <span className="navbar-logo-black">Skill</span>
        <span className="navbar-logo-green">Hub</span>
      </div>

      <nav className="navbar-links">
        <button className="nav-link active" onClick={onScrollToHero}>
          Home
        </button>
        <button className="nav-link" onClick={onScrollToCourses}>
          All Courses
        </button>
        <button className="nav-link" onClick={onOpenContact}>
          Contact
        </button>

        {user && (
          <div className="nav-user">
            <div className="avatar">
              {user.name?.charAt(0)?.toUpperCase()}
            </div>
            <span className="username">{user.name}</span>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
