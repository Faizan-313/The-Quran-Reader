### The Quran Reader
## Description
Quran Reader is a web application that lets users register, log in, and save their favorite Surahs from the Quran. Users can browse and view all Surahs, view their saved Surahs, and manage their personal data securely. This project is built to provide a seamless user experience for reading and saving Quranic content.

## Features
User Registration: Users can create an account with their username, email, and password.
User Login: Secure login with password authentication.
Save Favorites: Users can save their favorite Surahs for quick access.
Surah Browsing: View a list of all Surahs and their details, such as name and number of Ayahs.
Secure Data Handling: Passwords are hashed using bcrypt for enhanced security.
Session Management: User sessions are managed to provide a personalized experience.

## Tech Stack
This project is built using the following technologies:

Backend: Node.js, Express.js
Database: PostgreSQL
Frontend: EJS (Embedded JavaScript Templates)
Authentication: bcrypt.js for password hashing
Session Management: Express-session for user sessions

## Installation
Prerequisites
Ensure that you have the following installed:

Node.js (v18.20.2 or any compatible version)
npm 
PostgreSQL database

Clone the Repository
bash
Copy code
git clone https://github.com/Faizan-313/The-Quran-Reader.git
cd 
Set Up Environment Variables
Create a .env file in the root of the project and add the following environment variables:

makefile
Copy code
PG_HOST=your-postgres-host
PG_USER=your-postgres-user
PG_DATABASE=your-database-name
PG_PASSWORD=your-database-password
PG_PORT=5432
SESSION_SECRET=your-session-secret
SALT_ROUNDS=10

## Install Dependencies
npm install
Run the Application
run the seedDatabase() function for storing the data to the database
comment it after seeing "data feeded to database successufully"  in console

To start the application locally, use:
nodemon app.js

## Usage
Visit http://localhost:3000 in your web browser.
Register a new account or log in if you already have one.
Browse through the list of Surahs and save your favorites.
Access the "Saved" section to view your saved Surahs.

## API Endpoints
POST /register: Endpoint for user registration.
POST /login: Endpoint for user login and session initiation.
GET /saved: Displays saved Surahs for the logged-in user.
GET /all: Lists all Surahs with their names and the number of Ayahs.
Other endpoints based on project functionality.

License
This project is licensed under the MIT License.

Acknowledgements
This project was built with the help of various open-source libraries and resources, including:

Express.js for building the web server
bcrypt.js for secure password hashing
EJS for rendering views
PostgreSQL as the database solution
