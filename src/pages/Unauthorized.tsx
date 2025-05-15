
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Shield, AlertTriangle } from "lucide-react";

const Unauthorized = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  // Function to get user-friendly role name
  const getRoleName = (role?: string) => {
    switch (role) {
      case 'ROLE_SUPER_ADMIN': return 'Super Administrator';
      case 'ROLE_ADMIN': return 'Administrator';
      case 'ROLE_USER': return 'Regular User';
      default: return 'User';
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-red-600 px-4 py-5 sm:px-6 flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-white" />
            <h2 className="text-lg font-semibold text-white">Access Denied</h2>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-col items-center mb-6">
              <Shield className="h-16 w-16 text-red-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                You don't have permission to access this resource
              </h3>
              <p className="text-sm text-gray-600 mb-4 text-center">
                Your current role ({getRoleName(user?.role?.rolePermission)}) doesn't have the required 
                permissions to view this page or perform this action.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Button 
                onClick={() => navigate("/dashboard")}
                className="w-full"
                variant="default"
              >
                Go to Dashboard
              </Button>
              <Button 
                onClick={logout}
                className="w-full"
                variant="outline"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
