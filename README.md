# MediTrack - Medicine Reminder App

A full-stack web application that helps patients manage their medication schedules with personalized reminders and tracking features.

## Features

- **Authentication & Authorization**: User registration, login, logout, and role-based access (patient/admin)
- **CRUD Operations**: Add, update, delete, and view medicine reminders
- **Filtering, Searching, Sorting, Pagination**: Search medicines by name/date, filter by time, sort by schedule
- **Frontend Routing**: Pages for Home, Login, Dashboard, Add Reminder, Profile
- **Notifications**: Reminders via on-screen alerts (email notifications ready for production)
- **Responsive Design**: Mobile-friendly interface with TailwindCSS

## Tech Stack

### Frontend
- React.js with TypeScript
- React Router for navigation
- Axios for API calls
- TailwindCSS for styling
- Context API for state management

### Backend
- Node.js with Express.js
- MongoDB Atlas (NoSQL database)
- JWT Authentication
- bcryptjs for password hashing
- node-cron for scheduled notifications

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Project Structure

```
meditrack/
├── meditrack-frontend/          # React frontend
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   ├── pages/             # Page components
│   │   ├── context/           # React context
│   │   └── utils/             # API utilities
│   └── public/
└── meditrack-backend/          # Node.js backend
    ├── models/                # MongoDB models
    ├── routes/                # API routes
    ├── middleware/            # Custom middleware
    └── server.js              # Main server file
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd meditrack-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file with your configurations:
   ```
   PORT=5000
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret-key
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd meditrack-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Deployment

### Backend Deployment (Render)

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables in Render dashboard

### Frontend Deployment (Vercel)

1. Connect your GitHub repository to Vercel
2. Set framework preset to "Create React App"
3. Add environment variable: `REACT_APP_API_URL=your-backend-url`
4. Deploy

### Database Setup (MongoDB Atlas)

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Create a database user
4. Get connection string and add to backend `.env`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Reminders
- `GET /api/reminders` - Get all reminders (with pagination, search, sort)
- `POST /api/reminders` - Create new reminder
- `PUT /api/reminders/:id` - Update reminder
- `DELETE /api/reminders/:id` - Delete reminder

## Features Implementation

### Authentication
- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes on frontend
- Role-based access control

### CRUD Operations
- Full CRUD for medicine reminders
- Form validation
- Error handling

### Search & Filter
- Real-time search by medicine name
- Sorting by date, name, schedule
- Pagination for large datasets

### Notifications
- Scheduled notifications using node-cron
- Ready for email integration
- On-screen alerts (can be extended)

## Testing

### Manual Testing Checklist

1. **Registration**: Create new account with hashed password in database
2. **Login**: Verify JWT token generation and validation
3. **CRUD Operations**: Test all reminder operations
4. **Search/Filter**: Test search and sorting functionality
5. **Responsive Design**: Test on different screen sizes
6. **Authentication Flow**: Test protected routes and logout

## Production Considerations

1. **Environment Variables**: Ensure all sensitive data is in environment variables
2. **CORS**: Configure CORS for production domains
3. **Database**: Use MongoDB Atlas production cluster
4. **SSL**: Enable HTTPS for production
5. **Error Logging**: Implement proper error logging
6. **Rate Limiting**: Add rate limiting for API endpoints

## Future Enhancements

- Email notifications integration
- Push notifications
- Medicine inventory tracking
- Doctor/caregiver access
- Mobile app version
- Advanced analytics and reports

## License

This project is licensed under the MIT License.