# 🚀 Deployment Checklist

## ✅ Pre-Deployment Checklist

### Code Preparation
- [ ] All code is committed and pushed to GitHub
- [ ] Both backend and frontend build successfully
- [ ] Environment variables are properly configured
- [ ] Authentication issues are resolved
- [ ] Database connection is working

### Environment Setup
- [ ] MongoDB Atlas cluster is created and configured
- [ ] Database user has proper permissions
- [ ] Network access is configured (0.0.0.0/0 or specific IPs)
- [ ] Connection string is ready

### Render Account Setup
- [ ] Render account is created
- [ ] GitHub repository is accessible
- [ ] Payment method is added (if needed for paid plans)

## 🔧 Deployment Steps

### Step 1: Deploy Backend API
- [ ] Create new Web Service on Render
- [ ] Connect GitHub repository
- [ ] Set root directory to `backend-parlour-api`
- [ ] Configure build command: `npm install && npm run build`
- [ ] Configure start command: `npm start`
- [ ] Add environment variables:
  - [ ] `NODE_ENV=production`
  - [ ] `MONGO_URI=<your-mongodb-connection-string>`
  - [ ] `JWT_SECRET=<your-secure-jwt-secret>`
- [ ] Deploy and wait for completion
- [ ] Test health endpoint: `https://your-api-url.onrender.com/health`

### Step 2: Deploy Frontend Dashboard
- [ ] Create another Web Service on Render
- [ ] Connect same GitHub repository
- [ ] Set root directory to `frontend-parlour-dashboard`
- [ ] Configure build command: `npm install && npm run build`
- [ ] Configure start command: `npm start`
- [ ] Add environment variables:
  - [ ] `NODE_ENV=production`
  - [ ] `NEXT_PUBLIC_BACKEND_URL=<your-backend-api-url>`
- [ ] Deploy and wait for completion
- [ ] Test frontend access

### Step 3: Post-Deployment Configuration
- [ ] Create initial admin user using the script:
  ```bash
  node create-admin.js https://your-api-url.onrender.com
  ```
- [ ] Test admin login on frontend
- [ ] Verify all features work:
  - [ ] Employee management
  - [ ] Task assignment
  - [ ] Attendance tracking
  - [ ] Real-time notifications
  - [ ] Dashboard analytics

## 🧪 Testing Checklist

### Backend API Testing
- [ ] Health check endpoint responds
- [ ] Admin registration works
- [ ] Admin login works
- [ ] Employee CRUD operations work
- [ ] Task CRUD operations work
- [ ] Attendance endpoints work
- [ ] Real-time Socket.IO connections work

### Frontend Testing
- [ ] Application loads without errors
- [ ] Admin login works
- [ ] Employee login works
- [ ] All pages are accessible
- [ ] Real-time updates work
- [ ] Mobile responsiveness works

### Integration Testing
- [ ] Frontend can communicate with backend
- [ ] Authentication flow works end-to-end
- [ ] Real-time features work across both apps
- [ ] Database operations are successful

## 🔒 Security Checklist

- [ ] JWT secret is strong and unique
- [ ] Database credentials are secure
- [ ] CORS is configured for production domains only
- [ ] Environment variables are not exposed in client-side code
- [ ] HTTPS is enabled (automatic with Render)
- [ ] Register endpoint is secured or removed in production

## 📊 Monitoring Setup

- [ ] Check Render service logs for errors
- [ ] Monitor MongoDB Atlas metrics
- [ ] Set up alerts for service downtime
- [ ] Monitor application performance

## 🚨 Troubleshooting

### Common Issues and Solutions

#### Build Failures
- [ ] Check Node.js version compatibility
- [ ] Verify all dependencies are in package.json
- [ ] Check for TypeScript compilation errors
- [ ] Review build logs in Render dashboard

#### Database Connection Issues
- [ ] Verify MongoDB connection string format
- [ ] Check database user permissions
- [ ] Ensure IP whitelist includes Render IPs
- [ ] Test connection string locally

#### Authentication Problems
- [ ] Verify JWT_SECRET is set correctly
- [ ] Check token format in requests
- [ ] Ensure user exists in database
- [ ] Verify password hashing is working

#### CORS Issues
- [ ] Update backend CORS settings for production domain
- [ ] Check frontend API URL configuration
- [ ] Verify environment variables are loaded

## 📝 Post-Deployment Tasks

- [ ] Document production URLs
- [ ] Update README with live demo links
- [ ] Create user documentation
- [ ] Set up backup procedures
- [ ] Plan maintenance schedule

## 🎉 Go Live Checklist

- [ ] All tests pass
- [ ] Performance is acceptable
- [ ] Security measures are in place
- [ ] Monitoring is active
- [ ] Documentation is complete
- [ ] Team is trained on the system

---

## 📞 Support Contacts

- **Technical Issues**: Create GitHub issue
- **Render Support**: https://render.com/docs
- **MongoDB Support**: https://docs.atlas.mongodb.com/

## 🔄 Rollback Plan

If deployment fails:
1. Check service logs in Render dashboard
2. Revert to previous working commit
3. Redeploy with known good configuration
4. Contact support if issues persist

---

**Deployment Date**: ___________
**Deployed By**: ___________
**Production URLs**:
- Backend API: ___________
- Frontend Dashboard: ___________