# OAuth Authentication Setup Guide

This guide will help you set up Google and GitHub OAuth authentication for your Crop Health Advisory platform.

## 🚀 Quick Setup

### 1. Google OAuth Setup

1. **Go to Google Cloud Console**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one

2. **Enable Google+ API**
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
   - Also enable "Google Identity Toolkit API"

3. **Create OAuth Credentials**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Select "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:3000/auth/callback` (development)
     - `https://yourdomain.com/auth/callback` (production)

4. **Copy Client ID**
   - Copy the "Client ID" value
   - Add it to your `.env` file as `REACT_APP_GOOGLE_CLIENT_ID`

### 2. GitHub OAuth Setup

1. **Go to GitHub Settings**
   - Visit [GitHub Developer Settings](https://github.com/settings/developers)
   - Go to "OAuth Apps" or click "Register new application"

2. **Register New OAuth App**
   - Application name: `Crop Health Advisory`
   - Homepage URL: `http://localhost:3000` (development)
   - Authorization callback URL: `http://localhost:3000/auth/callback`

3. **Copy Client ID**
   - Copy the "Client ID" value
   - Add it to your `.env` file as `REACT_APP_GITHUB_CLIENT_ID`

### 3. Environment Configuration

Create a `.env` file in your frontend directory:

```bash
# Backend API URL
REACT_APP_API_URL=http://localhost:5000

# OAuth Configuration
REACT_APP_GOOGLE_CLIENT_ID=your_actual_google_client_id
REACT_APP_GITHUB_CLIENT_ID=your_actual_github_client_id
REACT_APP_REDIRECT_URI=http://localhost:3000/auth/callback

# Optional: Enable debug mode
REACT_APP_DEBUG=true
```

## 🔧 Backend Setup

You'll need to implement the following backend endpoints:

### `/api/auth/oauth/callback` (POST)

```javascript
// Example implementation (Node.js/Express)
app.post('/api/auth/oauth/callback', async (req, res) => {
  const { code, provider, redirect_uri } = req.body;
  
  try {
    let userInfo;
    
    if (provider === 'google') {
      // Exchange code for access token
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          code,
          grant_type: 'authorization_code',
          redirect_uri
        })
      });
      
      const tokenData = await tokenResponse.json();
      
      // Get user info
      const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${tokenData.access_token}` }
      });
      
      userInfo = await userResponse.json();
    }
    
    else if (provider === 'github') {
      // Exchange code for access token
      const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
          redirect_uri
        })
      });
      
      const tokenData = await tokenResponse.json();
      
      // Get user info
      const userResponse = await fetch('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${tokenData.access_token}` }
      });
      
      userInfo = await userResponse.json();
      userInfo.email = userInfo.email || `${userInfo.login}@github.local`;
    }
    
    // Create or update user in your database
    const user = await findOrCreateUser({
      email: userInfo.email,
      name: userInfo.name || userInfo.login,
      avatar: userInfo.picture || userInfo.avatar_url,
      provider: provider,
      providerId: userInfo.id.toString()
    });
    
    // Generate JWT tokens
    const token = generateJWT(user);
    const refreshToken = generateRefreshToken(user);
    
    res.json({
      token,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar
      }
    });
    
  } catch (error) {
    console.error('OAuth callback error:', error);
    res.status(400).json({ error: 'Authentication failed' });
  }
});
```

### `/api/auth/refresh` (POST)

```javascript
app.post('/api/auth/refresh', async (req, res) => {
  const { refresh_token } = req.body;
  
  try {
    // Verify refresh token and get user
    const user = verifyRefreshToken(refresh_token);
    
    // Generate new access token
    const token = generateJWT(user);
    
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
});
```

## 🎯 Features Implemented

### ✅ Frontend Features
- **OAuth Buttons**: Google, GitHub, and Email sign-in options
- **Modern UI**: Glass morphism design with animations
- **Security**: State validation and CSRF protection
- **Error Handling**: Comprehensive error messages and fallbacks
- **Loading States**: Professional loading animations
- **Responsive Design**: Works on all devices

### ✅ Security Features
- **State Validation**: Prevents CSRF attacks
- **Token Storage**: Secure local storage with refresh tokens
- **Error Handling**: Graceful failure handling
- **Redirect Protection**: Validates OAuth state

### ✅ User Experience
- **One-Click Sign-In**: Quick authentication with Google/GitHub
- **Progressive Enhancement**: Falls back to email/password
- **Visual Feedback**: Loading states and success messages
- **Mobile Optimized**: Touch-friendly interface

## 🔄 Testing

1. **Start your frontend**: `npm start`
2. **Start your backend**: Make sure OAuth endpoints are implemented
3. **Test Google Sign-In**:
   - Click "Continue with Google"
   - Authenticate with Google account
   - Should redirect to dashboard

4. **Test GitHub Sign-In**:
   - Click "Continue with GitHub"
   - Authorize the application
   - Should redirect to dashboard

## 🚨 Important Notes

- **HTTPS Required**: OAuth providers require HTTPS in production
- **Domain Whitelisting**: Add your production domain to OAuth provider settings
- **Environment Variables**: Never commit `.env` files to version control
- **Security**: Always validate OAuth state and implement proper error handling

## 🎨 Customization

You can customize the OAuth buttons and styling in:
- `src/components/OAuthButtons.js` - Button components
- `src/pages/LoginPage.js` - Login page layout
- `src/pages/RegisterPage.js` - Register page layout

## 📞 Support

If you encounter any issues:
1. Check console for error messages
2. Verify environment variables are set correctly
3. Ensure redirect URIs match in OAuth provider settings
4. Make sure backend endpoints are implemented correctly
