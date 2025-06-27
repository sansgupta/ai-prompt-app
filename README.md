# AI Prompt App

This is a full-stack AI-powered prompt-response app using **React.js (frontend)**, **Node.js/Express (backend)**, and **MongoDB** for storing prompt history. It connects to OpenAI's API to generate AI responses based on user prompts.

---

##  Project Structure

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

##  Prerequisites

Make sure you have the following installed:

- **Node.js** and **npm**: https://nodejs.org/
- **MongoDB Atlas** account (or local MongoDB)
- An **OpenAI API key**: https://platform.openai.com/account/api-keys

---

##  Backend Setup

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

##  Frontend Setup

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

##  API Endpoints

| Method | Endpoint                | Description                     |
|--------|-------------------------|---------------------------------|
| POST   | `/api/ask-ai`           | Sends prompt and gets response  |
| GET    | `/api/history`          | Fetches last 20 prompt-responses |
| DELETE | `/api/conversations`    | Deletes all stored prompts      |

---

##  API Endpoints Documentation

### 1. `POST /api/ask-ai`
**Description:** Sends a user prompt to OpenAI and stores the AI response in MongoDB.

- **Request Body:**
```json
{
  "prompt": "Explain machine learning in simple terms"
}
```

- **Response:**
```json
{
  "response": "Machine learning is a way..."
}
```

####  Example (Postman):
- Method: `POST`
- URL: `http://localhost:5000/api/ask-ai`
- Body: `raw` JSON
```json
{
  "prompt": "What is React?"
}
```

####  Example (curl):
```bash
curl -X POST http://localhost:5000/api/ask-ai \
     -H "Content-Type: application/json" \
     -d '{"prompt": "What is React?"}'
```

---

### 2. `GET /api/history`
**Description:** Retrieves the last 20 prompt-response entries from the database.

- **Response:**
```json
[
  {
    "_id": "12345",
    "prompt": "What is AI?",
    "response": "AI stands for artificial intelligence...",
    "createdAt": "2025-06-27T10:00:00Z"
  }
]
```

####  Example (curl):
```bash
curl http://localhost:5000/api/history
```

---

### 3. `DELETE /api/conversations`
**Description:** Deletes all stored prompts and responses from the database.

- **Response:**
```json
{
  "message": "All conversations deleted"
}
```

####  Example (curl):
```bash
curl -X DELETE http://localhost:5000/api/conversations
```

---

##  Author
Built by Sanskar Gupta

---