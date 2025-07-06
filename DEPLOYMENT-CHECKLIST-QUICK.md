# ✅ Quick Deployment Checklist

## Before You Start
- [ ] MongoDB Atlas account ready
- [ ] GitHub account ready
- [ ] Render account ready

## 🗃️ Database Setup (5 minutes)
- [ ] Create MongoDB Atlas cluster (free tier)
- [ ] Create database user with password
- [ ] Allow access from anywhere (0.0.0.0/0)
- [ ] Copy connection string
- [ ] Replace `<password>` and set database name to `parlour`

## 📁 Code Repository (2 minutes)
- [ ] Initialize git: `git init`
- [ ] Add files: `git add .`
- [ ] Commit: `git commit -m "Initial deployment"`
- [ ] Create GitHub repository
- [ ] Push code: `git push -u origin main`

## 🚀 Render Deployment (10 minutes)
- [ ] Go to Render Dashboard
- [ ] New → Blueprint
- [ ] Connect your GitHub repository
- [ ] Apply (will detect render.yaml automatically)

## 🔧 Environment Variables
### Backend (parlour-api):
- [ ] `MONGO_URI` = your MongoDB connection string
- [ ] `JWT_SECRET` = random 64-character string
- [ ] `NODE_ENV` = production (auto-set)

### Frontend (parlour-dashboard):
- [ ] `NEXT_PUBLIC_BACKEND_URL` = your backend URL from Render
- [ ] `NODE_ENV` = production (auto-set)

## 🧪 Testing (5 minutes)
- [ ] Backend health check: `https://your-backend.onrender.com/health`
- [ ] Create admin user via API
- [ ] Frontend loads: `https://your-frontend.onrender.com`
- [ ] Login with admin credentials
- [ ] Test basic functionality

## 🎉 Done!
Your Parlour Management System is now live!

**Total Time: ~20-25 minutes**

---

## 🚨 Quick Troubleshooting
- **Build fails**: Check logs in Render dashboard
- **Database connection fails**: Verify MongoDB connection string and network access
- **Frontend can't reach backend**: Check `NEXT_PUBLIC_BACKEND_URL` environment variable
- **CORS errors**: Backend CORS is set to allow all origins (`*`)

## 📞 Need Help?
Check the detailed `STEP-BY-STEP-DEPLOYMENT.md` file for comprehensive instructions.