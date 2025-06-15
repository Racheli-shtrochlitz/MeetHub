# Private Teacher Platform

A full-stack web platform designed for private teachers to manage and deliver online lessons, built with React, Node.js, and MongoDB.  
The system provides a smooth interface for both teachers and students, including communication tools, lesson management, and Zoom integration.

## Overview

This platform supports a complete digital workflow for private tutoring, with features tailored for both teachers and students:

- **Teacher Dashboard** – manage lessons, view student list, upload lesson materials, and send updates.
- **Student Area** – view upcoming lessons, access past lesson materials, receive notifications.
- **Zoom Integration** – automatic creation and management of Zoom meetings via API.
- **Messaging System** – internal communication between teachers and students.
- **File Upload** – teachers can share files relevant to each lesson.
- **Lesson Recording** – access to past recorded sessions (via Zoom).

## Technologies Used

- **Frontend**: React, React Router, Axios, Tailwind/PripeReact
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Token)
- **Zoom API**: For live video lessons and recordings

## Folder Structure

project-root/
client/ # React frontend
client/src/components/

client/src/pages/

client/src/services/ # API calls

client/src/App.js

client/public/

Server (Node.js backend)
server/controllers/

server/models/

server/routes/

server/middleware/

server/utils/

server/server.js

Root
.env # Environment variables

package.json # Project dependencies and scripts

README.md # Project documentation

## Getting Started

To run the project locally:

### Prerequisites

- Node.js & npm
- MongoDB (cloud)
- Zoom API credentials

### Installation

```bash
git clone https://github.com/your-org/private-teacher-platform.git
cd private-teacher-platform

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
Running the App
bash
Copy
Edit
# Run backend
cd server
npm start

# Run frontend
cd ../client
npm start
The frontend will be available at http://localhost:3000

Contributors
Mindy Meir – Full Stack Development, Project Architecture

Client – Project requirements & feedback

Notes

Zoom API requires a valid account with JWT or OAuth credentials.
This platform is built with scalability and maintainability in mind, ready for future enhancements like real-time chat, calendar sync, and billing integration.
