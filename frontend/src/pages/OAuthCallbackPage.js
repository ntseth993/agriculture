import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, verifyOAuthState } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export const OAuthCallbackPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        const error = urlParams.get('error');

        if (error) {
          throw new Error(error === 'access_denied' ? 'Access denied by user' : 'OAuth authentication failed');
        }

        if (!code || !state) {
          throw new Error('Missing required OAuth parameters');
        }

        // Verify state to prevent CSRF attacks
        if (!verifyOAuthState(state)) {
          throw new Error('Invalid OAuth state. Security validation failed.');
        }

        // Determine provider from URL or context
        const provider = window.location.pathname.includes('github') ? 'github' : 'google';

        // Handle OAuth callback
        const data = await authService.handleOAuthCallback(code, provider);

        // Update auth context
        await login(data.user.email, 'oauth-token', true);

        toast.success(`Successfully signed in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}!`);
        navigate('/dashboard');

      } catch (error) {
        console.error('OAuth callback error:', error);
        setError(error.message || 'Authentication failed');
        toast.error(error.message || 'Authentication failed');
        
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } finally {
        setLoading(false);
      }
    };

    handleOAuthCallback();
  }, [navigate, login]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Completing Sign In...</h2>
          <p className="text-white/80">Please wait while we authenticate your account</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md mx-auto text-center border border-white/20">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Authentication Failed</h2>
          <p className="text-white/80 mb-4">{error}</p>
          <p className="text-white/60 text-sm">Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  return null;
};
