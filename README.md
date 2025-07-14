# 📝 Blog-Web1

**Blog-Web1** is a full-stack blogging platform built with the **MERN stack (MongoDB, Express.js, React, Node.js)**. It allows users to create, manage, and share blog posts with image uploads via **AWS S3**, persistent session using **LocalStorage**, and comprehensive test coverage using **Cypress**.

##  Features

-  User authentication (Register/Login with JWT)
-  Create, edit, and delete blog posts
-  Rich content support
-  Upload and store images to **AWS S3**
-  Persistent login via **LocalStorage**
-  Middleware for route protection and request validation
-  Centralized error handling for clean and consistent responses
-  **End-to-end testing** with **Cypress**
-  Responsive UI for all devices

## 🛠 Tech Stack

### Frontend:
- React.js
- React Router
- Axios
- Tailwind CSS / CSS Modules *(please confirm)*
- Cypress (for E2E testing)

### Backend:
- Node.js
- Express.js
- MongoDB + Mongoose
- AWS SDK (S3)
- JSON Web Token (JWT)
- Middleware (auth, error handling, logging)
- dotenv for environment management

##  Installation

### 1. Clone the repository

 Clone the repository

```bash
git clone https://github.com/nuve-ra/Blog-Web1.git
cd Blog-Web1

BACKEND SETUP..!!
cd server
npm install
# Add environment variables to `.env`
npm start
FRONTEND SETUP..!!
cd client
npm install
npm start


Cypress is used for end-to-end testing.

To run Cypress:

bash
Copy
Edit
cd client
npx cypress open

Folder Structure
csharp
Copy
Edit
Blog-Web1/
├── client/             # React frontend
│   └── cypress/        # Cypress test suite
│   └── src/
│       └── components/
├── server/             # Express backend
│   └── models/
│   └── routes/
│   └── middleware/     # Auth, error handler, etc.
│   └── controllers/
│   └── utils/

Credits
Developed by nuve-ra

File handling: Amazon S3

E2E Testing: Cypress

UI Styling: Tailwind CSS
