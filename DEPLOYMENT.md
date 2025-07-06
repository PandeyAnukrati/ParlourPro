# Parlour Management System - Deployment Guide

## 🚀 Deployment Steps

### 1. Push Code to GitHub

1. Initialize git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit - ready for deployment"
```

2. Create a new repository on GitHub
3. Push your code:
```bash
git remote add origin https://github.com/yourusername/parlour-management-system.git
git branch -M main
git push -u origin main
```

### 2. Deploy Backend API on Render

1. **Go to [Render Dashboard](https://dashboard.render.com/)**
2. **Click "New +" → "Web Service"**
3. **Connect your GitHub repository**
4. **Configure the service:**
   - **Name**: `parlour-api`
   - **Root Directory**: `backend-parlour-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

5. **Set Environment Variables:**
   - `NODE_ENV` = `production`
   - `MONGO_URI` = `your_mongodb_connection_string`
   - `JWT_SECRET` = `your_super_secure_jwt_secret_key_here`
   - `PORT` = (will be set automatically by Render)

6. **Deploy** - Click "Create Web Service"

### 3. Deploy Frontend Dashboard on Render

1. **Create another Web Service**
2. **Configure:**
   - **Name**: `parlour-dashboard`
   - **Root Directory**: `frontend-parlour-dashboard`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

3. **Set Environment Variables:**
   - `NODE_ENV` = `production`
   - `NEXT_PUBLIC_BACKEND_URL` = `https://your-backend-url.onrender.com`
   - `PORT` = (will be set automatically by Render)

4. **Deploy** - Click "Create Web Service"

### 4. MongoDB Atlas Setup

1. **Go to [MongoDB Atlas](https://cloud.mongodb.com/)**
2. **Create a new cluster** (free tier)
3. **Create database user**
4. **Whitelist IP addresses** (0.0.0.0/0 for all IPs or specific Render IPs)
5. **Get connection string** and use it as `MONGO_URI`

### 5. Post-Deployment Steps

1. **Test the API endpoints**
2. **Create initial admin user** using the register endpoint
3. **Update frontend environment variables** with actual backend URL
4. **Test the complete application flow**

## 🔧 Environment Variables Summary

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/parlour?retryWrites=true&w=majority
JWT_SECRET=your_super_secure_jwt_secret_key_here
NODE_ENV=production
```

### Frontend (.env.local)
```
NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.onrender.com
NODE_ENV=production
```

## 🧪 Testing Deployment

### Test Backend API:
```bash
# Health check
curl https://your-backend-url.onrender.com/api/auth/register

# Register first admin user
curl -X POST https://your-backend-url.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@parlour.com",
    "password": "securepassword123",
    "role": "superadmin"
  }'
```

### Test Frontend:
- Visit your frontend URL
- Try logging in with the admin credentials
- Test all major features

## 🔒 Security Considerations

1. **Change default JWT secret** to a strong, random string
2. **Use environment variables** for all sensitive data
3. **Enable CORS** only for your frontend domain in production
4. **Use HTTPS** (Render provides this automatically)
5. **Regularly update dependencies**

## 📝 Troubleshooting

### Common Issues:

1. **Build Failures:**
   - Check Node.js version compatibility
   - Ensure all dependencies are in package.json
   - Check for TypeScript errors

2. **Database Connection:**
   - Verify MongoDB Atlas connection string
   - Check IP whitelist settings
   - Ensure database user has proper permissions

3. **CORS Issues:**
   - Update backend CORS settings for production domain
   - Check frontend API URL configuration

4. **Environment Variables:**
   - Ensure all required env vars are set in Render
   - Check for typos in variable names
   - Restart services after changing env vars

## 🔄 Continuous Deployment

Render automatically redeploys when you push to your main branch. To set up:

1. **Enable auto-deploy** in Render dashboard
2. **Set up branch protection** in GitHub
3. **Use staging environment** for testing before production

## 📊 Monitoring

1. **Check Render logs** for errors
2. **Monitor database usage** in MongoDB Atlas
3. **Set up alerts** for service downtime
4. **Use Render metrics** to track performance