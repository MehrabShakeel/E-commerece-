# E-commerce Website

A full-stack e-commerce website with React frontend and Node.js/Express backend.

## Features

- Product browsing and filtering
- Shopping cart functionality
- Product detail pages
- Admin dashboard for product CRUD operations
- Responsive design

## Setup Instructions

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```
VITE_BACKEND_URL=http://localhost:5000
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or the port Vite assigns)

### Backend Setup

See `server/README.md` for detailed backend setup instructions.

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Make sure MongoDB is running

4. Create a `.env` file in the `server` directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
NODE_ENV=development
```

5. Start the backend server:
```bash
npm start
```

## Accessing the Dashboard

Once both servers are running, you can access the admin dashboard at:
```
http://localhost:5173/dashboard
```

The dashboard allows you to:
- View all products
- Create new products
- Edit existing products
- Delete products

## Project Structure

```
├── src/                 # Frontend React application
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   │   └── Dashboard.jsx  # Admin dashboard
│   ├── context/        # React context providers
│   └── assets/         # Static assets
├── server/             # Backend server
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── config/         # Configuration files
│   └── server.js       # Server entry point
└── package.json        # Frontend dependencies
```

## Notes

- The frontend layout has not been modified as requested
- The backend provides RESTful API endpoints for product management
- MongoDB is used as the database
- The dashboard is accessible at `/dashboard` route
