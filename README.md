# OPQuotes API

A searchable, filterable REST API for One Piece quotes. Query quotes by character, arc, or theme — or grab a random one, vote on your favorites, and get a new quote every day.

Built with Node.js, Express, and MongoDB.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
  - [Characters](#characters)
  - [Arcs](#arcs)
  - [Quotes](#quotes)
- [Query Parameters](#query-parameters)
- [Authentication](#authentication)
- [Tech Stack](#tech-stack)

---

## Getting Started

**Prerequisites:** Node.js v18+ and a MongoDB Atlas account (or local MongoDB instance).

```bash
# Clone the repository
git clone https://github.com/ParmeetBhamrah/opquotes-api.git
cd opquotes-api

# Install dependencies
npm install

# Create your environment file
cp .env.example .env
# Fill in your MONGODB_URI in .env

# Start the development server
npm run dev
```

The server runs on `http://localhost:3000` by default.

---

## Project Structure

```
src/
├── index.js            # Entry point — starts the server
├── app.js              # Express app setup and middleware
├── config/
│   └── db.js           # MongoDB connection
├── models/
│   ├── character.js
│   ├── arc.js
│   └── quote.js
├── routes/
│   ├── characterRoutes.js
│   ├── arcRoutes.js
│   └── quoteRoutes.js
├── controllers/
│   ├── characterController.js
│   ├── arcController.js
│   └── quoteController.js
└── middleware/
    └── errorHandler.js
```

---

## Environment Variables

Create a `.env` file in the root of the project with the following:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

A `.env.example` file is included in the repository as a reference template.

---

## API Reference

All endpoints are prefixed with `/api`. Responses follow a consistent shape:

```json
{
  "success": true,
  "data": {}
}
```

Errors return `success: false` with a `message` field describing what went wrong.

---

### Characters

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/characters` | Get all characters |
| GET | `/api/characters/:id` | Get a single character |
| POST | `/api/characters` | Create a character |
| PUT | `/api/characters/:id` | Update a character |
| DELETE | `/api/characters/:id` | Delete a character |

**Create / Update body:**
```json
{
  "name": "Monkey D. Luffy",
  "crew": "Straw Hat Pirates",
  "role": "Captain",
  "devilFruit": "Gomu Gomu no Mi"
}
```

`name` is required and must be unique.

---

### Arcs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/arcs` | Get all arcs, sorted by order |
| GET | `/api/arcs/:id` | Get a single arc |
| POST | `/api/arcs` | Create an arc |
| PUT | `/api/arcs/:id` | Update an arc |
| DELETE | `/api/arcs/:id` | Delete an arc |

**Create / Update body:**
```json
{
  "name": "Marineford",
  "saga": "Summit War Saga",
  "order": 22
}
```

`name` is required and must be unique.

---

### Quotes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/quotes` | Get all quotes (supports filtering, search, sort, pagination) |
| GET | `/api/quotes/random` | Get a random quote |
| GET | `/api/quotes/today` | Get the deterministic quote of the day |
| GET | `/api/quotes/:id` | Get a single quote |
| POST | `/api/quotes` | Create a quote |
| PUT | `/api/quotes/:id` | Update a quote |
| DELETE | `/api/quotes/:id` | Delete a quote |
| POST | `/api/quotes/:id/upvote` | Increment upvote count by 1 |
| POST | `/api/quotes/:id/downvote` | Increment downvote count by 1 |

**Create / Update body:**
```json
{
  "text": "I'm going to be King of the Pirates!",
  "character": "<character_id>",
  "arc": "<arc_id>",
  "themes": ["ambition", "determination"],
  "source": "Chapter 1"
}
```

`text` and `character` are required. `arc` is optional. `themes` defaults to an empty array. `upvotes` and `downvotes` default to 0.

Character and arc fields in responses are automatically populated with their name and relevant details.

---

## Query Parameters

All query parameters can be combined freely on `GET /api/quotes`.

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `character` | ObjectId | Filter by character ID | `?character=64a1f3b2c9e7` |
| `arc` | ObjectId | Filter by arc ID | `?arc=64a1f3b2c9e8` |
| `themes` | String | Filter by theme tag | `?themes=determination` |
| `search` | String | Case-insensitive keyword search on quote text | `?search=king` |
| `sortBy` | String | Field to sort by (`createdAt`, `upvotes`, `downvotes`) | `?sortBy=upvotes` |
| `order` | String | Sort direction: `asc` or `desc` | `?order=desc` |
| `page` | Number | Page number (default: 1) | `?page=2` |
| `limit` | Number | Results per page (default: 10) | `?limit=5` |

**Example combined query:**
```
GET /api/quotes?search=sea&themes=freedom&sortBy=upvotes&order=desc&page=1&limit=5
```

Paginated responses include `total`, `page`, `pages`, and `count` fields alongside `data`.

---
## Authentication

Read operations (GET requests) are public and require no authentication.

Write operations — creating, updating, and deleting quotes, characters, and arcs — are protected by an API key. Include your key in the request header:

```
api-key: your_api_key
```

Requests to protected endpoints without a valid key will receive a `401 Unauthorized` response.

To run this project yourself, add your chosen key to your `.env` file:

```
API_KEY=your_secret_key_here
```

---
## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB
- **ODM:** Mongoose
- **Dev tooling:** nodemon, dotenv