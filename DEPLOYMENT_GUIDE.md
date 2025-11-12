# MediTrack Deployment Guide

This guide will walk you through deploying the MediTrack application to production.

## Prerequisites

1. GitHub account
2. MongoDB Atlas account
3. Vercel account (for frontend)
4. Render account (for backend)

## Step 1: Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/atlas
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "Shared" (free tier)
   - Select your preferred cloud provider and region
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and password (save these!)
   - Set privileges to "Read and write to any database"

4. **Configure Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm

5. **Get Connection String**
   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

## Step 2: Backend Deployment (Render)

1. **Push Code to GitHub**
   ```bash
   cd meditrack-backend
   git init
   git add .
   git commit -m "Initial backend commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/meditrack-backend.git
   git push -u origin main
   ```

2. **Deploy to Render**
   - Go to https://render.com and sign up
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository
   - Select the `meditrack-backend` repository
   - Configure the service:
     - **Name**: meditrack-backend
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`

3. **Add Environment Variables**
   - In Render dashboard, go to your service
   - Click "Environment" tab
   - Add these variables:
     ```
     NODE_ENV=production
     PORT=10000
     MONGODB_URI=your-mongodb-connection-string
     JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
     EMAIL_USER=your-email@gmail.com
     EMAIL_PASS=your-app-password
     ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your backend URL (e.g., https://meditrack-backend.onrender.com)

## Step 3: Frontend Deployment (Vercel)

1. **Update Frontend Environment**
   - Update `meditrack-frontend/.env`:
     ```
     REACT_APP_API_URL=https://your-backend-url.onrender.com/api
     ```

2. **Push Frontend to GitHub**
   ```bash
   cd meditrack-frontend
   git init
   git add .
   git commit -m "Initial frontend commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/meditrack-frontend.git
   git push -u origin main
   ```

3. **Deploy to Vercel**
   - Go to https://vercel.com and sign up
   - Click "New Project"
   - Import your `meditrack-frontend` repository
   - Configure:
     - **Framework Preset**: Create React App
     - **Root Directory**: ./
   - Add Environment Variable:
     ```
     REACT_APP_API_URL=https://your-backend-url.onrender.com/api
     ```
   - Click "Deploy"

## Step 4: Verification

### Test Backend
1. Visit your backend URL (e.g., https://meditrack-backend.onrender.com)
2. You should see: `{"message": "MediTrack API is running!"}`

### Test Frontend
1. Visit your frontend URL (e.g., https://meditrack-frontend.vercel.app)
2. You should see the MediTrack homepage

### Test Full Flow
1. **Registration Test**:
   - Go to your frontend URL
   - Click "Register"
   - Create a new account
   - Check MongoDB Atlas database for new user entry
   - Verify password is hashed

2. **Login Test**:
   - Login with the account you created
   - Copy the JWT token from browser developer tools
   - Go to https://jwt.io and paste the token
   - Verify the payload contains user information

3. **CRUD Test**:
   - Create a medicine reminder
   - View it in the dashboard
   - Update and delete reminders
   - Test search and pagination

## Step 5: Domain Configuration (Optional)

### Custom Domain for Frontend (Vercel)
1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### Custom Domain for Backend (Render)
1. In Render dashboard, go to your service
2. Click "Settings" → "Custom Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Environment Variables Summary

### Backend (.env)
```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/meditrack?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend CORS is configured for your frontend domain
   - Check that API URL in frontend matches backend URL

2. **Database Connection Issues**
   - Verify MongoDB connection string is correct
   - Ensure IP whitelist includes 0.0.0.0/0
   - Check database user permissions

3. **Build Failures**
   - Check all dependencies are in package.json
   - Verify Node.js version compatibility
   - Check for TypeScript errors

4. **Authentication Issues**
   - Verify JWT_SECRET is set in backend
   - Check token expiration settings
   - Ensure localStorage is working in browser

### Monitoring

1. **Backend Logs**: Check Render service logs for errors
2. **Frontend Errors**: Use browser developer tools
3. **Database**: Monitor MongoDB Atlas metrics
4. **Performance**: Use Vercel analytics and Render metrics

## Security Checklist

- [ ] All sensitive data in environment variables
- [ ] Strong JWT secret (at least 32 characters)
- [ ] HTTPS enabled on both frontend and backend
- [ ] Database user has minimal required permissions
- [ ] CORS configured for production domains only
- [ ] Input validation on all forms
- [ ] Password hashing implemented

## Post-Deployment

1. **Test all functionality** in production environment
2. **Monitor performance** and error rates
3. **Set up alerts** for downtime or errors
4. **Document** any production-specific configurations
5. **Plan backup strategy** for database

Your MediTrack application is now live and ready for users!