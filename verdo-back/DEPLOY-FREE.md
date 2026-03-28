## Free Deployment

This backend can be deployed for free on Render.

### Service settings

- Root directory: `verdo-back`
- Runtime: `Node`
- Build command: `npm install`
- Start command: `npm start`

### Required environment variables

- `MONGO_URI`
- `JWT_SECRET`
- `JWT_EXPIRE=30d`
- `JWT_COOKIE_EXPIRE=30`
- `NODE_ENV=production`
- `CLIENT_URL=https://your-frontend-domain.netlify.app`
- `CLIENT_URLS=https://your-frontend-domain.netlify.app`
- `FRONTEND_URL=https://your-frontend-domain.netlify.app`
- `GEOAI_API_URL=https://geoai-ahao.onrender.com/v1/site-analysis`

### Health check

- `/api/health`

### Notes

- MongoDB Atlas free tier works with this setup.
- GeoAI requests continue to run through your Express backend, just like localhost.
- The frontend auth token is sent in the `Authorization` header, so cross-domain login remains usable after deployment.
