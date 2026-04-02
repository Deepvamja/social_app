# 🚀 Social App — Full Stack Project

A modern **Mini Social Media Application** 
Users can create accounts, share posts, like, comment, and interact in a clean, responsive feed.

---

## ✨ Live Demo

* 🌐 Frontend: https://social-app-sand-gamma.vercel.app/
* 🔗 Backend API: https://social-app-csld.onrender.com

---

## 📸 Features

### 🔐 Authentication

* User Signup & Login
* JWT-based authentication
* Secure password handling

### 📝 Create Post

* Post text, image, or both
* Instant UI update after posting
* Clean UI inspired by modern social apps

### 📰 Feed

* Public feed showing all posts
* Username, content, likes & comments count
* Real-time updates

### ❤️ Like & 💬 Comment

* Like/unlike posts
* Add comments
* Stores usernames of interactions

### 🔍 Search   (Bonus Features)

* Search posts by username or content

### 📄 Pagination (Bonus Features)

* Load posts page-by-page (5 posts at a time)
* Smooth navigation

### 📱 Responsive UI (Bonus Features)

* Mobile-friendly design
* Clean, modern layout

---

## 🛠 Tech Stack

### Frontend

* React.js
* Axios
* CSS (Custom Styling)

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas

### Deployment

* Frontend → Vercel
* Backend → Render

---

## 📂 Project Structure

```
social_app/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
```

---

## ⚙️ Installation (Local Setup)

### 1️⃣ Clone Repository

```
git clone https://github.com/Deepvamja/social_app.git
cd social_app
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
PORT=5000
```

Run backend:

```
npm start
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm start
```

---

## 🔗 API Endpoints

### Auth

* POST `/auth/signup`
* POST `/auth/login`

### Posts

* GET `/posts`
* POST `/posts`
* PUT `/posts/:id/like`
* POST `/posts/:id/comment`

---

## 🎯 Key Highlights

* Clean and modular code structure
* Real-time UI updates
* Fully responsive design
* Pagination implemented (bonus)
* Production deployment (Vercel + Render)

---

## 🚀 Future Improvements

* Infinite scrolling
* Notifications system
* Profile pages
* Image optimization
* Dark mode

---

## 👨‍💻 Author

**Deep Vamja**

* GitHub: https://github.com/Deepvamja
* E-mail: deepvamja22@gmail.com

---


