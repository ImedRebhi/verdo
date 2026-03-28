## Free Deployment

This frontend can be deployed for free on Netlify.

### Build settings

- Base directory: `verdo-front`
- Build command: `npm run build`
- Publish directory: `dist`

### Environment variable

- `VITE_API_URL=https://your-backend-service.onrender.com/api`

### Notes

- Keep SPA redirects enabled using the included `netlify.toml` and `_redirects`.
- After deployment, use the final Netlify URL in the backend `CLIENT_URL` and `CLIENT_URLS` environment variables.
