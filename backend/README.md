# Hackathon Finals Backend API Guide

This is the updated API integration guide for the frontend and mobile developers. The backend runs completely in-memory for the hackathon MVP and supports Google Gemini AI features via `.env`.

**Base URL:** `http://localhost:3000`

---

## Users

### Get All Users
- **Method:** `GET`
- **URL:** `/api/users`
- **Purpose:** Retrieve all registered users or filter by school/class.
- **Query Parameters:**
  - `schoolId` (optional): Filter by school ID.
  - `className` (optional): Filter by class ID (e.g. `10A`).
- **Example Request:**
  `GET /api/users?schoolId=school-1`
- **Example Response (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "1",
        "name": "Azizbek",
        "schoolId": "school-1",
        "classId": "10A",
        "xp": 1500,
        "level": 5,
        "streak": 12,
        "badges": ["First Win", "Math Genius"],
        "stats": { "Math": 10, "History": 2 }
      }
    ]
  }
  ```

### Get User
- **Method:** `GET`
- **URL:** `/api/users/:id`
- **Purpose:** Retrieve a specific user by ID.
- **Example Request:**
  `GET /api/users/1`
- **Example Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "id": "1",
      "name": "Azizbek",
      "schoolId": "school-1",
      "classId": "10A",
      "xp": 1500,
      "level": 5,
      "streak": 12,
      "badges": ["First Win", "Math Genius"],
      "stats": { "Math": 10, "History": 2 }
    }
  }
  ```
- **Possible status codes:** `200`, `404`

### Register User
- **Method:** `POST`
- **URL:** `/api/users/register`
- **Purpose:** Create a new user.
- **Request Body:**
  ```json
  {
    "name": "Bobur",
    "schoolId": "school-3",
    "classId": "11B"
  }
  ```
- **Example Response (201 Created):**
  ```json
  {
    "success": true,
    "data": {
      "id": "abc123xyz",
      "name": "Bobur",
      "schoolId": "school-3",
      "classId": "11B",
      "xp": 0,
      "level": 1,
      "streak": 0,
      "badges": [],
      "stats": {}
    }
  }
  ```
- **Possible status codes:** `201`, `400`

### Update User
- **Method:** `PATCH`
- **URL:** `/api/users/:id`
- **Purpose:** Update a user's details (e.g. XP).
- **Request Body:**
  ```json
  {
    "xp": 1600,
    "badges": ["First Win", "Math Genius", "Quiz Master"]
  }
  ```
- **Example Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "id": "1",
      "name": "Azizbek",
      "schoolId": "school-1",
      "classId": "10A",
      "xp": 1600,
      "level": 5,
      "streak": 12,
      "badges": ["First Win", "Math Genius", "Quiz Master"],
      "stats": { "Math": 10, "History": 2 }
    }
  }
  ```
- **Possible status codes:** `200`, `404`

### Delete User
- **Method:** `DELETE`
- **URL:** `/api/users/:id`
- **Purpose:** Delete a user account.
- **Example Request:**
  `DELETE /api/users/1`
- **Example Response (204 No Content):** `(empty body)`
- **Possible status codes:** `204`, `404`

---

## AI Features (Powered by Gemini API)
*If Gemini is unavailable, these endpoints automatically return a deterministic mock fallback so the demo never crashes.*

### Ask Question
- **Method:** `POST`
- **URL:** `/api/ai/ask`
- **Purpose:** Ask the AI an educational question.
- **Request Body:**
  ```json
  {
    "question": "What is gravity?"
  }
  ```
- **Example Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "answer": "Gravity is the invisible force that pulls objects toward each other."
    }
  }
  ```
- **Possible status codes:** `200`, `400`

### Fun Explanation
- **Method:** `POST`
- **URL:** `/api/ai/explain-fun`
- **Purpose:** Get a fun explanation of a complex topic.
- **Request Body:**
  ```json
  {
    "topic": "Quantum Physics"
  }
  ```
- **Example Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "explanation": "Imagine the universe is a video game..."
    }
  }
  ```
- **Possible status codes:** `200`, `400`

### Solve Image
- **Method:** `POST`
- **URL:** `/api/ai/solve-image`
- **Purpose:** Get a step-by-step math solution for an uploaded image.
- **Request Body:** `(Multipart/form-data or JSON with image payload - currently mocked to accept anything)`
  ```json
  {}
  ```
- **Example Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "solution": "The equation is 2x = 4, so x = 2."
    }
  }
  ```
- **Possible status codes:** `200`

---

## Duels

### Create Duel
- **Method:** `POST`
- **URL:** `/api/duel/create`
- **Purpose:** Create a new head-to-head duel.
- **Request Body:**
  ```json
  {
    "subject": "Math",
    "playerId": "1"
  }
  ```
- **Example Response (201 Created):**
  ```json
  {
    "success": true,
    "data": {
      "id": "duel-123",
      "subject": "Math",
      "player1Id": "1",
      "status": "waiting",
      "questions": [
        { "q": "What is 2+2?", "a": "4" },
        { "q": "What is the capital of France?", "a": "Paris" }
      ],
      "p1Score": 0,
      "p2Score": 0
    }
  }
  ```
- **Possible status codes:** `201`, `400`

### Join Duel
- **Method:** `POST`
- **URL:** `/api/duel/:id/join`
- **Purpose:** Join a waiting duel.
- **Request Body:**
  ```json
  {
    "playerId": "2"
  }
  ```
- **Example Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "id": "duel-123",
      "subject": "Math",
      "player1Id": "1",
      "player2Id": "2",
      "status": "active",
      "questions": [...],
      "p1Score": 0,
      "p2Score": 0
    }
  }
  ```
- **Possible status codes:** `200`, `400`, `404`

### Answer Duel Question
- **Method:** `POST`
- **URL:** `/api/duel/:id/answer`
- **Purpose:** Submit an answer to a duel question.
- **Request Body:**
  ```json
  {
    "playerId": "1",
    "questionIndex": 0,
    "answer": "4",
    "responseTimeMs": 1500
  }
  ```
- **Example Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "correct": true,
      "timeTaken": 1500,
      "duel": {
        "id": "duel-123",
        "subject": "Math",
        "player1Id": "1",
        "player2Id": "2",
        "status": "active",
        "questions": [...],
        "p1Score": 1,
        "p2Score": 0
      }
    }
  }
  ```
- **Possible status codes:** `200`, `400`, `404`

### Get Duel Result
- **Method:** `GET`
- **URL:** `/api/duel/:id/result`
- **Purpose:** Retrieve the results of a duel.
- **Example Request:**
  `GET /api/duel/duel-123/result`
- **Example Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "winnerId": "1",
      "p1Score": 1,
      "p2Score": 0
    }
  }
  ```
- **Possible status codes:** `200`, `404`

---

## Leaderboard

### Get School Leaderboard
- **Method:** `GET`
- **URL:** `/api/leaderboard/:schoolId`
- **Purpose:** Fetch a leaderboard sorted by highest XP for a specific school.
- **Example Request:**
  `GET /api/leaderboard/school-1`
- **Example Response (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "4",
        "name": "Nodira",
        "schoolId": "school-1",
        "classId": "10B",
        "xp": 2600,
        "level": 8,
        "streak": 20,
        "badges": ["Legend", "Top Scorer"],
        "stats": { "Math": 20, "Science": 15 }
      }
    ]
  }
  ```
- **Possible status codes:** `200`

---

## Quiz

### Generate Quiz
- **Method:** `POST`
- **URL:** `/api/quiz/generate`
- **Purpose:** Generate a 5-question multiple choice quiz using AI (or fallback).
- **Request Body:**
  ```json
  {
    "subject": "Science"
  }
  ```
- **Example Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "subject": "Science",
      "questions": [
        {
          "question": "What is the chemical formula for water?",
          "options": ["H2O", "CO2", "NaCl", "O2"],
          "answer": "H2O"
        }
      ]
    }
  }
  ```
- **Possible status codes:** `200`

---

## Standard Error Responses
When a request fails, the API returns an appropriate HTTP status code (`400`, `404`, `500`) and the following JSON format:

**Example (400 Bad Request):**
```json
{
  "success": false,
  "error": {
    "message": "Missing required fields",
    "code": "MISSING_FIELDS"
  }
}
```
