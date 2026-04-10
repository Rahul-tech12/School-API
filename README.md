# School API

A RESTful API for managing school data. It allows you to add schools to a database and retrieve a list of schools sorted by proximity to a given location using the Haversine formula.

---

## Tech Stack

| Layer      | Technology        |
|------------|-------------------|
| Runtime    | Node.js           |
| Framework  | Express.js v5     |
| Database   | MySQL (mysql2)    |
| Utilities  | dotenv, cors      |

---

## Project Structure

```
School-API/
├── config/
│   └── db.js               # MySQL connection
├── controllers/
│   └── schoolController.js # Business logic
├── routes/
│   └── schoolRoute.js      # Route definitions
├── utils/
│   └── distance.js         # Haversine distance calculation
├── server.js               # Express app entry point
└── .env                    # Environment variables
```

---

## Getting Started

### Prerequisites

- Node.js >= 16
- MySQL database

### Installation

```bash
# Clone the repository
git clone https://github.com/Rahul-tech12/School-API.git
cd School-API

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=10000
```

> Database credentials are configured in `config/db.js`.

### Running the Server

```bash
# Development (with auto-restart)
npx nodemon server.js

# Production
node server.js
```

Server starts on `http://localhost:10000` by default.

---

## API Endpoints

Base URL: `http://localhost:10000/api`

---

### 1. Add School

Adds a new school to the database.

**Endpoint**

```
POST /api/addSchool
```

**Request Headers**

```
Content-Type: application/json
```

**Request Body**

| Field       | Type   | Required | Description                        |
|-------------|--------|----------|------------------------------------|
| `name`      | string | ✅       | Name of the school                 |
| `address`   | string | ✅       | Full address of the school         |
| `latitude`  | number | ✅       | Latitude coordinate (decimal)      |
| `longitude` | number | ✅       | Longitude coordinate (decimal)     |

**Example Request**

```json
{
  "name": "Greenwood High School",
  "address": "123 Elm Street, Mumbai, Maharashtra",
  "latitude": 19.0760,
  "longitude": 72.8777
}
```

**Success Response** — `201 Created`

```json
{
  "message": "School added successfully",
  "schoolId": 7
}
```

**Error Responses**

| Status | Condition                            | Response Body                                    |
|--------|--------------------------------------|--------------------------------------------------|
| `400`  | Any required field is missing        | `{ "message": "All fields are required" }`       |
| `400`  | Latitude or longitude is not a number| `{ "message": "Invalid coordinates" }`           |
| `500`  | Database error                       | `{ "error": "<error message>" }`                 |

---

### 2. List Schools (sorted by proximity)

Returns all schools from the database sorted by distance (nearest first) from the provided coordinates.

**Endpoint**

```
GET /api/listSchools
```

**Query Parameters**

| Parameter   | Type   | Required | Description                          |
|-------------|--------|----------|--------------------------------------|
| `latitude`  | number | ✅       | User's current latitude (decimal)    |
| `longitude` | number | ✅       | User's current longitude (decimal)   |

**Example Request**

```
GET /api/listSchools?latitude=19.0760&longitude=72.8777
```

**Success Response** — `200 OK`

Returns an array of school objects sorted by `distance` (in kilometres) from the provided coordinates.

```json
[
  {
    "id": 3,
    "name": "Greenwood High School",
    "address": "123 Elm Street, Mumbai, Maharashtra",
    "latitude": 19.076,
    "longitude": 72.8777,
    "distance": 0
  },
  {
    "id": 1,
    "name": "St. Xavier's School",
    "address": "5 Park Road, Pune, Maharashtra",
    "latitude": 18.5204,
    "longitude": 73.8567,
    "distance": 62.34
  },
  {
    "id": 2,
    "name": "Delhi Public School",
    "address": "Sector 45, New Delhi",
    "latitude": 28.6139,
    "longitude": 77.209,
    "distance": 1157.82
  }
]
```

**Response Fields**

| Field       | Type   | Description                                              |
|-------------|--------|----------------------------------------------------------|
| `id`        | number | Auto-incremented primary key                             |
| `name`      | string | School name                                              |
| `address`   | string | School address                                           |
| `latitude`  | number | School latitude                                          |
| `longitude` | number | School longitude                                         |
| `distance`  | number | Calculated distance in **km** from the provided location |

**Error Responses**

| Status | Condition                              | Response Body                                        |
|--------|----------------------------------------|------------------------------------------------------|
| `400`  | `latitude` or `longitude` not provided | `{ "message": "Latitude & Longitude required" }`     |
| `500`  | Database error                         | `{ "error": "<error message>" }`                     |

---

## Distance Calculation

Schools are ranked using the **Haversine formula**, which calculates the great-circle distance between two points on the Earth's surface given their latitude and longitude. The result is expressed in kilometres.

---

## Database Schema

```sql
CREATE TABLE schools (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  name      VARCHAR(255) NOT NULL,
  address   TEXT NOT NULL,
  latitude  FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);
```

