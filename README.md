<div align="center">

# <span style="color:#1DB954;">Spotify Clone</span>

**Visit:** <a href="https://spotify-clone-5g33.vercel.app/" style="color:#1DB954;">https://spotify-clone-5g33.vercel.app/</a>  

A <b style="color:white;">full-stack music streaming web app</b> with user authentication, admin dashboard, real-time chat, and friend activity.

</div>

---

## <span style="color:#1DB954;">Features</span>
- Music streaming and playlists  
- **Admin:** manage albums and songs  
- Google sign-in (**Clerk**)  
- Real-time chat and activity (**Socket.io**)  

---

## <span style="color:#1DB954;">Tech Stack</span>
**Frontend:** <span style="color:#ccc;">React, Vite, Zustand, Clerk, TypeScript, Tailwind CSS</span>  
**Backend:** <span style="color:#ccc;">Node.js, Express, MongoDB, Socket.io, Cloudinary</span>  

---

## <span style="color:#1DB954;">Setup</span>
1. Clone the repo and install dependencies in both **`backend`** and **`frontend/spotify-clone`**.  
2. Set up environment variables (see **`.env.example`** files).  
3. Start backend → `npm start`  
   Start frontend → `npm run dev`  

---

## <span style="color:#1DB954;">Deployment</span>
- **Frontend:** Vercel  
- **Backend:** Render  
- **MongoDB:** Atlas  

---

### <span style="color:#1DB954;">Environment Variables</span>

#### **Backend** (`backend/.env`):
```env
PORT=3002
MONGODB_URL=your_mongodb_connection_string
ADMIN_EMAIL=your_admin_email
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

Frontend (frontend/spotify-clone/.env):

VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_CLERK_FRONTEND_API=your_clerk_frontend_api
VITE_CLERK_PROXY_URL=your_frontend_url
VITE_BACKEND_URL=https://your-backend-domain.com/api/v1
