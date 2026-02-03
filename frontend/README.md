# Dream Homez Developer - Website

## Project Info

**Dream Homez Developer** - Premium residential plots in Phulwari Sharif, Patna

## About

This is a full-stack real estate website for Dream Homez Developer, featuring:
- Frontend: React + TypeScript + Vite + Tailwind CSS
- Backend: Node.js + Express + MongoDB
- Admin panel for managing plots, team members, testimonials, and stats
- User dashboard with wishlist functionality
- WhatsApp integration
- Cloudinary image upload
- JWT authentication with 30-day sessions

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- Framer Motion for animations

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Cloudinary for image storage
- Multer for file uploads

## Getting Started

### Prerequisites
- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- MongoDB Atlas account or local MongoDB
- Cloudinary account for image uploads

### Installation

1. Clone the repository:
```sh
git clone https://github.com/Modassir22/dream-home-hub.git
cd dream-home-hub
```

2. Install dependencies:
```sh
npm install
```

This will install dependencies for both frontend and backend.

### Running the Project

Start both frontend and backend servers:
```sh
npm start
```

This will run:
- Backend on `http://localhost:5000`
- Frontend on `http://localhost:8080`

### Environment Variables

#### Backend (.env)
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
FRONTEND_URL=http://localhost:8080

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

## Features

### User Features
- Browse available plots
- View plot details with image gallery
- Add plots to wishlist
- Track plot status (Interested → Contacted → Visiting → Negotiating → Purchased)
- Add personal notes for each plot
- WhatsApp integration for quick contact
- User authentication and registration

### Admin Features
- Manage plots (CRUD operations)
- Manage team members
- Manage testimonials
- Update contact information
- Update website statistics
- View all user wishlists
- Image upload with Cloudinary
- Protected admin routes

## Default Admin Credentials

- Username: `modassir`
- Password: `admin123`

## Project Structure

```
dream-home-hub/
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── lib/
│   └── index.html
└── package.json
```

## Deployment

### Backend Deployment
1. Set environment variables on your hosting platform
2. Update `FRONTEND_URL` to your production domain
3. Set `NODE_ENV=production`
4. Deploy to platforms like Heroku, Railway, or Render

### Frontend Deployment
1. Update `VITE_API_URL` to your backend URL
2. Build the project: `npm run build`
3. Deploy the `dist` folder to platforms like Vercel, Netlify, or Cloudflare Pages

## License

© 2024 Dream Homez Developer. All rights reserved.
