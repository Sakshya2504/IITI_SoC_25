# Club Connect – IIT Indore Student Club Portal

A full-stack web application designed to manage club activities, event announcements, and foster student engagement at **IIT Indore**.

**Live Site:** [announcementiiti-1.onrender.com](https://announcementiiti-1.onrender.com)

---

## Features

###  Frontend – React + Tailwind CSS
-  Post and view announcements
-  Explore and create events
-  Flip-card interaction for events
-  Signup / Login functionality
-  Explore club profiles
-  Fully responsive design using **Tailwind CSS**

###  Backend – Node.js + Express + MongoDB
-  User authentication with **bcrypt**
-  Event creation & listing
-  Announcement posting & retrieval
- Data handling using **Mongoose** (MongoDB ODM)

---


##  Project Structure
repo-root/
├──  # Frontend (React + Vite)
│ ├── src/
│ │ ├── components/
# Events.jsx,
Notification.jsx,
Signup.jsx,
NavBar.jsx, etc.
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
├── server/ # Backened (Node.js + Express)
│ ├── server.jsx
│ └── models/
│ ├── UserSchema.js
│ ├── Event.js
│ └── Announce.js


---

## 🔗 API Endpoints

| Method | Endpoint            | Description                     |
|--------|---------------------|---------------------------------|
| POST   | `/api/signup`       | Register a new user             |
| POST   | `/api/login`        | User login                      |
| POST   | `/Createevent`      | Create a new event              |
| GET    | `/Events`           | Fetch all events                |
| POST   | `/announce`         | Create a new announcement       |
| GET    | `/notification`     | Get all announcements           |
| GET    | `/api/verifyadmin`  | verify admin to createevent.    |
| GET    | `/api/register`     | register of intrested students. |


---

## User Authentication Flow

1. **Signup** – `POST /api/signup`
   - Takes `name`, `email`, and `password`
   - Password is hashed using **bcrypt**
   - On success, user data is returned and saved in `localStorage`

2. **Login** – `POST /api/login`
   - Credentials are verified against hashed password
   - Returns user data on successful authentication
3. **verifyadmin**  – `POST /api/verifyadmin `
   - Credentials are verified against saved email
   - Create events  on successful authentication
---

##  Installation & Running

### Backend (Express + MongoDB)
```bash
cd Backened
npm install
node server.js
 Frontend
npm i
npm run dev

👥 Contributors
Anand Vivek
Sakshya Singh Kasera
Shaik Riyaz

### License
This project is for educational use at IIT Indore.

