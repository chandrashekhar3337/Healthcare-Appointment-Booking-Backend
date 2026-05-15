Healthcare Appointment Booking Backend

A scalable and secure backend system for managing healthcare appointment bookings, built with modern backend technologies. This project provides APIs for patient registration, doctor management, appointment scheduling, authentication, and healthcare workflow management.

🚀 Features
🔐 JWT Authentication & Authorization
👨‍⚕️ Doctor Management
👤 Patient Registration & Profile Management
📅 Appointment Booking & Scheduling
❌ Appointment Cancellation
⏰ Slot Availability Management
📧 Email/Notification Support
🛡️ Secure REST APIs
🌐 MongoDB Database Integration
⚡ Scalable Node.js Backend Architecture
🛠️ Tech Stack
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT
ODM: Mongoose
Environment Management: dotenv
API Testing: Postman
📂 Project Structure
Healthcare-Appointment-Booking-Backend/
│
├── controllers/        # Business logic
├── models/             # Database schemas
├── routes/             # API routes
├── middleware/         # Authentication & error handling
├── config/             # Database configuration
├── utils/              # Utility functions
├── services/           # Service layer logic
├── .env                # Environment variables
├── package.json
└── server.js
⚙️ Installation
1️⃣ Clone the Repository
git clone https://github.com/chandrashekhar3337/Healthcare-Appointment-Booking-Backend.git
2️⃣ Navigate to Project Directory
cd Healthcare-Appointment-Booking-Backend
3️⃣ Install Dependencies
npm install
4️⃣ Configure Environment Variables

Create a .env file in the root directory.

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
5️⃣ Run the Server
Development Mode
npm run dev
Production Mode
npm start
📡 API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user
Doctors
Method	Endpoint	Description
GET	/api/doctors	Get all doctors
GET	/api/doctors/:id	Get doctor by ID
Appointments
Method	Endpoint	Description
POST	/api/appointments/book	Book appointment
GET	/api/appointments	Get appointments
DELETE	/api/appointments/:id	Cancel appointment
🔒 Authentication

Protected routes require JWT token in headers:

Authorization: Bearer your_token
🧪 Testing APIs

You can test APIs using:

Postman
Thunder Client
Insomnia
🌍 Future Improvements
💳 Online Payment Integration
📹 Video Consultation
📱 Mobile App Support
🔔 Real-time Notifications
📊 Admin Dashboard & Analytics
🤝 Contributing

Contributions are welcome!

Fork the repository
Create a new branch
Commit your changes
Push the branch
Open a Pull Request
📜 License

This project is licensed under the MIT License.

👨‍💻 Author

Developed by Arun
