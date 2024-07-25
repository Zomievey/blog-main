# Blog Application

Welcome to the Blog Application! This project is a comprehensive platform designed to provide a seamless user experience for both readers and administrators. The application is built with the latest technologies, offering features like user authentication, post management, commenting, and more. This README will walk you through the setup, technologies used, features, and development process.

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Features](#features)
3. [Getting Started](#getting-started)
4. [Development Process](#development-process)
5. [Challenges and Solutions](#challenges-and-solutions)
6. [Future Improvements](#future-improvements)
7. [Contributing](#contributing)
8. [License](#license)

## Technologies Used

- **Frontend:** React, Next.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** Firebase Authentication
- **Hosting:** Vercel (frontend), MongoDB Atlas (database)
- **State Management:** React Hooks

## Features

### User Authentication
- **Sign Up, Login, Logout:** Secure user authentication using Firebase Authentication.
- **Role Management:** Users are assigned roles (admin or regular user) stored in the database to control access to certain features.

### Creating and Managing Posts
- **CRUD Operations:** Admin users can create, edit, and delete posts.
- **Post Viewing:** Regular users can view posts and leave comments.

### Commenting System
- **Comment Creation, Editing, and Deletion:** Users can leave comments on posts and manage their comments.
- **Engagement:** Encourages user interaction and engagement.

### Like and Dislike Functionality
- **Popularity Gauge:** Users can like or dislike posts. The total count of likes and dislikes is displayed for each post.

### Responsive Design
- **Mobile-Friendly:** Fully responsive design using Tailwind CSS for a modern and clean look.

## Getting Started

### Prerequisites
- Node.js and npm installed
- Firebase project setup
- MongoDB Atlas account

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Zomievey/blog.git
   cd blog

