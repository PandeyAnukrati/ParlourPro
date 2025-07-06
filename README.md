<<<<<<< HEAD
# Parlour Admin Dashboard (Frontend)

This is the frontend for the Parlour Admin Dashboard, built with Next.js 15, TypeScript, TailwindCSS, and ShadCN UI.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Features
- Role-based dashboard for Super Admin and Admin
- Employee, Task, and Attendance management
- Real-time updates via WebSocket

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# 💄 Parlour Management System

A comprehensive full-stack web application for managing parlour operations, including employee management, task assignment, attendance tracking, and real-time notifications.

## 🌟 Features

### Admin Dashboard
- **Employee Management**: Add, edit, and manage employee profiles
- **Task Assignment**: Create and assign tasks to employees
- **Attendance Tracking**: Monitor employee attendance with punch in/out
- **Real-time Notifications**: Live updates for all activities
- **Dashboard Analytics**: Overview of parlour operations

### Employee Portal
- **Personal Dashboard**: View assigned tasks and profile
- **Task Management**: Update task status and progress
- **Attendance System**: Clock in/out functionality
- **Profile Management**: Update personal information

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express.js**
- **TypeScript** for type safety
- **MongoDB** with **Mongoose** ODM
- **JWT** for authentication
- **Socket.IO** for real-time communication
- **bcryptjs** for password hashing

### Frontend
- **Next.js 15** with **React 19**
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Socket.IO Client** for real-time updates
- **Lucide React** for icons

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Local Development

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd parlour-management-system
```

2. **Setup Backend**
```bash
cd backend-parlour-api
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

3. **Setup Frontend**
```bash
cd ../frontend-parlour-dashboard
npm install
cp .env.example .env.local
# Edit .env.local with your backend URL
npm run dev
```

4. **Create Admin User**
```bash
# After backend is running
node create-admin.js http://localhost:5000
```

## 🌐 Deployment

### Automated Deployment
Run the deployment preparation script:
```bash
.\deploy.ps1
```

### Manual Deployment
See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Environment Variables

#### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/parlour
JWT_SECRET=your_super_secure_jwt_secret_key
NODE_ENV=production
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.onrender.com
```

## 📁 Project Structure

```
parlour-management-system/
├── backend-parlour-api/          # Backend API
│   ├── src/
│   │   ├── controllers/          # Route controllers
│   │   ├── middleware/           # Auth & other middleware
│   │   ├── models/              # MongoDB models
│   │   ├── routes/              # API routes
│   │   ├── utils/               # Utility functions
│   │   └── index.ts             # Server entry point
│   ├── .env.example
│   ├── render.yaml              # Render deployment config
│   └── package.json
├── frontend-parlour-dashboard/   # Frontend Dashboard
│   ├── src/
│   │   ├── app/                 # Next.js app directory
│   │   ├── components/          # React components
│   │   ├── context/             # React context
│   │   ├── lib/                 # Utility libraries
│   │   └── utils/               # Utility functions
│   ├── .env.example
│   ├── render.yaml              # Render deployment config
│   └── package.json
├── DEPLOYMENT.md                # Deployment guide
├── create-admin.js              # Admin user creation script
├── deploy.ps1                   # Deployment preparation script
└── README.md
```

## 🔐 Authentication & Authorization

### User Roles
- **Super Admin**: Full system access
- **Admin**: Parlour management access
- **Employee**: Limited access to personal dashboard

### API Authentication
All protected routes require JWT token in Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

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
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance` - Record attendance

## 🔄 Real-time Features

The application uses Socket.IO for real-time updates:
- **Attendance Updates**: Live attendance status
- **Task Notifications**: Real-time task assignments
- **System Notifications**: General system alerts

## 🧪 Testing

### Backend Testing
```bash
cd backend-parlour-api
npm test
```

### Frontend Testing
```bash
cd frontend-parlour-dashboard
npm test
```

## 🐛 Troubleshooting

### Common Issues

1. **Authentication Issues**
   - Check JWT_SECRET configuration
   - Verify token format (Bearer <token>)
   - Ensure user exists in database

2. **Database Connection**
   - Verify MongoDB URI
   - Check network connectivity
   - Ensure database user permissions

3. **CORS Issues**
   - Update CORS settings for production
   - Check frontend API URL configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 👥 Support

For support and questions:
- Create an issue in the repository
- Contact the development team

## 🔄 Version History

- **v1.0.0** - Initial release with core features
  - Employee management
  - Task assignment
  - Attendance tracking
  - Real-time notifications

---

Made with ❤️ for efficient parlour management                     # This file
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
>>>>>>> 3203e4134f066e5d82ea3cfa4175c1e88a968042
