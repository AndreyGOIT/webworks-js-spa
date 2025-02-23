# WebWorks Studio Website

## Overview
WebWorks Studio is a web-based platform designed to showcase the company's services and products. The application provides a user-friendly interface with smooth navigation and interactive elements.

## Features
- **User Authentication**: Users can log in, and their name is displayed dynamically in the navigation bar.
- **Responsive Design**: The website adapts to different screen sizes for optimal user experience.
- **Dynamic Page Loading**: Content is loaded dynamically using JavaScript to enhance performance.
- **Support Chat**: A real-time chat functionality is implemented using Socket.io.
- **Backend with Node.js and Express**: Handles authentication, user sessions, and data management.
- **JSON-based Database**: A JSON file is used to simulate a database for storing user data and other necessary information.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: JSON file for data storage
- **WebSockets**: Implemented via Socket.io for real-time communication

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/AndreyGOIT/webworks-js-spa.git
   ```
2. Navigate to the project directory:
   ```sh
   cd webworks-studio
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the server:
   ```sh
   npm start
   ```

## Usage
- Open `http://localhost:3000` in your browser to access the website.
- Log in to see your name appear in the navigation bar.
- Use the support chat to interact in real-time.

## License
This project is licensed under the MIT License.

