# Notes Application

A full-stack notes application built with a React SPA frontend and a Django REST Framework backend.

## Features

* User Authentication (Registration, Login, Logout) using JWT.
* Create, Read, and Delete notes.
* Notes are associated with individual users, ensuring privacy.
* RESTful API backend.
* Frontend routing and protected routes.

## Tech Stack

### Frontend
* **React** (v19)
* **Vite**
* **React Router DOM** (v7)
* **Axios**
* **jwt-decode**

### Backend
* **Python** (>= 3.13)
* **Django** (v6)
* **Django REST Framework** (DRF)
* **Simple JWT** (Authentication)
* **PostgreSQL** / SQLite
* **uv** (Package management)

## Prerequisites

To run this project locally, you will need:

* Node.js and npm (for the frontend)
* Python 3.13 or higher (for the backend)
* PostgreSQL (if using the default database configuration, or SQLite can be used by modifying the settings)
* `uv` (Python package manager)

## Setup and Installation

### Backend Setup

1. Navigate to the project root.
2. Install dependencies using `uv`:
   ```bash
   uv sync
   ```
3. Activate the virtual environment:
   ```bash
   source .venv/bin/activate
   ```
   *(Note: The virtual environment is created in the project root, not inside the `Backend/` directory.)*
4. Navigate to the `Backend/` directory:
   ```bash
   cd Backend
   ```
5. Create a `.env` file in the `Backend/` directory with the required environment variables (see Environment Variables section below).
6. Run database migrations:
   ```bash
   python manage.py migrate
   ```
7. Start the backend server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the `Frontend/` directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Frontend/` directory (if different from the default):
   ```
   VITE_API_URL=http://127.0.0.1:8000
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Environment Variables

### Backend (`Backend/.env`)
The backend requires the following environment variables to run locally:

* `SECRETKEY`: A long, random string used for Django's security features.
* `DATABASE_URL`: The connection string for your PostgreSQL database (e.g., `postgres://user:password@localhost:5432/dbname`).
* `DEBUG`: (Optional) Set to `True` for development, defaults to `False`.

### Frontend (`Frontend/.env`)
* `VITE_API_URL`: The URL of the backend API (defaults to `http://127.0.0.1:8000`).

## Project Structure

* `/Backend`: Contains the Django project and applications.
  * `/Backend/API`: The main application handling users, authentication, and notes logic.
  * `/Backend/Config`: Django settings and main URL configurations.
* `/Frontend`: Contains the React application created with Vite.
  * `/Frontend/src/pages`: React components for different pages (Home, Login, Register, NotFound).
  * `/Frontend/src/components`: Reusable React components (like `ProtectedRoute`).

## API Endpoints

* **Authentication:**
  * `POST /api/token/`: Obtain JWT access and refresh tokens.
  * `POST /api/token/refresh/`: Refresh an access token.
  * `GET /api/users/me/`: Get current authenticated user details.
* **Users:**
  * `POST /api/user/register/`: Register a new user.
* **Notes:**
  * `GET /api/notes/`: List all notes for the authenticated user.
  * `POST /api/notes/`: Create a new note.
  * `DELETE /api/notes/<id>/`: Delete a specific note.
