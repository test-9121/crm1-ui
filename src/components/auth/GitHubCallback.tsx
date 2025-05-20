
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/modules/common/services/api';
import { jwtDecode } from 'jwt-decode';
import { CustomJwtPayload } from '@/types/auth';

export const GitHubCallback = () => {
  const { githubLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const handleCallback = async () => {
      const searchParams = new URLSearchParams(location.search);
      const token = searchParams.get('token');
      const code = searchParams.get('code');
      
      if (token) {
        // Direct token flow
        try {
          console.log("GitHub Callback: Token received");
          // Decode the token to extract user info
          const decodedToken = jwtDecode<CustomJwtPayload>(token);
          
          // Set token in axios headers for future requests
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Store token in localStorage
          localStorage.setItem('accessToken', token);
          
          // Store user data from decoded token
          if (decodedToken) {
            const userData = {
              email: decodedToken.sub,
              id: decodedToken.userId || decodedToken.sub,
              // Add other relevant user data from token
              user: {
                id: decodedToken.userId || decodedToken.sub,
                firstName: decodedToken.name || decodedToken.sub.split('@')[0],
                email: decodedToken.sub,
                role: {
                  rolePermission: decodedToken.roles || 'ROLE_USER'
                }
              }
            };
            localStorage.setItem('user', JSON.stringify(userData));
          }
          
          await githubLogin(token);
          toast({
            title: 'Success',
            description: 'Successfully signed in with GitHub',
          });
          navigate('/dashboard');
        } catch (error) {
          console.error('Error logging in with GitHub:', error);
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Failed to sign in with GitHub',
          });
          navigate('/login');
        }
      } else if (code) {
        // OAuth code flow - we need to use this code directly
        
        // For this flow, we'll assume the backend will handle the token exchange
        // and redirect to /oauth2/redirect with the token
        toast({
          title: 'Authenticating',
          description: 'Processing GitHub authentication...',
        });
        
        // We don't need to do anything here as the backend should redirect again with the token
        // This is just showing a message to the user
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'No authorization token or code found in the URL',
        });
        navigate('/login');
      }
    };

    handleCallback();
  }, [githubLogin, location.search, navigate, toast]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      <p className="ml-3">Authenticating with GitHub...</p>
    </div>
  );
};
