
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '@/lib/api';
import { jwtDecode } from 'jwt-decode';
import { RolePermission } from '@/modules/roles/types';
import { Role, User } from '@/modules/users/types';
import { toast } from 'sonner';


// Define auth context state
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  requires2FA: boolean;
  login: (email: string, password: string) => Promise<void>;
  googleLogin: (token: string) => Promise<void>;
  githubLogin: (code: string) => Promise<void>;
  verify2FA: (code: string) => Promise<void>;
  logout: () => void;
  cancelAuth: () => void;
  error: string | null;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth context provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [requires2FA, setRequires2FA] = useState<boolean>(false);
  const [tempAuthData, setTempAuthData] = useState<any>(null);
  const navigate = useNavigate();

  // Check if user is already logged in on initial load
  useEffect(() => {
    const initAuth = () => {
      const storedToken = localStorage.getItem('accessToken');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken && storedUser) {
        try {
          // Validate token (check expiration)
          const decodedToken = jwtDecode(storedToken) as any;
          const currentTime = Date.now() / 1000;
          
          if (decodedToken.exp && decodedToken.exp < currentTime) {
            // Token expired
            authApi.logout();
            setUser(null);
          } else {
            // Token valid
            setUser(JSON.parse(storedUser));
          }
        } catch (error) {
          // Invalid token
          authApi.logout();
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  // Login method
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authApi.login(email, password);
      
      // Check if 2FA is required
      if (response.user.twoFactorEnabled) {
        setRequires2FA(true);
        // Store JWT token for 2FA verification
        setTempAuthData({
          sessionToken: response.accessToken,  // This will be the jwtToken for 2FA verification
          user: response.user
        });
        setIsLoading(false);
        return;
      }
      
      const { accessToken, ...userData } = response;
      
      // Store token and user data
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(userData.user));
      
      setUser(userData.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login. Please check your credentials.');
      toast.error(err.response?.data?.message || 'Failed to login. Please check your credentials.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // 2FA verification
  const verify2FA = async (code: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!tempAuthData || !tempAuthData.sessionToken) {
        throw new Error('Missing authentication data');
      }
      
      // Call the verify2FA method with the sessionToken (JWT token) and verification code
      await authApi.verify2FA(tempAuthData.sessionToken, code);
      
      // If verification is successful, complete the login process with the saved token
      localStorage.setItem('accessToken', tempAuthData.sessionToken);
      localStorage.setItem('user', JSON.stringify(tempAuthData.user));
      
      setUser(tempAuthData.user);
      setRequires2FA(false);
      setTempAuthData(null);
      
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid verification code');
      toast.error(err.response?.data?.message || 'Invalid verification code');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel authentication (for 2FA)
  const cancelAuth = () => {
    setRequires2FA(false);
    setTempAuthData(null);
    navigate('/login');
  };

  // Google login method
  const googleLogin = async (token: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authApi.loggedInUser();
      
      // Store token and user data
      localStorage.setItem('accessToken', token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login with Google.');
      toast.error(err.response?.data?.message || 'Failed to login with Google.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // GitHub login method
  const githubLogin = async (code: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authApi.loggedInUser();
      // Store token and user data
      localStorage.setItem('accessToken', code);
      localStorage.setItem('user', JSON.stringify(response));
      
      setUser(response.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login with GitHub.');
      toast.error(err.response?.data?.message || 'Failed to login with GitHub.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout method
  const logout = () => {
    authApi.logout();
    setUser(null);
    navigate('/login');
  };

  // Context value
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    requires2FA,
    login,
    googleLogin,
    githubLogin,
    verify2FA,
    logout,
    cancelAuth,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
