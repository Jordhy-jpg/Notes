# Notes Application

A full-stack notes management application featuring a RESTful API backend and a single-page application (SPA) frontend. It allows users to register, log in, and securely manage their personal notes.

## Features

- **User Authentication**: Secure user registration and login using JSON Web Tokens (JWT).
- **Personalized Notes**: Users can only view, create, and delete their own notes.
- **RESTful API**: A robust backend providing endpoints for component interactions.
- **Modern Frontend**: A fast and reactive SPA built with React and Vite.

## Tech Stack

### Backend
- **Framework**: Django 6 & Django REST Framework (DRF)
- **Database**: PostgreSQL (via psycopg) / SQLite (development)
- **Authentication**: Simple JWT
- **Package Management**: `uv` (via `pyproject.toml`) and `requirements.txt`
- **Server**: Gunicorn & Whitenoise (for serving static files in production)

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router DOM v7
- **HTTP/API Client**: Axios
- **State Properties**: React Hooks

## Getting Started

### Prerequisites
- Python 3.13+
- Node.js & npm
- `uv` package manager (optional, but recommended)

### Backend Setup

1. Navigate to the root folder, and then set up the server:
   ```bash
   cd Backend
   ```
2. Create and activate a virtual environment (if not using `uv` globally):
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```
3. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   # OR using uv from the project root: uv sync
   ```
4. Set up the environment variables:
   - Create a `.env` file in the `Backend` directory and define required settings.
5. Apply database migrations:
   ```bash
   python manage.py migrate
   ```
6. Start the development server:
   ```bash
   python manage.py runserver
   ```
   The API will be running at `http://localhost:8000`.

### Frontend Setup

1. Open a new terminal and navigate to the Frontend directory:
   ```bash
   cd Frontend
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend application will be running at `http://localhost:5173`.

## API Endpoints

### Authentication & Users
- `POST /api/user/register/`: Register a new user account.
- `POST /api/token/`: Obtain JWT access and refresh tokens (Login).
- `POST /api/token/refresh/`: Refresh an expired access token.

### Notes
All notes endpoints require a valid JWT access token provided in the `Authorization` header (`Bearer <token>`).

- `GET /`: Retrieve a list of all notes created by the authenticated user.
- `POST /`: Create a new note. Requires `title` and `content`.
- `DELETE /delete/<id>/`: Delete a specific note by its ID.

## Resources Used

- **Tutorial**: [React & Django Tutorial](https://youtu.be/c-QsfbznSXI?si=pC2FCPqhmKeQWxhU)
- **Django REST Framework**:
  - [GitHub Repository](https://github.com/encode/django-rest-framework)
  - [Official Documentation](https://www.django-rest-framework.org/)
  - [Permissions Guide](https://www.django-rest-framework.org/api-guide/permissions/)
  - [ModelSerializer Guide](https://www.django-rest-framework.org/api-guide/serializers/#modelserializer)
  - [Generic Views Guide](https://www.django-rest-framework.org/api-guide/generic-views/)
- **Django REST Framework SimpleJWT**:
  - [GitHub Repository](https://github.com/jazzband/djangorestframework-simplejwt?tab=readme-ov-file)
  - [Getting Started Guide](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/getting_started.html)
- **Django CORS Headers**: [GitHub Repository](https://github.com/adamchainz/django-cors-headers)
