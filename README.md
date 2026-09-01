# Issues — Tracker System

A full-stack MERN application for tracking issues within a team. This platform enables users to register, log in, create and manage issues, assign them to team members, track statuses, leave comments, and view an at-a-glance dashboard.

**Live Demo (Frontend):** `<ADD YOUR DEPLOYED FRONTEND URL HERE>`
**API Base URL (Backend):** `<ADD YOUR DEPLOYED BACKEND URL HERE>`

---

## 1. Project Overview

**Issues** is a lightweight, intuitive bug and task-tracking tool built for small to medium-sized teams. It features a playful, modern, and highly interactive UI designed to make issue tracking less of a chore. Users can move issues through a simple workflow (`Open` → `In Progress` → `Closed`), discuss details in comment threads, and maintain clear visibility over their team's workload.

This documentation serves as the comprehensive guide for developers to understand the architecture, run the project locally, and deploy it to production.

## 2. Features

- **User Authentication:** Secure registration and login using JWT (JSON Web Tokens) with passwords hashed via `bcryptjs`.
- **Issue CRUD Operations:** Users can create, read, update, and delete issues seamlessly.
- **Assignment System:** Any issue can be assigned to a registered user to ensure clear ownership.
- **Status Tracking:** Issues have clear lifecycles: `Open`, `In Progress`, and `Closed`.
- **Comments:** Threaded comments on individual issues allow for team discussion where the work actually lives.
- **Dashboard:** Live analytics showing total issues, open vs. closed counts, and personalized metrics (assigned to me, created by me).
- **Modern UI/UX:** A responsive, playful, and accessible frontend featuring a vibrant glassmorphism design, built with Vite and React.

## 3. Architecture

The project follows a decoupled **Client-Server Architecture** utilizing the **MERN** stack and the **MVC (Model-View-Controller)** pattern on the backend.

```text
Client (React SPA)  <---- REST/JSON ---->  Server (Express API)  <---->  MongoDB (Database)
     "View"                                "Controller" + "Model"
```

- **Model (Mongoose):** Defines schemas (`User`, `Issue`, `Comment`) for data structure and validation.
- **Controller (Express):** Houses the business logic, processing requests for authentication, CRUD operations, and dashboard aggregations.
- **View (React):** A component-based Single Page Application (SPA) that consumes the JSON API and handles all UI state and rendering.
- **Middleware:** Centralized error handling and JWT authentication guards to protect private routes.

## 4. Tech Stack

| Layer          | Technology                                              |
| -------------- | ------------------------------------------------------- |
| **Frontend**   | React 18 (Vite), React Router v6, Axios, Vanilla CSS    |
| **Backend**    | Node.js, Express.js                                     |
| **Database**   | MongoDB, Mongoose ODM                                   |
| **Security**   | JSON Web Tokens (JWT), bcryptjs                         |
| **Deployment** | Vercel (Frontend), Render (Backend), MongoDB Atlas (DB) |

## 5. Environment Variables

To run this project, you will need to add the following environment variables to your respective `.env` files.

### Backend (`backend/.env`)

| Variable         | Description                         | Example                                              |
| ---------------- | ----------------------------------- | ---------------------------------------------------- |
| `PORT`           | Port the API server runs on         | `5000`                                               |
| `MONGO_URI`      | MongoDB connection string           | `mongodb+srv://user:pass@cluster.mongodb.net/issues` |
| `JWT_SECRET`     | Secret key used to sign JWT tokens  | `your_super_secret_key_here`                         |
| `JWT_EXPIRES_IN` | Token expiry duration               | `7d`                                                 |
| `CLIENT_URL`     | Deployed frontend origin (for CORS) | `https://your-frontend-url.vercel.app`               |

### Frontend (`frontend/.env`)

| Variable       | Description                 | Example                     |
| -------------- | --------------------------- | --------------------------- |
| `VITE_API_URL` | Base URL of the backend API | `http://localhost:5000/api` |

---

## 6. Setup Instructions (Local Development)

Follow these steps to run the project locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [Git](https://git-scm.com/)
- A MongoDB database (Local installation or a free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas))

### Step 1: Clone the Repository

```bash
git clone <YOUR_GITHUB_REPO_URL>
cd issue-tracker
```

### Step 2: Setup the Backend

```bash
cd backend
npm install
cp .env.example .env
# Open .env and fill in your MONGO_URI and a JWT_SECRET
npm run dev
```

_The backend server will start running on `http://localhost:5000`._

### Step 3: Setup the Frontend

Open a new terminal window:

```bash
cd frontend
npm install
cp .env.example .env
# Open .env and ensure VITE_API_URL is set to http://localhost:5000/api
npm run dev
```

_The frontend will start running on `http://localhost:5173`. Open this URL in your browser._

---

## 7. API Details

The backend exposes a RESTful API with the base path: `/api`

### Auth Routes

- `POST /api/auth/register` - Register a new user (`{ name, email, password }`)
- `POST /api/auth/login` - Authenticate user and receive JWT (`{ email, password }`)
- `GET /api/auth/me` _(Private)_ - Get logged-in user profile

### Issue Routes _(All Private)_

- `GET /api/issues` - List issues (Supports query params: `?status=`, `?assignedTo=`, `?search=`)
- `POST /api/issues` - Create a new issue (`{ title, description, priority, status, assignedTo }`)
- `GET /api/issues/:id` - Fetch details of a single issue
- `PUT /api/issues/:id` - Update an issue (edit details, change status, re-assign)
- `DELETE /api/issues/:id` - Delete an issue

### Comment Routes _(All Private)_

- `GET /api/issues/:issueId/comments` - Fetch all comments for a specific issue
- `POST /api/issues/:issueId/comments` - Add a comment to an issue
- `DELETE /api/comments/:id` - Delete a comment (Only allowed by the comment author)

### Dashboard Routes _(All Private)_

- `GET /api/dashboard` - Fetch aggregated counts (total, open, in progress, closed, assigned to me, created by me)

### User Routes _(All Private)_

- `GET /api/users` - Fetch list of all registered users (used for the assignment dropdown)

> **Note on Authentication:** All private routes require an `Authorization` header formatted as: `Bearer <YOUR_JWT_TOKEN>`.

---

## 8. Deployment (BRD Requirement)

This section explains where the application is hosted, the required services, and the exact steps to deploy or update the application independently.

### 8.1 Deployment Architecture & Services

The application is deployed across three separate, fully-managed cloud services:

1. **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas) (M0 Free Cluster) - Hosts the persistent data.
2. **Backend (API):** [Render](https://render.com) (Web Service) - Hosts the Node.js/Express server.
3. **Frontend (UI):** [Vercel](https://vercel.com) - Hosts the compiled static React SPA.

### 8.2 Steps to Deploy

#### Step A: Database (MongoDB Atlas)

1. Log in to MongoDB Atlas and create a new cluster.
2. Create a Database User with a secure password.
3. In Network Access, whitelist IP `0.0.0.0/0` (allow access from anywhere) to ensure the Render backend can connect.
4. Copy the connection string. Replace `<password>` with your user's password. This is your `MONGO_URI`.

#### Step B: Backend (Render)

1. Push your complete code to a GitHub repository.
2. Log in to [Render](https://render.com) and create a **New Web Service**.
3. Connect your GitHub repository.
4. Set the following configurations:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Under Environment Variables, add:
   - `MONGO_URI`: (From Step A)
   - `JWT_SECRET`: (A secure random string)
   - `PORT`: `5000`
   - `CLIENT_URL`: _(Leave blank for a moment, we will update this after Step C)_
6. Click **Deploy**. Note the provided URL (e.g., `https://issues-api.onrender.com`).

#### Step C: Frontend (Vercel)

1. Log in to [Vercel](https://vercel.com) and click **Add New Project**.
2. Import the same GitHub repository.
3. Set the following configurations:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Under Environment Variables, add:
   - `VITE_API_URL`: The backend URL from Step B + `/api` (e.g., `https://issues-api.onrender.com/api`)
5. Click **Deploy**. Note the provided URL (e.g., `https://issues-tracker.vercel.app`).

#### Step D: Finalize CORS (Crucial)

1. Go back to your backend service on **Render**.
2. Update the `CLIENT_URL` environment variable to match your frontend Vercel URL (e.g., `https://issues-tracker.vercel.app`).
3. Trigger a manual redeploy on Render. This ensures the backend accepts requests from your deployed frontend.

### 8.3 Updating the Deployment

- Both Vercel and Render are connected to your GitHub repository.
- Whenever you push new code to the `main` branch, both platforms will automatically trigger a new build and deploy the updates with zero downtime.

---

_Prepared for Exelon Circuits - Technical Assessment._
