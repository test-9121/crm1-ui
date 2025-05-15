
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Icons } from '@/components/ui/icons';

// Using import.meta.env for Vite environment variables
const apiUrl = 'http://localhost:8080';

export const SocialLogin = () => {
  const { googleLogin, githubLogin } = useAuth();
  
  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      window.location.href = `${apiUrl}/oauth2/authorization/google`;
    } catch (error) {
      console.error('Google sign in error:', error);
    }
  };

  // Handle GitHub Sign-In
  const handleGitHubSignIn = async () => {
    try {
      window.location.href = `${apiUrl}/oauth2/authorization/github`;
    } catch (error) {
      console.error('GitHub sign in error:', error);
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          type="button" 
          onClick={handleGoogleSignIn}
          className="flex items-center gap-2"
        >
          <Icons.google className="h-4 w-4" />
          Google
        </Button>
        <Button 
          variant="outline" 
          type="button" 
          onClick={handleGitHubSignIn}
          className="flex items-center gap-2"
        >
          <Icons.gitHub className="h-4 w-4" />
          GitHub
        </Button>
      </div>
    </div>
  );
};
