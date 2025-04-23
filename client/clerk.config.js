// clerk.config.js
export default {
    oauth: {
      google: {
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        clientSecret: import.meta.env.VITE_GOOGLE_SECRET,
        scopes: ['email', 'https://www.googleapis.com/auth/gmail.readonly']
      }
    }
  }
  