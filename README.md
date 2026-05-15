🏥 Healthcare Appointment Booking Backend

A production-ready Healthcare Appointment Booking Backend built with Node.js, Express.js, MongoDB, Redis, Docker, AWS EC2, and GitHub Actions CI/CD.

This backend allows:

Patient & Doctor Authentication
Doctor Slot Management
Appointment Booking System
Real-time Slot Availability
Redis Caching
Background Cron Jobs
Dockerized Deployment
Automated CI/CD Pipeline
🚀 Tech Stack
Technology	Purpose
Node.js	Backend Runtime
Express.js	API Framework
MongoDB Atlas	Database
Mongoose	ODM
Redis	Caching
JWT	Authentication
Docker	Containerization
Docker Compose	Multi-container orchestration
GitHub Actions	CI/CD
AWS EC2	Cloud Deployment
Nginx	Reverse Proxy
Node Cron	Background Jobs
📁 Project Structure
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
│   ├── error.middleware.js
│   └── role.middleware.js
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
✨ Features
🔐 Authentication
JWT Access Token
Refresh Token
Role-based Authorization
Secure Cookie Support
👨‍⚕️ Doctor Features
Create Slots
Update Slots
Delete Slots
View Appointments
View Own Slots
🧑‍💻 Patient Features
Register/Login
View Available Doctors
View Doctor Available Slots
Book Appointment
⚡ Smart Slot Logic
Prevents:
Past Slot Creation
Overlapping Slots
Double Booking
Expired Slot Fetching
Booking Already Booked Slot
🧠 Real-Life Edge Cases Handled
Edge Case	Solution
Double booking	Atomic Mongo Transaction
Expired slot fetch	endTime >= new Date()
Overlapping slots	Validation Query
Booked slot delete	Prevented
Booked slot update	Prevented
Race condition	Mongo Transactions
Repeated API abuse	Rate Limiting
Heavy DB load	Redis Caching
⚡ Redis Caching

Implemented Redis caching for:

GET /api/v1/doctor/available
Benefits
Faster Response
Reduced Mongo Queries
Better Scalability
⏰ Cron Job

Automatic background cron job:

appointment.job.js
Purpose
Marks expired appointments
Cleans unavailable slots logic

Runs automatically in backend server.

🐳 Docker Setup
Dockerized Services
Backend Container
Redis Container
📦 Environment Variables

Create .env

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
▶️ Run Locally
Install Dependencies
npm install
Start Server
npm run dev
🐳 Run with Docker
Build Containers
docker compose up --build
Run Containers
docker compose up
Stop Containers
docker compose down
☁️ AWS EC2 Deployment

Backend deployed on:

AWS EC2
Docker
Nginx
GitHub Actions CI/CD
🔄 CI/CD Pipeline

Implemented using:

.github/workflows/ci-cd.yml
Continuous Integration (CI)

Automatically:

Install Dependencies
Run ESLint
Run Tests
Validate Docker Build
Continuous Deployment (CD)

On every push to main branch:

SSH into EC2
Pull latest code
Restart Docker containers
Deploy latest backend automatically
🔐 GitHub Secrets Used
Secret	Description
EC2_HOST	AWS Public IP
EC2_USERNAME	ubuntu
EC2_SSH_KEY	EC2 Private PEM Key
🌐 Nginx Reverse Proxy

Configured Nginx to:

Forward HTTP requests
Hide internal backend port
Improve security
📡 API Base URL
http://your-ip/api/v1
📌 Major APIs
🔐 Auth APIs
Register
POST /api/v1/auth/register
Body
{
  "name": "Rahul",
  "email": "rahul@gmail.com",
  "password": "123456",
  "role": "patient"
}
Login
POST /api/v1/auth/login
Body
{
  "email": "rahul@gmail.com",
  "password": "123456"
}
👨‍⚕️ Doctor APIs
Create Slot
POST /api/v1/doctor/slots
Body
{
  "startTime": "2026-05-15T09:10:00.000Z",
  "endTime": "2026-05-15T09:20:00.000Z"
}
Update Slot
PATCH /api/v1/doctor/slots/:slotId
Delete Slot
DELETE /api/v1/doctor/slots/:id
Get Doctor Slots
GET /api/v1/doctor/slots/:id
Get Doctor Appointments
GET /api/v1/doctor/appointments
🧑‍💻 Patient APIs
Get All Doctors
GET /api/v1/doctor/all
Get Doctors with Available Slots
GET /api/v1/doctor/available
Get Specific Doctor Available Slots
GET /api/v1/doctor/available/:doctorId
Book Appointment
POST /api/v1/appointment/book
Body
{
  "slotId": "slot_id_here"
}
🔥 Booking Logic

Uses MongoDB Transactions:

findOneAndUpdate()

to ensure:

One slot = One booking
No race conditions
Atomic updates
🛡️ Security Features
JWT Authentication
Password Hashing
Role-based Access
Protected Routes
Rate Limiting
Docker Isolation
Nginx Reverse Proxy
📈 Performance Optimizations
Redis Cache
Lean Mongo Queries
Aggregation Pipelines
Dockerized Runtime
Efficient Slot Filtering
🧪 Future Improvements
Swagger API Docs
Unit Testing
Email Notifications
Payment Integration
WebSockets
Kubernetes Deployment
Load Balancer
Auto Scaling
👨‍💻 Author
Chandrshekhar Kumar

Backend & DevOps Engineer

Node.js
MongoDB
Redis
Docker
AWS
CI/CD
⭐ Project Status

✅ Production Ready
✅ Dockerized
✅ Redis Integrated
✅ AWS Deployed
✅ CI/CD Automated
✅ Scalable Backend Architecture