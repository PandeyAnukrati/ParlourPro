# 🚀 Step-by-Step Deployment Guide for Parlour Management System

## 📋 Overview
This guide will deploy both your backend API and frontend dashboard using a single root-level `render.yaml` configuration file. This approach is perfect for monorepo structures like yours.

## 🔧 Pre-Deployment Setup

### Step 1: Verify Project Structure
Your project should look like this:
```
PARLOUR-PROJECT/
├── render.yaml                    # ✅ Root-level config (already created)
├── backend-parlour-api/
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
├── frontend-parlour-dashboard/
│   ├── src/
│   ├── package.json
│   └── next.config.ts
└── README.md
```

### Step 2: Test Local Builds (Optional but Recommended)

#### Test Backend Build:
```powershell
cd "c:/Users/ASUS/OneDrive/Desktop/PARLOUR-PROJECT/backend-parlour-api"
npm install
npm run build
npm start
```

#### Test Frontend Build:
```powershell
cd "c:/Users/ASUS/OneDrive/Desktop/PARLOUR-PROJECT/frontend-parlour-dashboard"
npm install
npm run build
npm start
```

## 🌐 MongoDB Atlas Setup (Required First)

### Step 3: Create MongoDB Database

1. **Go to [MongoDB Atlas](https://cloud.mongodb.com/)**
2. **Sign up/Login** to your account
3. **Create a New Project**:
   - Click "New Project"
   - Name it "Parlour Management"
   - Click "Create Project"

4. **Create a Cluster**:
   - Click "Create a Deployment"
   - Choose "M0 Sandbox" (Free tier)
   - Select your preferred region
   - Name your cluster "parlour-cluster"
   - Click "Create Deployment"

5. **Create Database User**:
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `parlour-admin`
   - Password: Generate a secure password (save this!)
   - Database User Privileges: "Atlas admin"
   - Click "Add User"

6. **Configure Network Access**:
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

7. **Get Connection String**:
   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Replace `<dbname>` with `parlour`
   - Save this connection string!

**Example Connection String:**
```
mongodb+srv://parlour-admin:YOUR_PASSWORD@parlour-cluster.xxxxx.mongodb.net/parlour?retryWrites=true&w=majority
```

## 📁 GitHub Repository Setup

### Step 4: Initialize Git Repository

```powershell
# Navigate to your project root
cd "c:/Users/ASUS/OneDrive/Desktop/PARLOUR-PROJECT"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Parlour Management System ready for deployment"
```

### Step 5: Create GitHub Repository

1. **Go to [GitHub](https://github.com)**
2. **Click the "+" icon** → "New repository"
3. **Repository name**: `parlour-management-system`
4. **Description**: `Full-stack parlour management system with employee tracking`
5. **Set to Public** (or Private if you prefer)
6. **Don't initialize** with README, .gitignore, or license (we already have files)
7. **Click "Create repository"**

### Step 6: Push to GitHub

```powershell
# Add remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/parlour-management-system.git

# Set main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

## 🚀 Render Deployment

### Step 7: Deploy on Render

1. **Go to [Render Dashboard](https://dashboard.render.com/)**
2. **Sign up/Login** with your GitHub account
3. **Click "New +" → "Blueprint"**
4. **Connect Repository**:
   - Click "Connect GitHub"
   - Authorize Render to access your repositories
   - Select your `parlour-management-system` repository
   - Click "Connect"

5. **Configure Blueprint**:
   - Render will automatically detect your `render.yaml` file
   - You'll see both services listed:
     - `parlour-api` (Backend)
     - `parlour-dashboard` (Frontend)
   - Click "Apply"

### Step 8: Configure Environment Variables

#### For Backend Service (`parlour-api`):

1. **Go to your `parlour-api` service** in Render dashboard
2. **Click "Environment"** in the left sidebar
3. **Add these environment variables**:

| Key | Value | Notes |
|-----|-------|-------|
| `NODE_ENV` | `production` | Already set in render.yaml |
| `MONGO_URI` | `your_mongodb_connection_string` | From Step 3 |
| `JWT_SECRET` | `your_super_secure_jwt_secret_here` | Generate a random 64-character string |
| `PORT` | Auto-assigned | Render sets this automatically |

**To generate JWT_SECRET**, use this command:
```powershell
# Generate a random JWT secret
[System.Web.Security.Membership]::GeneratePassword(64, 0)
```

#### For Frontend Service (`parlour-dashboard`):

1. **Go to your `parlour-dashboard` service** in Render dashboard
2. **Click "Environment"** in the left sidebar
3. **Add this environment variable**:

| Key | Value | Notes |
|-----|-------|-------|
| `NODE_ENV` | `production` | Already set in render.yaml |
| `NEXT_PUBLIC_BACKEND_URL` | `https://parlour-api.onrender.com` | Replace with your actual backend URL |
| `PORT` | Auto-assigned | Render sets this automatically |

**Note**: You'll get the actual backend URL after the backend service deploys.

### Step 9: Deploy Services

1. **Backend will deploy first** (usually takes 5-10 minutes)
2. **Frontend will deploy after** (usually takes 3-5 minutes)
3. **Monitor the logs** for any errors

#### If Backend Deployment Fails:
- Check the "Logs" tab for error messages
- Common issues:
  - Missing environment variables
  - MongoDB connection issues
  - Build errors

#### If Frontend Deployment Fails:
- Check if `NEXT_PUBLIC_BACKEND_URL` is set correctly
- Verify the backend is deployed and accessible

### Step 10: Update Frontend Environment Variable

1. **Once backend is deployed**, copy its URL (e.g., `https://parlour-api-xxxx.onrender.com`)
2. **Go to frontend service** → "Environment"
3. **Update `NEXT_PUBLIC_BACKEND_URL`** with the actual backend URL
4. **Redeploy frontend** (it will automatically redeploy when you change env vars)

## 🧪 Testing Your Deployment

### Step 11: Test Backend API

```powershell
# Test health endpoint (replace with your actual URL)
curl https://your-backend-url.onrender.com/health

# Expected response:
# {"status":"OK","timestamp":"2024-01-01T00:00:00.000Z","environment":"production"}
```

### Step 12: Create First Admin User

```powershell
# Register first admin user (replace URL with your actual backend URL)
curl -X POST https://your-backend-url.onrender.com/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{
    "name": "Admin User",
    "email": "admin@parlour.com",
    "password": "SecurePassword123!",
    "role": "superadmin"
  }'
```

### Step 13: Test Frontend Application

1. **Visit your frontend URL** (e.g., `https://parlour-dashboard-xxxx.onrender.com`)
2. **Try logging in** with the admin credentials you just created
3. **Test key features**:
   - Dashboard loads
   - Employee management
   - Task management
   - Attendance tracking

## 🔧 Post-Deployment Configuration

### Step 14: Configure Auto-Deploy

1. **In Render dashboard**, go to each service
2. **Click "Settings"** → "Build & Deploy"
3. **Ensure "Auto-Deploy"** is enabled
4. **Set branch** to `main`

Now, every time you push to your `main` branch, both services will automatically redeploy!

### Step 15: Set Up Custom Domains (Optional)

1. **In Render dashboard**, go to each service
2. **Click "Settings"** → "Custom Domains"
3. **Add your custom domain** (if you have one)
4. **Follow Render's DNS configuration** instructions

## 📊 Monitoring and Maintenance

### Step 16: Monitor Your Services

1. **Check service status** regularly in Render dashboard
2. **Monitor logs** for errors
3. **Set up alerts** in Render for service downtime
4. **Monitor MongoDB usage** in Atlas dashboard

### Step 17: Backup Strategy

1. **Enable MongoDB backups** in Atlas
2. **Keep your environment variables** backed up securely
3. **Tag important commits** in GitHub for easy rollback

## 🚨 Troubleshooting Common Issues

### Backend Issues:
- **Build fails**: Check TypeScript errors in logs
- **Database connection fails**: Verify MONGO_URI and network access
- **Service won't start**: Check PORT configuration and start command

### Frontend Issues:
- **Build fails**: Check Next.js configuration and dependencies
- **API calls fail**: Verify NEXT_PUBLIC_BACKEND_URL is correct
- **CORS errors**: Check backend CORS configuration

### General Issues:
- **Services won't deploy**: Check render.yaml syntax
- **Environment variables**: Ensure all required vars are set
- **Memory issues**: Consider upgrading to paid plan if needed

## 🎉 Success Checklist

- [ ] MongoDB Atlas cluster created and configured
- [ ] GitHub repository created and code pushed
- [ ] Render services deployed successfully
- [ ] Environment variables configured
- [ ] Backend health check passes
- [ ] First admin user created
- [ ] Frontend loads and connects to backend
- [ ] Auto-deploy configured
- [ ] Services are monitored

## 📞 Support

If you encounter issues:
1. Check the logs in Render dashboard
2. Verify all environment variables are set correctly
3. Test API endpoints individually
4. Check MongoDB Atlas connection and permissions

Your Parlour Management System should now be live and accessible to users worldwide! 🌍