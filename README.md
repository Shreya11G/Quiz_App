Sure! Here's your updated `README.md` for the **Quiz App**, **without the live demo section**:

---

```markdown
# 🎯 Quiz App

A full-stack **Quiz Application** built using the **MERN stack** (MongoDB, Express.js, React, Node.js). Users can take quizzes, view their scores, and experience an intuitive and responsive interface.

---

## 🛠️ Tech Stack

### Frontend – React + Vite

- React 19
- React Router DOM
- Axios
- Vite

### Backend – Node.js + Express

- Express 5
- MongoDB (via Mongoose)
- JWT Authentication
- CORS & Body Parser

---

## 📁 Project Structure

```

/client         → React frontend
/server         → Node.js backend

````

---

## 📦 Installation

### 1. Clone the Repo

```bash
git clone https://github.com/Shreya11G/quiz-app.git
cd quiz-app
````

### 2. Setup Backend

```bash
cd server
npm install
# Create a .env file with your MongoDB URI and secret key
npm run dev
```

### 3. Setup Frontend

```bash
cd ../client
npm install
npm run dev
```

---

## ⚙️ .env File Examples

### `.env` (backend/server)

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### `.env` (frontend/client)

If needed, to define API base:

```
VITE_API_URL=http://localhost:5000
```

---

## ✨ Features

* User-friendly quiz interface
* Dynamic questions and answer checking
* Score tracking
* RESTful API integration
* Fully responsive design

---


---

## 🧠 Future Enhancements

* Authentication system (login/signup)
* Admin panel for adding/editing quizzes
* Timer-based quizzes
* Leaderboards and analytics

---

## 🤝 Contributing

Contributions are welcome! Fork the repo, make your changes, and submit a pull request.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 💬 Contact

Made with ❤️ by [Your Name](https://github.com/yourusername)

```

---

Let me know if you’d like help auto-generating badges or a cover image for your GitHub repo.
```
