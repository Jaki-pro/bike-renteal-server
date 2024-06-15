"# bike-renteal-server"

# Bike Rental Server

## Overview

This project is a web-server-based application designed for managing bike rentals. It allows users to browse available bikes, reserve them for specific durations, and manage their rental history.

## Features

- User registration and authentication
- Browse available bikes with details (e.g., type, price, availability)
- Reserve bikes for specified durations
- View rental history and current bookings
- Admin dashboard for managing bikes, users, and rentals

## Technologies Used

- Frontend: HTML, CSS, JavaScript (React.js)
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JSON Web Tokens (JWT)
- Other libraries: Bootstrap, Axios

## Installation

### Prerequisites

- Node.js (version >= 12.18.3)
- npm (version >= 6.14.6)
- MongoDB (version >= 4.2.8)
- Express.js (version >= 4.19.2)

### Dependencies

- "cors": "^2.8.5"
- "dotenv": "^16.4.5"
- "express": "^4.19.2"
- "mongoose": "^8.4.0"
- Bootstrap
- "zod": "^3.23.8"

### Setup

1. Clone the repository: git clone `https://github.com/Jaki-pro/bike-renteal-server.git`
2. Navigate to the project directory: `cd bike-rental-server`
3. Install dependencies:

## Live server link: sh https://assignment3-one-rosy.vercel.app/

### API EndPoints of the Live Server

-> /api/auth/signup (POST)

-> /api/auth/login (POST)

-> /api/users/me (GET) (Bearer jwt_token)

-> /api/users/me (PUT) (Bearer jwt_token)

-> /api/bikes (POST) (Bearer jwt_token)

-> /api/bikes (GET)

-> /api/bikes/:id (PUT) (Bearer jwt_token)

-> /api/bikes/:id (DELETE) (Bearer jwt_token)

-> /api/rentals (POST) (Bearer jwt_token)

-> /api/rentals/:id/return (PUT) (Bearer jwt_token)

-> /api/rentals (GET) (Bearer jwt_token)
