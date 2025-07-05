# Parlour Management System

A full-stack application for managing parlour operations including employee management, task assignment, attendance tracking, and real-time notifications.

## Project Structure

```
PARLOUR-PROJECT/
├── backend-parlour-api/          # Node.js/Express API server
├── frontend-parlour-dashboard/   # Next.js dashboard application
└── README.md                     # This file
```

## Features

- **Employee Management**: Add, edit, and manage employees and admins
- **Task Management**: Create and assign tasks to employees
- **Attendance Tracking**: Real-time punch in/out system
- **Dashboard Analytics**: View statistics and attendance graphs
- **Real-time Notifications**: Socket.io powered live updates
- **Authentication**: JWT-based auth for admins and employees

## Tech Stack

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- Socket.io for real-time features
- JWT for authentication
- bcryptjs for password hashing

### Frontend
- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- Socket.io Client
- Lucide React Icons

## Deployment on Render

### Prerequisites
1. GitHub account
2. Render account
3. MongoDB Atlas cluster

### Step 1: Prepare Your Repository

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/parlour-project.git
git push -u origin main
```

### Step 2: Deploy Backend API

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `parlour-api`
   - **Root Directory**: `backend-parlour-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

5. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string

6. Deploy the service

### Step 3: Deploy Frontend Dashboard

1. In Render Dashboard, click "New" → "Web Service"
2. Connect the same GitHub repository
3. Configure the service:
   - **Name**: `parlour-dashboard`
   - **Root Directory**: `frontend-parlour-dashboard`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

4. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `NEXT_PUBLIC_BACKEND_URL`: Your backend API URL (e.g., `https://parlour-api.onrender.com`)

5. Deploy the service

### Step 4: Configure MongoDB Atlas

1. Go to MongoDB Atlas
2. In Network Access, add `0.0.0.0/0` to allow connections from anywhere
3. Or add Render's IP ranges for better security

## Local Development

### Backend Setup
```bash
cd backend-parlour-api
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

### Frontend Setup
```bash
cd frontend-parlour-dashboard
npm install
cp .env.example .env.local
# Edit .env.local with your backend URL
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Register admin (development only)
- `POST /api/employee/login` - Employee login

### Employee Management
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Task Management
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Attendance
- `GET /api/attendance` - Get attendance logs
- `GET /api/attendance/state` - Get current punch state
- `POST /api/attendance/punch` - Punch in/out

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

### Notifications
- `GET /api/notifications` - Get notifications
- `POST /api/notifications/mark-read` - Mark all as read

## Default Credentials

After deployment, create an admin user using the register endpoint:

```json
{
  "name": "Admin User",
  "email": "admin@parlour.com",
  "password": "admin123",
  "role": "superadmin"
}
```

**Note**: Remove or secure the register endpoint in production.

## Support

For issues and questions, please create an issue in the GitHub repository.