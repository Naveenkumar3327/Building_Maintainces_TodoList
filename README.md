# 🏢 Building Maintenance To-Do List App

A modern full-stack **Building Maintenance Tracker** app designed to help streamline the tracking of maintenance tasks in residential or commercial properties. Built using the **MERN Stack**, this app supports task creation, updating, and deletion for efficient maintenance management.

🌐 **Live Demo**: [building-maintenance-todo-list.vercel.app](https://building-maintenance-todo-list.vercel.app)

---


## 🚀 Features

- ✅ Add, update, and delete maintenance tasks  
- 🏠 View all ongoing and completed tasks  
- 🔒 User-friendly interface  
- 🗂️ Categorized task list  
- 🌙 Clean UI with responsive design  

---

## 🧩 Tech Stack

| Tech          | Use                        |
|---------------|-----------------------------|
| **Next.js**   | Frontend (React-based)      |
| **MongoDB**   | Database                    |
| **Mongoose**  | ODM for MongoDB             |
| **Express.js**| Backend APIs                |
| **Node.js**   | Backend runtime             |
| **Tailwind CSS** | Styling                  |

---

## ⚙️ Dependencies

To run the app, install the following packages:

npm install next react react-dom
npm install mongoose
npm install express
npm install cors

text

---

## 💻 Local Development Setup

Follow these steps to run the app locally:

1. Clone the Repository
git clone https://github.com/Naveenkumar3327/Building_Maintainces_TodoList.git
cd Building_Maintainces_TodoList

2. Install dependencies
npm install

3. Setup MongoDB
Update your MongoDB connection string in: /src/lib/mongodb.js
4. Run the development server
npm run dev

Visit: http://localhost:3000
text

---

## 🔧 Available Scripts

| Command         | Description                  |
|-----------------|------------------------------|
| `npm run dev`   | Runs app in development mode |
| `npm run build` | Builds app for production    |
| `npm start`     | Starts production server     |

---

## 🗂️ API Endpoints

| Method | Endpoint         | Description             |
|--------|------------------|-------------------------|
| GET    | `/api/tasks`     | Get all tasks           |
| POST   | `/api/tasks`     | Add new task            |
| PUT    | `/api/tasks/:id` | Update existing task    |
| DELETE | `/api/tasks/:id` | Delete task by ID       |

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory and add:

MONGODB_URI=your_mongodb_connection_url

text

---

## 👨‍💻 Author

- **Naveenkumar D**  
- 🔗 GitHub: [@Naveenkumar3327](https://github.com/Naveenkumar3327)  
- ✉️ Email: [Naveenkumar0203@gmail.com](mailto:Naveenkumar0203@gmail.com)  
- 🌍 Portfolio: [naveenkumar-d.vercel.app](https://naveenkumar-d.vercel.app)

---

## 📌 License

This project is licensed under the **MIT License** — feel free to use, modify, and share.

---

## ❤️ Acknowledgments

- Thanks to mentors and reviewers  
- Inspired by real-world building management systems  

---
