# E-commerce Backend Server

This is the backend server for the e-commerce website.

## Setup Instructions

1. Install dependencies:
```bash
cd server
npm install
```

2. Make sure MongoDB is running on your system. You can:
   - Install MongoDB locally, or
   - Use MongoDB Atlas (cloud) and update the MONGODB_URI in `.env`

3. Create a `.env` file in the `server` directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
NODE_ENV=development
JWT_SECRET=your-secret-key-change-in-production
```

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user (creates 'user' role by default)
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current authenticated user (requires token)

### Products

- `GET /api/product/list` - Get all products (public)
- `GET /api/product/:id` - Get single product by ID (public)
- `POST /api/product/create` - Create new product (admin only)
- `PUT /api/product/:id` - Update product (admin only)
- `DELETE /api/product/:id` - Delete product (admin only)

### Users (Admin Only)

- `GET /api/user/list` - Get all users
- `GET /api/user/:id` - Get single user by ID
- `POST /api/user/create` - Create new user
- `PUT /api/user/:id` - Update user
- `DELETE /api/user/:id` - Delete user

### Health Check

- `GET /api/health` - Check if server is running

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <token>
```

**User Roles:**
- `user` - Regular customer (default for new registrations)
- `admin` - Store owner with dashboard access

**Sample Admin Credentials (after seeding):**
- Email: `admin@example.com`
- Password: `admin123`

## Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Run tests with coverage:
```bash
npm run test:coverage
```

### Test Coverage

The test suite includes:
- **Authentication Tests**: Valid/invalid login, registration, token validation
- **Role-Based Access Control**: Admin vs user permissions
- **Error Handling**: HTTP status codes, error messages, validation

See `__tests__/README.md` for detailed test documentation.

## Product Schema

```javascript
{
  name: String (required),
  price: Number (required),
  image: String (required),
  category: String (required, enum: ['men', 'women', 'kids']),
  subCategory: String (required, enum: ['topwear', 'bottomwear', 'winter']),
  bestseller: Boolean (default: false),
  description: String (required),
  sizes: [String] (required, at least one size)
}
```

