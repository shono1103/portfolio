# Admin Panel Documentation

## Overview
The admin panel provides a user-friendly interface to manage portfolio content including jobs, projects, and skills.

## Access
- **URL**: `http://localhost:3000/admin/login`
- **Default Credentials**:
  - Username: `admin`
  - Password: `admin123` (change in production!)

## Features

### Dashboard (`/admin/dashboard`)
Displays statistics about your portfolio content:
- Number of job experiences
- Number of projects
- Number of skills

### Jobs Manager (`/admin/jobs`)
Manage job experiences:
- View all job experiences
- Create new job experience with:
  - Company name and URL
  - Position title
  - Duration
  - Location
  - List of achievements
- Edit existing job experiences
- Delete job experiences

### Projects Manager (`/admin/projects`)
Manage projects:
- View all projects
- Create new project with:
  - Title and description
  - Technologies (comma-separated)
  - Category and status
  - Year and company
  - Features (comma-separated)
  - Image URLs (comma-separated)
  - GitHub and live URLs
  - Privacy setting
- Edit existing projects
- Delete projects

### Skills Manager (`/admin/skills`)
Manage skills:
- View all skills
- Add new skills
- Delete skills

## Security Notes

### Authentication
- All admin operations require authentication
- Login provides a JWT token stored in browser's localStorage
- Token expires after 30 minutes (configurable)
- Logout clears the token from localStorage

### Protected Operations
The following operations require authentication:
- Creating, updating, or deleting jobs
- Creating, updating, or deleting projects
- Creating or deleting skills

Public operations (no authentication required):
- Viewing jobs, projects, and skills (GET requests)

## Configuration

### Backend API URL
The admin panel connects to the backend API at `http://localhost:8000` by default. To change this:

1. Update the API URL in each component:
   - `Login/index.js`
   - `Dashboard/index.js`
   - `JobsManager/index.js`
   - `ProjectsManager/index.js`
   - `SkillsManager/index.js`

2. Or create a configuration file to centralize API URL management.

### Environment Variables (Backend)
Set these in your backend `.env` file:

```env
# JWT Authentication
JWT_SECRET_KEY=your-secret-key-here
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-strong-password
```

## Development

### Running the Admin Panel
```bash
cd frontend
npm install
npm start
```

The admin panel will be available at `http://localhost:3000/admin/login`

### Building for Production
```bash
cd frontend
npm run build
```

## Troubleshooting

### Cannot Login
- Check that the backend API is running
- Verify credentials match the backend configuration
- Check browser console for error messages

### CORS Errors
- Ensure backend CORS settings allow your frontend origin
- Check that the backend is configured to accept POST, PUT, DELETE methods

### Token Expired
- Tokens expire after 30 minutes by default
- Simply login again to get a new token
- Consider implementing token refresh if needed

## Future Enhancements
- Token refresh mechanism
- Password change functionality
- User management (multiple admin users)
- File upload for images
- Rich text editor for descriptions
- Drag-and-drop reordering
- Bulk operations
- Search and filter capabilities
