# CORS Configuration Guide

## Current Setup

The backend is configured with proper CORS (Cross-Origin Resource Sharing) settings to allow secure communication between frontend and backend.

## Configuration Details

### Backend (server.js)

**Allowed Origins:**
- `http://localhost:8080` (Vite default)
- `http://localhost:3000` (React default)
- `http://localhost:5173` (Vite alternative)
- `http://127.0.0.1:8080`
- `http://127.0.0.1:3000`
- `http://127.0.0.1:5173`
- Environment variable: `FRONTEND_URL`

**Allowed Methods:**
- GET
- POST
- PUT
- DELETE
- OPTIONS

**Allowed Headers:**
- Content-Type
- Authorization

**Credentials:** Enabled (allows cookies and authentication headers)

## Environment Variables

### Backend (.env)
```env
FRONTEND_URL=http://localhost:8080
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

## Development Mode

In development mode (`NODE_ENV=development`), all origins are allowed for easier testing.

## Production Deployment

When deploying to production:

1. **Update Backend .env:**
   ```env
   FRONTEND_URL=https://yourdomain.com
   NODE_ENV=production
   ```

2. **Update server.js allowed origins:**
   ```javascript
   const allowedOrigins = [
     process.env.FRONTEND_URL || 'http://localhost:8080',
     'https://yourdomain.com',
     'https://www.yourdomain.com'
   ];
   ```

3. **Update Frontend .env:**
   ```env
   VITE_API_URL=https://api.yourdomain.com
   ```

## Testing CORS

### Test if CORS is working:

1. **Start Backend:**
   ```bash
   cd backend
   npm start
   ```

2. **Start Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Check Browser Console:**
   - Open DevTools (F12)
   - Go to Console tab
   - Look for any CORS errors
   - Should see successful API calls

### Common CORS Errors:

**Error:** `Access to fetch at 'http://localhost:5000/api/...' from origin 'http://localhost:8080' has been blocked by CORS policy`

**Solution:** 
- Check if backend is running
- Verify `FRONTEND_URL` in backend `.env`
- Ensure origin is in `allowedOrigins` array

## Security Notes

1. **Never use `cors()` without options in production** - Always specify allowed origins
2. **Keep credentials enabled** - Required for JWT authentication
3. **Use HTTPS in production** - HTTP is only for development
4. **Whitelist specific origins** - Don't allow all origins in production

## Troubleshooting

### Issue: CORS error even with correct configuration

**Check:**
1. Backend server is running on port 5000
2. Frontend is running on port 8080
3. No typos in URLs
4. Browser cache cleared (Ctrl + Shift + Delete)

### Issue: Preflight OPTIONS request failing

**Solution:** 
- CORS middleware is already configured to handle OPTIONS requests
- Check if `optionsSuccessStatus: 200` is set

### Issue: Authentication headers not being sent

**Solution:**
- Ensure `credentials: true` in CORS options
- Frontend must include `credentials: 'include'` in fetch requests (if using cookies)

## Current Status

✅ CORS properly configured
✅ Development origins whitelisted
✅ Production-ready structure
✅ Environment variables support
✅ Credentials enabled for authentication
✅ All HTTP methods allowed
✅ Proper headers configured

## Next Steps for Production

1. Get production domain
2. Update `FRONTEND_URL` in backend `.env`
3. Update `VITE_API_URL` in frontend `.env`
4. Add production domain to `allowedOrigins`
5. Set `NODE_ENV=production`
6. Test thoroughly before deployment
