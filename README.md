# The Quran Reader
Quran Reader is a web application that allows users to register, log in, and save their favorite Surahs from the Quran. Users can browse all Surahs, view detailed content, and manage their saved Surahs. The application ensures secure handling of user data and provides a user-friendly interface for engaging with Quranic content.

## Features
User Authentication: Secure registration and login system using hashed passwords.
Browse All Surahs: Displays the list of all Surahs with their name and number of Ayahs.
View Surah Content: Click on a Surah to view its full Arabic text.
Save Favorite Surahs: Users can save their favorite Surahs for quick access.
Personalized Dashboard: Displays the saved Surahs for logged-in users.

## Technologies Used
Frontend: HTML, CSS, EJS (Embedded JavaScript).
Backend: Node.js, Express.js.
Database: PostgreSQL.
Authentication: bcrypt for password hashing.

## Installation
Follow these steps to set up the project locally:

Clone the repository:

git clone https://github.com/Faizan-313/The-Quran-Reader.git
cd quran-reader
Install dependencies:

npm install
Set up the .env file with the following variables:

PG_HOST=<your_database_host>
PG_PORT=<your_database_port>
PG_USER=<your_database_user>
PG_PASSWORD=<your_database_password>
PG_DATABASE=<your_database_name>
SESSION_SECRET=<your_session_secret>
SALT_ROUNDS=<number_of_salt_rounds_for_bcrypt>

Run the application:

npm start
Open your browser and visit http://localhost:3000.

## Usage
Register: Create a new account.
Login: Access your personalized dashboard.
Browse Surahs: View all Surahs from the Quran.
Save Surahs: Add Surahs to your saved list.
Project Structure

License
This project is licensed under the MIT License. See the LICENSE file for details.

