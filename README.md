# MediTrack - Medicine Reminder App

**Hosted Frontend URL**: [Will be added after Vercel deployment]
**Hosted Backend URL**: https://meditrack-1-lud7.onrender.com

## Project Proposal

### Problem Statement
Many patients, especially the elderly or those managing multiple medications, struggle to remember when to take their medicines, leading to missed doses and health complications. "MediTrack" aims to simplify medication management by providing personalized reminders, schedules, and tracking features to help patients take the right medicine at the right time.

### Solution
A full-stack web application that helps patients manage their medication schedules with personalized reminders and tracking features.

### Features Implemented

#### Authentication & Authorization
- User registration, login, logout
- Role-based access (patient/admin)
- JWT-based authentication
- Password hashing with bcryptjs

#### CRUD Operations
- **Create**: Add new medicine reminders
- **Read**: View all reminders with pagination
- **Update**: Edit existing reminders
- **Delete**: Remove reminders

#### Advanced Features
- **Filtering**: Search medicines by name/date
- **Searching**: Real-time search functionality
- **Sorting**: Sort by date, name, schedule
- **Pagination**: Handle large datasets efficiently

#### Frontend Routing
- Home page
- Login/Register pages
- Dashboard for reminder management
- Add Reminder form
- User Profile page

#### Notifications
- Scheduled reminder system using node-cron
- Ready for email/push notifications

### Tech Stack

#### Frontend
- React.js with TypeScript
- React Router for navigation
- Axios for API calls
- TailwindCSS for styling
- Context API for state management

#### Backend
- Node.js with Express.js
- MongoDB Atlas (NoSQL database)
- JWT Authentication
- bcryptjs for password hashing
- node-cron for scheduled notifications

#### Deployment
- Frontend: Vercel (pending)
- Backend: Render
- Database: MongoDB Atlas

### API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

#### Reminders (CRUD)
- `GET /api/reminders` - Get all reminders (with pagination, search, sort)
- `POST /api/reminders` - Create new reminder
- `PUT /api/reminders/:id` - Update reminder
- `DELETE /api/reminders/:id` - Delete reminder

### Database Schema

#### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (patient/admin),
  timestamps: true
}
```

#### Reminder Model
```javascript
{
  userId: ObjectId (ref: User),
  medicineName: String,
  dosage: String,
  frequency: String,
  startDate: Date,
  endDate: Date,
  times: [String],
  notes: String,
  isActive: Boolean,
  timestamps: true
}
```

### Setup Instructions

#### Backend Setup
1. Navigate to backend directory: `cd meditrack-backend`
2. Install dependencies: `npm install`
3. Create `.env` file with MongoDB URI and JWT secret
4. Start server: `npm run dev`

#### Frontend Setup
1. Navigate to frontend directory: `cd meditrack-frontend`
2. Install dependencies: `npm install`
3. Create `.env` file with API URL
4. Start development server: `npm start`

### Testing
- Manual testing of all CRUD operations
- Authentication flow testing
- API endpoint testing with Postman
- Frontend-backend integration testing

### Future Enhancements
- Email notifications integration
- Push notifications
- Mobile app version
- Advanced analytics and reports
- Doctor/caregiver access

## License
This project is licensed under the MIT License.