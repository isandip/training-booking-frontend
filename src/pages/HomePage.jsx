// src/pages/HomePage.jsx
import React, { useState, useCallback, useRef } from "react";
import TrainingList from "../components/TrainingList";
import CancelBookingModal from "../components/CancelBookingModal";
import { getTrainings } from "../api/trainingApi";
import { getUserBookings } from "../api/bookingApi";
import { createUser } from "../api/userApi";
import "../App.css";

const FILTERS = ["All", "UI/UX Design", "Development", "Data Science", "Business", "Financial"];

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [trainings, setTrainings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [showTrainings, setShowTrainings] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // hero inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // refs for scrolling
  const heroRef = useRef(null);
  const coursesRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fetchData = useCallback(
    async (createdUser) => {
      try {
        const t = await getTrainings();
        setTrainings(t);
        const targetUser = createdUser || user;
        if (targetUser) {
          const b = await getUserBookings(targetUser.id);
          setBookings(b);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    },
    [user]
  );

  const handleStartCourse = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    try {
      setLoading(true);
      const newUser = await createUser(name.trim(), email.trim());
      setUser(newUser);
      setShowTrainings(true);
      await fetchData(newUser);

      // after courses are loaded, scroll down to them
      setTimeout(() => {
        if (coursesRef.current) {
          coursesRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
    } catch (err) {
      console.error("Error creating user:", err);
    } finally {
      setLoading(false);
    }
  };

  // filter by tag then by search term
  const filteredByTag =
    activeFilter === "All"
      ? trainings
      : trainings.filter((t) => t.tags?.includes(activeFilter));

  const visibleTrainings = filteredByTag.filter((t) =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="landing-page">
      {/* Navbar */}
      <header className="navbar">
        <div
          className="navbar-logo"
          onClick={() => scrollToSection(heroRef)}
          style={{ cursor: "pointer" }}
        >
          <span className="navbar-logo-black">Skill</span>
          <span className="navbar-logo-green">Hub</span>
        </div>

        <nav className="navbar-links">
          <button
            className="nav-link active"
            onClick={() => scrollToSection(heroRef)}
          >
            Home
          </button>
          <button
            className="nav-link"
            onClick={() => scrollToSection(coursesRef)}
          >
            All Courses
          </button>
          <button
            className="nav-link"
            onClick={() => setShowContactModal(true)}
          >
            Contact
          </button>
        </nav>
      </header>

      {/* Hero section */}
      <section className="hero" ref={heroRef}>
        <div className="hero-left">
          <p className="hero-kicker">Start your favourite course</p>
          <h1 className="hero-title">
            Now learning from anywhere, and build your{" "}
            <span className="highlight">bright career.</span>
          </h1>
          <p className="hero-subtitle">
            Learn practical skills with expert‑led online trainings tailored for
            you.
          </p>

          <form className="hero-form" onSubmit={handleStartCourse}>
            <div className="hero-inputs">
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="primary-btn">
              Start a Course
              {loading && <span className="loader" />}
            </button>
          </form>

          {user && (
            <p className="hero-user-info">
              Welcome, <strong>{user.name}</strong> – your learner ID is{" "}
              <strong>{user.userRef}</strong>.
            </p>
          )}
        </div>

        <div className="hero-right">
          <div className="hero-stats-card">
            <div className="hero-stat-number">8</div>
            <div className="hero-stat-label">Courses</div>
          </div>
          <img
            className="hero-image"
            src="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg"
            alt="Learner with laptop"
          />
        </div>
      </section>

      {/* Courses grid */}
      {showTrainings && (
        <section className="courses-section" ref={coursesRef}>
          <div className="courses-header">
            <h2>
              All <span className="highlight">Courses</span> of SkillHub
            </h2>

            <div className="courses-header-right">
              <button
                className="cancel-course-btn"
                onClick={() => setShowCancelModal(true)}
              >
                Cancel Course
              </button>
              <input
                type="text"
                placeholder="Search your course"
                className="courses-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="courses-filters">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                className={`filter-chip ${
                  activeFilter === filter ? "active" : ""
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <TrainingList
            trainings={visibleTrainings}
            user={user}
            bookings={bookings}
            onBookingUpdate={() => fetchData()}
            onBooked={(res) => {
              const { booking, referenceNumber } = res;
              const name = booking?.userName || user?.name;
              const course = booking?.trainingTitle;
              const ref = referenceNumber || booking?.referenceNumber;

              setSuccessMessage(
                `${name}, your booking for the course "${course}" is successful. ` +
                  `Your reference number is: ${ref}. Please note this number for future reference.`
              );
              fetchData();
            }}
          />

          {visibleTrainings.length === 0 && (
            <p style={{ marginTop: "16px", color: "#6b7280" }}>
              Course Not Available
            </p>
          )}
        </section>
      )}

      {/* Booking success popup */}
      {successMessage && (
        <div className="booking-success-popup">
          <div className="booking-success-card">
            <h3>Booking Successful</h3>
            <p>{successMessage}</p>
            <button onClick={() => setSuccessMessage("")}>Close</button>
          </div>
        </div>
      )}

      {showCancelModal && (
        <CancelBookingModal
          userId={user?.id}
          trainings={trainings}
          onCancelUpdate={() => fetchData()}
          onClose={() => setShowCancelModal(false)}
        />
      )}

      {/* Contact modal */}
      {showContactModal && (
        <div className="contact-modal-backdrop">
          <div className="contact-modal-card">
            <div className="contact-modal-header">
              <h3>Contact</h3>
              <button
                className="contact-modal-close"
                onClick={() => setShowContactModal(false)}
              >
                ✕
              </button>
            </div>

            <p className="contact-name">Sandip Deb</p>

            <div className="contact-row">
              <span className="contact-label">Phone</span>
              <a href="tel:7896985216" className="contact-value">
                7896985216
              </a>
            </div>

            <div className="contact-row">
              <span className="contact-label">Email</span>
              <a
                href="mailto:isandipdeb@gmail.com"
                className="contact-value"
              >
                isandipdeb@gmail.com
              </a>
            </div>

            <div className="contact-row">
              <span className="contact-label">LinkedIn</span>
              <a
                href="https://www.linkedin.com/in/isandipdeb/"
                className="contact-value"
                target="_blank"
                rel="noreferrer"
              >
                linkedin.com/in/isandipdeb
              </a>
            </div>

            <div className="contact-row">
              <span className="contact-label">GitHub</span>
              <a
                href="https://github.com/isandip"
                className="contact-value"
                target="_blank"
                rel="noreferrer"
              >
                github.com/isandip
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
