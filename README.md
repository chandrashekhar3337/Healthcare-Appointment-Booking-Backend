# 🏥 Healthcare Appointment Booking Backend

A production-ready **Healthcare Appointment Booking Backend** built using **Node.js**, **Express.js**, **MongoDB**, **Redis**, **Docker**, **AWS EC2**, and **GitHub Actions CI/CD**. :contentReference[oaicite:0]{index=0}

This project provides a complete backend system for:

- 👨‍⚕️ Doctor & Patient Authentication
- 📅 Doctor Slot Management
- 🩺 Appointment Booking System
- ⚡ Real-time Slot Availability
- 🚀 Redis Caching
- ⏰ Background Cron Jobs
- 🐳 Dockerized Deployment
- 🔄 Automated CI/CD Pipeline

---

# 🚀 Live Deployment

```bash
http://100.53.18.226
```

---

# 📌 Features

## 🔐 Authentication System

- JWT Authentication
- Access & Refresh Tokens
- Role-based Authorization
- Secure Protected Routes
- Cookie-based Authentication

---

## 👨‍⚕️ Doctor Features

- Create Appointment Slots
- Update Slots
- Delete Slots
- View Own Slots
- View Booked Appointments

---

## 🧑‍💻 Patient Features

- Register/Login
- View Available Doctors
- View Available Slots
- Book Appointment

---

# ⚡ Smart Slot Logic

System prevents:

- ❌ Double Booking
- ❌ Overlapping Slots
- ❌ Past Slot Creation
- ❌ Booking Expired Slots
- ❌ Updating Booked Slots
- ❌ Deleting Booked Slots

---

# 🔥 Real-World Edge Cases Handled

| Edge Case | Solution |
|---|---|
| Double booking | MongoDB Transactions |
| Race conditions | Atomic `findOneAndUpdate()` |
| Expired slots | `endTime >= currentTime` |
| Overlapping slots | Validation Query |
| Heavy DB load | Redis Caching |
| API abuse | Rate Limiting |
| Concurrent requests | Transaction Sessions |

---

# 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Backend Runtime |
| Express.js | API Framework |
| MongoDB Atlas | Database |
| Mongoose | ODM |
| Redis | Caching |
| JWT | Authentication |
| Docker | Containerization |
| Docker Compose | Multi-container Setup |
| AWS EC2 | Deployment |
| Nginx | Reverse Proxy |
| GitHub Actions | CI/CD |
| Node Cron | Background Jobs |

---

# 📁 Folder Structure

```bash
src/
│
├── config/
│   ├── db.js
│   └── redis.js
│
├── jobs/
│   └── appointment.job.js
│
├── middlewares/
│   ├── auth.middleware.js
│   ├── role.middleware.js
│   └── error.middleware.js
│
├── modules/
│   ├── appointment/
│   ├── auth/
│   ├── doctor/
│   └── user/
│
├── routes/
│
├── utils/
│
├── app.js
└── server.js
```

---

# ⚙️ Environment Variables

Create a `.env` file in the root directory.

```env
MONGO_URI=your_mongodb_uri

PORT=5000

ACCESS_TOKEN_SECRET=accessSecretKey
ACCESS_TOKEN_EXPIRY=15m

REFRESH_TOKEN_SECRET=refreshSecretKey
REFRESH_TOKEN_EXPIRY=7d

COOKIE_SECRET=myCookieSecret

CORS_ORIGIN=*

REDIS_HOST=redis
REDIS_PORT=6379
```

---

# 📦 Installation

## Clone Repository

```bash
git clone https://github.com/chandrashekhar3337/Healthcare-Appointment-Booking-Backend.git
```

## Move into Project

```bash
cd Healthcare-Appointment-Booking-Backend
```

## Install Dependencies

```bash
npm install
```

---

# ▶️ Run Locally

```bash
npm run dev
```

Server runs on:

```bash
http://localhost:5000
```

---

# 🐳 Docker Setup

## Build Containers

```bash
docker compose up --build
```

## Run Containers

```bash
docker compose up
```

## Stop Containers

```bash
docker compose down
```

---

# ☁️ AWS EC2 Deployment

This project is deployed using:

- AWS EC2
- Docker
- Nginx
- GitHub Actions

---

# 🌐 Nginx Reverse Proxy

Nginx is configured to:

- Forward requests to backend
- Hide internal application port
- Improve security
- Handle external traffic

---

# 🔄 CI/CD Pipeline

Implemented using:

```bash
.github/workflows/ci-cd.yml
```

## Continuous Integration (CI)

Automatically performs:

- Dependency Installation
- ESLint Check
- Docker Build Validation

## Continuous Deployment (CD)

On every push to `main` branch:

- SSH into EC2
- Pull latest code
- Restart Docker containers
- Deploy latest version automatically

---

# 🔐 GitHub Secrets

| Secret | Description |
|---|---|
| EC2_HOST | AWS EC2 Public IP |
| EC2_USERNAME | Ubuntu |
| EC2_SSH_KEY | Private PEM Key |

---

# ⚡ Redis Caching

Redis caching implemented for:

```bash
GET /api/v1/doctor/available
```

## Benefits

- Faster Response
- Reduced Database Queries
- Better Scalability

---

# ⏰ Background Cron Job

Cron Job:

```bash
appointment.job.js
```

## Purpose

- Handle expired appointments
- Clean expired slot logic

Runs automatically inside the server.

---

# 📡 API Documentation

# 🔐 Authentication APIs

## Register User

### Endpoint

```bash
POST /api/v1/auth/register
```

### Body

```json
{
  "name": "Rahul",
  "email": "rahul@gmail.com",
  "password": "123456",
  "role": "patient"
}
```

---

## Login User

### Endpoint

```bash
POST /api/v1/auth/login
```

### Body

```json
{
  "email": "rahul@gmail.com",
  "password": "123456"
}
```

---

# 👨‍⚕️ Doctor APIs

## Create Slot

### Endpoint

```bash
POST /api/v1/doctor/slots
```

### Body

```json
{
  "startTime": "2026-05-15T09:10:00.000Z",
  "endTime": "2026-05-15T09:20:00.000Z"
}
```

---

## Update Slot

### Endpoint

```bash
PATCH /api/v1/doctor/slots/:slotId
```

---

## Delete Slot

### Endpoint

```bash
DELETE /api/v1/doctor/slots/:id
```

---

## Get Doctor Slots

### Endpoint

```bash
GET /api/v1/doctor/slots/:id
```

---

## Get Doctor Appointments

### Endpoint

```bash
GET /api/v1/doctor/appointments
```

---

# 🧑‍💻 Patient APIs

## Get All Doctors

### Endpoint

```bash
GET /api/v1/doctor/all
```

---

## Get Doctors with Available Slots

### Endpoint

```bash
GET /api/v1/doctor/available
```

---

## Get Specific Doctor Available Slots

### Endpoint

```bash
GET /api/v1/doctor/available/:doctorId
```

---

## Book Appointment

### Endpoint

```bash
POST /api/v1/appointment/book
```

### Body

```json
{
  "slotId": "slot_id_here"
}
```

---

# 🔥 Booking System Architecture

The booking system uses:

- MongoDB Transactions
- Atomic Updates
- Session-based Operations

Core Logic:

```js
findOneAndUpdate()
```

This ensures:

- ✅ One Slot = One Booking
- ✅ No Race Conditions
- ✅ Safe Concurrent Requests

---

# 🛡️ Security Features

- JWT Authentication
- Password Hashing
- Role-based Access Control
- Protected Routes
- Docker Isolation
- Nginx Reverse Proxy
- Rate Limiting

---

# 📈 Performance Optimizations

- Redis Cache Layer
- Aggregation Pipelines
- Lean Queries
- Efficient Slot Filtering
- Dockerized Runtime
- Optimized Mongo Queries

---

# 🧪 Future Improvements

- Swagger Documentation
- Unit & Integration Testing
- Email Notifications
- Payment Gateway
- WebSocket Notifications
- Kubernetes Deployment
- Load Balancer
- Auto Scaling

---

# 👨‍💻 Author

## Arun Kumar

### Backend & DevOps Engineer

### Skills

- Node.js
- MongoDB
- Redis
- Docker
- AWS
- CI/CD
- Express.js

---

# ⭐ Project Status

| Feature | Status |
|---|---|
| Authentication | ✅ |
| Doctor Slot System | ✅ |
| Appointment Booking | ✅ |
| Redis Integration | ✅ |
| Docker Setup | ✅ |
| AWS Deployment | ✅ |
| CI/CD Pipeline | ✅ |
| Production Ready | ✅ |

---

# 📜 License

This project is licensed under the MIT License.

---

# ⭐ Support

If you like this project, please give it a ⭐ on GitHub!
