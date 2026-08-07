# Visitor Pass Management System

A full-stack Visitor Pass Management System developed using the MERN Stack. The application helps organizations manage visitor registrations, approvals, employee management, visitor check-in/check-out, reports, and activity history with secure role-based authentication.

---

## Features

### Authentication
- JWT Authentication
- Secure Login
- Role-Based Access Control (Admin, Employee, Receptionist)

### Employee Management
- Add Employee
- Update Employee
- Delete Employee
- View Employees

### Visitor Management
- Register Visitor
- Approve Visitor
- Reject Visitor
- Cancel Visitor
- Check-In Visitor
- Check-Out Visitor

### Dashboard
- Total Employees
- Total Visitors
- Pending Visitors
- Approved Visitors
- Checked-In Visitors
- Checked-Out Visitors
- Rejected Visitors
- Cancelled Visitors

### Reports
- Visitor Reports
- Status-wise Reports
- Date-wise Reports

### History
- Visitor Activity History
- Action Logs

---

## Tech Stack

### Frontend
- React.js
- React Router DOM
- React Bootstrap
- Axios
- React Toastify
- Recharts

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
---

# Installation & Setup

## Clone the Repository

```bash
git clone https://github.com/your-username/visitor-pass-management.git
```

---

## Backend Setup

```bash
cd Backend
npm install
npm run dev
```

The backend server will start on:

```
http://localhost:5000
```

---

## Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

The frontend application will start on:

```
http://localhost:5173
```

---

## Prerequisites

Before running the project, make sure you have installed:

- Node.js (v18 or later)
- npm
- MongoDB Atlas Account
- Git
- VS Code (Recommended)
---

# Environment Variables

Create a `.env` file inside the **Backend** folder and add the following:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key
```

Example:

```env
PORT=5000

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/visitor_pass_management

JWT_SECRET=mySuperSecretKey123
```

---

Create a `.env` file inside the **Frontend** folder and add the following:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Important Notes

- Do **not** commit your real `.env` file to GitHub.
- Add `.env` to your `.gitignore`.
- Replace the MongoDB connection string with your own MongoDB Atlas URI.
- Replace the JWT secret with your own secure secret key.
---

# API Documentation

## Base URL

```
http://localhost:5000/api
```

---

## Authentication

### Login

**POST**

```
/auth/login
```

**Request Body**

```json
{
  "email": "admin@gmail.com",
  "password": "admin123"
}
```

---

### Register User

**POST**

```
/auth/register
```

---

## Employee APIs

### Get All Employees

**GET**

```
/employees
```

---

### Get Employee By ID

**GET**

```
/employees/:id
```

---

### Add Employee

**POST**

```
/employees
```

---

### Update Employee

**PUT**

```
/employees/:id
```

---

### Delete Employee

**DELETE**

```
/employees/:id
```

---

## Visitor APIs

### Get All Visitors

**GET**

```
/visitors
```

---

### Register Visitor

**POST**

```
/visitors
```

---

### Approve Visitor

**PUT**

```
/visitors/approve/:id
```

---

### Reject Visitor

**PUT**

```
/visitors/reject/:id
```

---

### Check-In Visitor

**PUT**

```
/visitors/checkin/:id
```

---

### Check-Out Visitor

**PUT**

```
/visitors/checkout/:id
```

---

### Cancel Visitor

**PUT**

```
/visitors/cancel/:id
```

---

## Dashboard API

### Get Dashboard Details

**GET**

```
/dashboard
```

---

## Reports API

### Get Visitor Reports

**GET**

```
/reports
```

---

## History API

### Get Visitor History

**GET**

```
/history
```
---

# Project Structure

```
visitor-pass-management/
│
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
│
└── README.md
```

---

# Future Enhancements

- Email Notifications for Visitor Approval
- QR Code Based Visitor Pass
- Visitor Photo Upload
- Visitor ID Proof Verification
- PDF Visitor Pass Generation
- Excel & PDF Report Export
- Visitor Analytics Dashboard
- Email & SMS Alerts
- Multi-Branch Management
- Dark Mode Support

---

# Author

**Name:** Ebinesh B

**Course:** Full Stack Development (MERN Stack)

**Project:** Visitor Pass Management System

---

# License

This project is developed for educational and assessment purposes.