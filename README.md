
🖋️ Full-Stack MERN Blogging Platform
A modern, feature-rich blogging application with real-time interactions and an advanced block-based editor.

🚀 Project Overview
This platform is designed for a seamless writing and reading experience. It goes beyond simple text posting by incorporating EditorJS for structured content, a Nested Comment System, and Real-Time Notifications to keep users engaged.

🛠 Tech Stack
Frontend: React.js, Tailwind CSS, Framer Motion (for animations)

Backend: Node.js, Express.js

Database: MongoDB (Mongoose)

Auth: Firebase/Google Authentication & JWT

Editor: EditorJS (Block-based rich text)

🏗️ System Architecture
The application follows a traditional MVC (Model-View-Controller) pattern on the backend to ensure the codebase remains scalable and organized.
Application Data Flow
This diagram shows how a user interacts with the platform, from authentication to publishing a blog.
<img width="1082" height="3818" alt="image" src="https://github.com/user-attachments/assets/f4fbbf01-ee0a-42cb-abaa-331bdd2eaca5" />

Key Technical Features
Block-Based Editor: Integrated EditorJS, allowing users to add images, lists, and headings as distinct data blocks rather than raw HTML.

Nested Commenting Engine: A recursive comment system allowing users to reply to specific comments, creating deep community discussions.

Activity Notifications: A dedicated notification system that alerts users of new likes, comments, and replies, similar to major social platforms.

Search & Analytics: Robust search functionality for both blogs and users, paired with a personal dashboard to track blog performance.

Performance: Implemented lazy loading and memoization in React to ensure smooth fade-in animations and fast page transitions.

🚦 Installation & Setup
Clone the repo: git clone https://github.com/nuve-ra/mern-blogging-website.git

Install Client deps: cd blogging\ website\ -\ frontend && npm install

Install Server deps: cd server && npm install

Environment Variables: Create a .env in the server folder with your MONGODB_URI, JWT_SECRET, and GOOGLE_AUTH keys.

Run: Start the server and frontend concurrently to begin development.

What I Learned
During this project, I mastered Recursive Schemas in MongoDB to handle nested comments and learned how to sanitize and store structured JSON data from EditorJS instead of risky innerHTML strings.

<img width="3158" height="2705" alt="image" src="https://github.com/user-attachments/assets/a3fd5f0f-0073-4a63-88c9-92f0cfed9af2" />


