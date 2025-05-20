
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/modules/common/services/api';
import { jwtDecode } from 'jwt-decode';
import { CustomJwtPayload } from '@/types/auth';

export const GoogleCallback = () => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      
      if (token) {
        try {
          console.log("Google Callback: Token received");
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
          
          await googleLogin(token);
          toast({
            title: 'Success',
            description: 'Successfully signed in with Google',
          });
          navigate('/dashboard');
        } catch (error) {
          console.error('Error logging in with Google:', error);
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Failed to sign in with Google',
          });
          navigate('/login');
        }
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'No access token found in the URL',
        });
        navigate('/login');
      }
    };

    handleCallback();
  }, [googleLogin, location.search, navigate, toast]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      <p className="ml-3">Authenticating with Google...</p>
    </div>
  );
};
