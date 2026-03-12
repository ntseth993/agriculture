// OAuth Configuration
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI || `${window.location.origin}/auth/callback`;

// OAuth Scopes
const GOOGLE_SCOPES = 'openid email profile';
const GITHUB_SCOPES = 'user:email';

export const authService = {
  // Google OAuth
  initiateGoogleSignIn: () => {
    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authUrl.searchParams.append('client_id', GOOGLE_CLIENT_ID);
    authUrl.searchParams.append('redirect_uri', REDIRECT_URI);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('scope', GOOGLE_SCOPES);
    authUrl.searchParams.append('access_type', 'offline');
    authUrl.searchParams.append('prompt', 'consent');
    authUrl.searchParams.append('state', generateState());
    
    window.location.href = authUrl.toString();
  },

  // GitHub OAuth
  initiateGitHubSignIn: () => {
    const authUrl = new URL('https://github.com/login/oauth/authorize');
    authUrl.searchParams.append('client_id', GITHUB_CLIENT_ID);
    authUrl.searchParams.append('redirect_uri', REDIRECT_URI);
    authUrl.searchParams.append('scope', GITHUB_SCOPES);
    authUrl.searchParams.append('state', generateState());
    
    window.location.href = authUrl.toString();
  },

  // Handle OAuth callback
  handleOAuthCallback: async (code, provider) => {
    try {
      const response = await fetch('/api/auth/oauth/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          provider,
          redirect_uri: REDIRECT_URI,
        }),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const data = await response.json();
      
      // Store tokens
      localStorage.setItem('token', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      return data;
    } catch (error) {
      console.error('OAuth callback error:', error);
      throw error;
    }
  },

  // Get current user
  getCurrentUser: () => {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token');
      }

      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      
      return data.token;
    } catch (error) {
      console.error('Token refresh error:', error);
      authService.logout();
      throw error;
    }
  },
};

// Generate random state for OAuth
function generateState() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

// Store state in session storage
export const storeOAuthState = (state) => {
  sessionStorage.setItem('oauth_state', state);
};

// Verify OAuth state
export const verifyOAuthState = (state) => {
  const storedState = sessionStorage.getItem('oauth_state');
  sessionStorage.removeItem('oauth_state');
  return storedState === state;
};
