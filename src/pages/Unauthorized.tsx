
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Unauthorized = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Access Denied</h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
        You don't have permission to access this resource. Please contact your administrator if you believe this is an error.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => navigate("/dashboard")}>
          Go to Dashboard
        </Button>
        <Button variant="outline" onClick={logout}>
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
