# SkillHub – Training / Lab Booking System (Frontend)

React frontend for the **SkillHub Training / Lab Booking System** assignment.  
Implements a marketing‑style landing page, course listing UI, booking flow, and cancel‑booking UX wired to the Node/Express backend.

---

## Tech Stack

- **Frontend:** React (hooks), HTML, CSS
- **HTTP:** Axios for API calls
- **Backend (separate repo):** Node.js + Express
- **Data:** In‑memory arrays (no DB required for the assignment)

---

## Features

### Hero Landing Page

- Sticky navbar with **Home**, **All Courses**, **Contact**
- Hero section with:
  - Headline and sub‑text
  - Background image and small stats card (number of courses)
- User creation:
  - Name + Email input fields
  - **Start a Course** button
  - Creates a user via API and scrolls to courses on success
  - Shows loading spinner while request is in progress

### Courses / Training List

- Grid of course cards:
  - Course thumbnail image (different per course)
  - Title and **Seats Available**
  - Green **Book** button with loading and disabled state
- Category filters:
  - `All`, `UI/UX Design`, `Development`, `Data Science`, `Business`, `Financial`
  - Each course can have multiple `tags`, and appears in all matching filters
  - Active filter highlighted with green pill styling
- Search bar:
  - Filters `visibleTrainings` by course title inside the active category
  - Shows **“Course Not Available”** when no course matches filter + search

### Booking Flow

- Calls backend `POST /bookings/:trainingId/book` with `userId`
- On success:
  - UI popup appears:
    - Greets the user by name
    - Shows course title
    - Displays unique **reference number**
    - Asks user to note the reference number
  - Training seats and state refreshed from backend
- Handles errors:
  - Alerts if booking fails (no seats / invalid user / already booked)

### Cancel Course Flow

- Global **Cancel Course** button near the search bar
- Opens a **Cancel Booking** modal:
  - User provides course name and reference number
  - Calls backend cancel API
  - On success, shows confirmation and refreshes data

### Contact Popup

- Navbar **Contact** button opens a centered contact modal:
  - Name: **Sandip Deb**
  - Phone: `7896985216`
  - Email: `isandipdeb@gmail.com`
  - LinkedIn: `https://www.linkedin.com/in/isandipdeb/`
  - GitHub: `https://github.com/isandip`
- Styled to match the rest of the UI, with close (`✕`) button

### UX / Styling

- Modern course‑platform layout:
  - Soft gradient background, card shadows, rounded corners
- Responsive course grid (auto‑fill columns)
- Smooth scrolling from navbar links to **Hero** and **Courses**
- Reusable components for cards, buttons, modals

---

## Setup & Run

1. **Clone the repository**


2. **Install dependencies**


3. **Configure backend URL**

By default, `BASE_URL` is `http://localhost:5000` in:

- `src/api/userApi.jsx`
- `src/api/trainingApi.jsx`
- `src/api/bookingApi.jsx`

If your backend runs elsewhere, update `BASE_URL` in these files.

4. **Start the development server**

- npm start

The app will be available at: `http://localhost:3000`  
Make sure the backend server is running so bookings and cancellations work.

---

---
