# MERN Stack ToDo App

This is a simple ToDo application built using the MERN (MongoDB, Express, React, Node.js) stack.

## Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [npm](https://www.npmjs.com/)

## Getting Started

### 1. Clone the Repository
```sh
git clone https://github.com/your-repo/mern-todo-app.git
cd mern-todo-app
```

### 2. Set Up the Backend (Node.js + Express + MongoDB)

1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the backend directory and add the following:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   ```
4. Start the backend server:
   ```sh
   node server.js
   ```
   The backend server will run on `http://localhost:8000`

### 3. Set Up the Frontend (React)

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Update the API URL in the frontend code if needed:
   - Open `Todo.js` and modify `apiUrl`:
     ```js
     const apiUrl = "http://localhost:3000";
     ```
4. Start the frontend server:
   ```sh
   npm start
   ```
   The frontend app will run on `http://localhost:3000`

## Usage

- Add a new ToDo item by entering a title and description and clicking "Submit".
- Edit a ToDo item by clicking "Edit", modifying the text, and clicking "Update".
- Delete a ToDo item by clicking "Delete".

## Project Structure
```
mern-todo-app/
│── backend/           # Node.js + Express backend
│   ├── server.js      # Main server file
│   ├── models/        # Mongoose models
│   ├── .env           # Environment variables
│   ├── package.json   # Backend dependencies
│
│── frontend/          # React frontend
│   ├── src/
│   ├── Todo.js        # Main component
│   ├── package.json   # Frontend dependencies
│
└── README.md          # Project documentation
```

## Technologies Used

- **Frontend:** React, Bootstrap
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Database:** MongoDB

## License

This project is licensed under the MIT License.
