# Car Wiki - Comprehensive Automotive Platform

A full-stack web application dedicated to cars, providing detailed information about different automobile models, search functionality, user authentication, and an admin dashboard for managing car data.

## 🚀 Features

### User Features

- **Authentication System** - Sign up, login, and logout functionality
- **Car Browsing** - Browse and search for cars with advanced filtering
- **Search & Filters** - Find cars by name, manufacturer, type, country, price range, and year
- **Single Car Pages** - Detailed information for each vehicle including images and specifications
- **Wishlist** - Save favorite cars to a personal wishlist
- **User Profile** - Manage personal settings and preferences
- **Theme Support** - Switch between light and dark themes

### Admin Features

- **Car Management** - Add, edit, and delete car listings
- **Price Management** - Update car prices dynamically
- **Admin Dashboard** - Manage all application data

### Additional Features

- **Contact Form** - Collect user feedback and inquiries
- **Responsive Design** - Works on desktop and mobile devices
- **Modern UI** - Clean, professional interface with smooth animations

## 🛠️ Tech Stack

### Frontend

- **K-engine** - Custom TypeScript-based component framework (similar to React)
- **TypeScript** - Type-safe JavaScript
- **CSS3** - Modern styling with CSS variables and animations
- **HTML5** - Semantic markup

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type-safe backend code
- **JSON Files** - Local file-based data persistence (no database)
- **Cookie-based Authentication** - HttpOnly cookies for security

## 📁 Project Structure

```
it_final_project/
├── app/                          # Frontend application
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Page components
│   │   ├── K-engine/            # Custom component framework
│   │   ├── utils/               # Utility functions (auth, routing, etc.)
│   │   ├── styles/              # Global and component styles
│   │   └── App.ts               # Root component
│   ├── assets/                  # Images and media
│   ├── public/                  # Static files
│   └── package.json
│
├── backend/                      # Backend API server
│   ├── src/
│   │   ├── routes/              # API endpoints
│   │   ├── repositories/        # Data access layer (JSON files)
│   │   ├── lib/                 # Authentication and HTTP utilities
│   │   ├── types/               # TypeScript interfaces
│   │   ├── database.ts          # Database initialization
│   │   └── server.ts            # Express server setup
│   ├── data/                    # JSON data files
│   │   ├── users.json           # User accounts and profiles
│   │   ├── cars.json            # Car database
│   │   ├── sessions.json        # Active user sessions
│   │   └── feedback.json        # Contact form submissions
│   └── package.json
│
└── Docs/                        # Project documentation
    └── Requirements/            # Functional and system requirements
```

## ⚙️ Installation

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Build TypeScript:

```bash
npm run build
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd app
```

2. Install dependencies:

```bash
npm install
```

## 🏃 Running the Project

### Start the Backend

From the `backend/` directory:

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm run build
npm start
```

The backend API will be available at: **http://localhost:3000**

### Start the Frontend

From the `app/` directory:

```bash
# Development mode
npm run dev

# Production build
npm run build
```

The frontend will typically be available at: **http://localhost:5173** (or check console for the actual URL)

## 🔑 Default Credentials

When the backend starts for the first time, it automatically creates a default admin user:

- **Username:** `admin`
- **Password:** `admin`

⚠️ **Important:** Change these credentials in production!

## 📊 API Overview

The backend exposes RESTful JSON APIs with cookie-based authentication:

### Authentication Endpoints

- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Car Endpoints

- `GET /api/cars` - Get all cars
- `GET /api/cars/:id` - Get single car details
- `POST /api/cars` - Add new car (admin only)
- `PUT /api/cars/:id` - Update car (admin only)
- `DELETE /api/cars/:id` - Delete car (admin only)
- `GET /api/cars/search?...` - Search/filter cars

### User Endpoints

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/theme` - Update theme preference
- `POST /api/users/wishlist` - Add to wishlist
- `DELETE /api/users/wishlist/:carId` - Remove from wishlist

### Contact Endpoints

- `POST /api/contact` - Submit contact form

For detailed API documentation, see [backend/API.md](backend/API.md)

## 💾 Data Persistence

The application uses **JSON files** stored in `backend/data/`:

- **users.json** - User accounts with encrypted passwords
- **cars.json** - Complete car catalog
- **sessions.json** - Active user sessions
- **feedback.json** - Contact form submissions

All data persists automatically to these files on every change.

## 🎨 Styling

The project follows a modern, minimalist design system:

- **Typography** - Space Grotesk font, responsive scaling with CSS `clamp()`
- **Color Scheme** - Dark/light mode support with high contrast
- **Layout** - Responsive grid and flexbox layouts
- **Animations** - Smooth transitions and interactive hover effects

See [styling guide](/.github/copilot-instructions.md) for detailed design specifications.

## 📝 Development

### Project Structure Best Practices

- Components extend the `Component` class from K-engine
- State management using `setState()` and lifecycle methods
- Context API for shared state
- Type-safe interfaces for all data models

### File Organization

- **Components** - Reusable UI elements in `src/components/`
- **Pages** - Full page layouts in `src/pages/`
- **Utils** - Helper functions (routing, auth, storage, etc.)
- **Styles** - CSS modules organized by feature
- **Types** - TypeScript interfaces in `src/types/`

## 🚀 Building for Production

### Backend

```bash
cd backend
npm install
npm run build
npm start
```

### Frontend

```bash
cd app
npm install
npm run build
```

Serve the built frontend files and ensure the backend API is accessible.

## 📚 Additional Documentation

- [User Requirements](Docs/Requirements/1.%20user-requirements.md)
- [System Requirements](Docs/Requirements/2.%20system-requiremtnts.md)
- [Backend API Reference](backend/API.md)
- [K-engine Guide](app/src/K-engine/how%20to%20use%20it.md)

## 🤝 Contributing

1. Follow the existing code style and TypeScript types
2. Test changes on both frontend and backend
3. Update relevant documentation

## 📄 License

This project is part of an IT final project assignment.

---

**Happy coding!** 🎉
