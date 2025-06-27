# AI Prompt App

This is a full-stack AI-powered prompt-response app using **React.js (frontend)**, **Node.js/Express (backend)**, and **MongoDB** for storing prompt history. It connects to OpenAI's API to generate AI responses based on user prompts.

---

## 📁 Project Structure

```
ai-prompt-app-1/
│
├── backend/              # Express backend with OpenAI + MongoDB
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env              # Contains your OpenAI + MongoDB credentials
│   └── app.js
│
├── frontend/             # React.js frontend
│   ├── src/
│   └── package.json
│
├── README.md             # You're here!
```

---

## 🚀 Prerequisites

Make sure you have the following installed:

- **Node.js** and **npm**: https://nodejs.org/
- **MongoDB Atlas** account (or local MongoDB)
- An **OpenAI API key**: https://platform.openai.com/account/api-keys

---

## 🛠️ Backend Setup

### 1. Navigate to the backend folder
```bash
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
Create a `.env` file in the `backend` folder and add:

```env
PORT=5000
OPENAI_API_KEY=your_openai_api_key_here
MONGO_URI=your_mongodb_connection_string_here
```

### 4. Start the backend server
```bash
node app.js
```

It should log:
```
MongoDB connected
Server running on port 5000
```

---

## 💻 Frontend Setup

### 1. Navigate to the frontend folder
```bash
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the React app
```bash
npm run dev
```

The app will be accessible at:
```
http://localhost:5173
```

> Make sure the backend (`localhost:5000`) is running before using the frontend.

---

## 📮 API Endpoints

| Method | Endpoint                | Description                     |
|--------|-------------------------|---------------------------------|
| POST   | `/api/ask-ai`           | Sends prompt and gets response  |
| GET    | `/api/history`          | Fetches last 20 prompt-responses |
| DELETE | `/api/conversations`    | Deletes all stored prompts      |

---

## ✅ Example: Using Postman

**POST** `/api/ask-ai`

```json
{
  "prompt": "What is the capital of France?"
}
```

---

## 🧽 Troubleshooting

- **429 Rate Limit**: You're hitting OpenAI's request limit — wait or upgrade your plan.
- **500 Server Error**: Check if MongoDB is connected, and OpenAI key is valid.
- **CORS issues**: Make sure both frontend and backend are using the correct ports.

---

