
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { RolePermission } from '@/modules/roles/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: RolePermission | RolePermission[];
  allowedOperations?: ('create' | 'read' | 'update' | 'delete')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole,
  allowedOperations = ['create', 'read', 'update', 'delete']
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Check authentication
  if (!isAuthenticated) {
    // Redirect to login page but save the location they tried to access
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Check role-based access if required
  if (requiredRole && user) {
    const userRole = user.role.rolePermission;
    const requiredRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    
    // Check if the user has required role
    const hasRequiredRole = requiredRoles.includes(userRole as RolePermission);

    if(user.email !== 'owner@ensarsolutions.com'){
      if (location.pathname.includes('/organizations') || location.pathname.includes('/roles')) {
        return <Navigate to="/unauthorized" replace />;
      }
    }
    
    // Specific rules for ROLE_USER
    if (userRole === 'ROLE_USER' && hasRequiredRole) {
      // If path is for restricted sections (users management)
      if (location.pathname.includes('/users') || location.pathname.includes('/organizations') || location.pathname.includes('/roles')) {
        return <Navigate to="/unauthorized" replace />;
      }
      
      // If path is for modules with limited operations
      const limitedAccessPaths = ['/leads', '/targets', '/linkedin'];
      const hasLimitedAccess = limitedAccessPaths.some(path => location.pathname.includes(path));
      
      // If editing/creating and the path has limited access for ROLE_USER
      if (hasLimitedAccess && 
          (location.pathname.includes('/edit/') || location.pathname.includes('/create/')) && 
          !allowedOperations.includes('update')) {
        return <Navigate to="/unauthorized" replace />;
      }
    }
    
    // Check ROLE_ADMIN restrictions
    if (userRole === 'ROLE_ADMIN' && hasRequiredRole) {
      // Admin can't access user management
      if (location.pathname.includes('/organizations') || location.pathname.includes('/roles') || location.pathname.includes('users/edit')) {
        return <Navigate to="/unauthorized" replace />;
      }
    }
    
    // If the user doesn't have required role at all
    if (!hasRequiredRole) {
      // User doesn't have the required role
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // User is authenticated and has proper permissions
  return <>{children}</>;
};

export default ProtectedRoute;
