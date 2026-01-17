# MERN CRUD App with React, Vite, Express, MongoDB & Tailwind CSS

A complete CRUD (Create, Read, Update, Delete) application built with the MERN stack.
This project uses React 18 + Vite for the frontend, Express for the backend, MongoDB as the database, and Tailwind CSS v4 for styling.

---

## Features

- Create new users with **name, email, and address**
- Read / list all users
- Update user details (Edit functionality)
- Delete users
- Fully responsive UI with Tailwind CSS v4
- Fast frontend development with Vite
- RESTful API with Express & MongoDB
- Proper error handling and CORS support
- Ready for development and production

---

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS v4
- **Backend:** Node.js, Express
- **Database:** MongoDB (local or Atlas)
- **Other:** CORS, dotenv

---

## Project Structure

```
mern-crud/

server/                  ← Express backend
├── controller/          ← API controllers (create, read, update, delete)
├── model/               ← MongoDB schemas
├── routes/              ← Express routes
├── index.js             ← Server entry point
└── .env                 ← Environment variables

client/                  ← React frontend
├── src/
│   ├── components/      ← UserForm, UserTable, EditUserForm
│   ├── App.jsx           ← Main React component
│   └── main.jsx          ← Entry point
├── index.html
└── vite.config.js        ← Vite + Tailwind plugin
```

---

## Installation

### 1️⃣ Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```
PORT=7000
MONGO_URL=mongodb://localhost:27017/yourdbname
```

Start the backend server:

```bash
npm start
```

Server runs on: [http://localhost:8080](http://localhost:8080)

---

### 2️⃣ Frontend Setup

```bash
cd client
npm install
```

Start the Vite dev server:

```bash
npm run dev
```

Frontend runs on: [http://localhost:5173](http://localhost:5173)

Optional: Add proxy in `vite.config.js` to avoid CORS:

```js
server: {
  proxy: {
    "/api": "http://localhost:8080"
  }
}
```

---

## API Endpoints

| Method | Route           | Description       |
| ------ | --------------- | ---------------- |
| GET    | /api/users      | Get all users     |
| POST   | /api/user      | Create a new user |
| PUT    | /api/user/:id  | Update a user     |
| DELETE | /api/user/:id  | Delete a user     |

---

## Usage

1. Open the frontend in your browser ([http://localhost:5173](http://localhost:5173))
2. Add a new user with **name, email, and address**
3. See the users listed in the table below
4. Edit or Delete a user using the respective buttons

---

## Tailwind CSS v4 Notes

- CSS is imported via `@import "tailwindcss"` in `src/index.css`
- Vite plugin handles Tailwind automatically (`@tailwindcss/vite` in `vite.config.js`)
- No `tailwind.config.js` or `postcss.config.js` is needed in Tailwind v4
- Fully supports responsive and modern UI utilities

---

## Author

- Md Laju Miah / GitHub: [lajumia](https://github.com/lajumia)

---

## License

This project is licensed under the MIT License.

---

## Production Build (Optional)

### Build Frontend

```bash
cd client
npm run build
```

### Serve Static Frontend with Express

1. Copy `dist` folder from `client` into `server/public` (or serve directly)
2. Add this in `index.js`:

```js
app.use(express.static('public'));
```

3. Start server and access via `http://localhost:8080`

This way, your **frontend + backend** runs together in production.

