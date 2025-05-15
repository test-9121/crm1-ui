
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { RolePermission } from "@/modules/roles/types";
import { GoogleCallback } from "@/components/auth/GoogleCallback";
import { GitHubCallback } from "@/components/auth/GitHubCallback";
import LoadingSpinner from './pages/Loading';

// Lazy-loaded Pages
const Landing = React.lazy(() => import("./pages/Landing"));
const Login = React.lazy(() => import("./pages/Login"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Leads = React.lazy(() => import("./pages/Leads"));
const Organizations = React.lazy(() => import("./pages/Organizations"));
const Users = React.lazy(() => import("./pages/Users"));
const LinkedIn = React.lazy(() => import("./pages/LinkedIn"));
const Roles = React.lazy(() => import("./pages/Roles"));
const Targets = React.lazy(() => import("./pages/Targets"));
const Projects = React.lazy(() => import("./pages/Projects"));
const UserTasks = React.lazy(() => import("./pages/UserTasks"));
const Unauthorized = React.lazy(() => import("./pages/Unauthorized"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Events = React.lazy(() => import("./pages/Events"));
const CMSContentList = React.lazy(() => import("./pages/CMSContentList"));
const CMSContentEdit = React.lazy(() => import("./pages/CMSContentEdit"));
const CMSContentView = React.lazy(() => import("./pages/CMSContentView"));
const CMSMailList = React.lazy(() => import("./pages/CMSMailList"));
const CMSMailEdit = React.lazy(() => import("./pages/CMSMailEdit"));
const CMSMailView = React.lazy(() => import("./pages/CMSMailView"));
const Profile = React.lazy(() => import("./pages/Profile"));
const DashboardLayout = React.lazy(() => import("./components/dashboard/DashboardLayout"));
const Index = React.lazy(() => import("./pages/Index"));
const Deals = React.lazy(() => import("./pages/Deals"));

const queryClient = new QueryClient();

// Define which roles can access which routes
const ALL_ROLES: RolePermission[] = ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'];
const ADMIN_ROLES: RolePermission[] = ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'];
const SUPER_ADMIN_ONLY: RolePermission[] = ['ROLE_SUPER_ADMIN'];

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <TooltipProvider>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/callback/google" element={<GoogleCallback />} />
                <Route path="/callback/github" element={<GitHubCallback />} />
                <Route element={<ProtectedRoute />}>
                  <Route element={<DashboardLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/organizations" element={<Organizations />} />
                    <Route path="/roles" element={<Roles />} />
                    <Route path="/targets" element={<Targets />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/user-tasks" element={<UserTasks />} />
                    <Route path="/leads" element={<Leads />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/deals" element={<Deals />} />
                    <Route path="/linkedin" element={<LinkedIn />} />
                    <Route path="/calendar" element={<Events />} />
                    <Route path="/cms/list" element={<CMSContentList />} />
                    <Route path="/cms/edit/:id" element={<CMSContentEdit />} />
                    <Route path="/cms/view/:id" element={<CMSContentView />} />
                    <Route path="/cms-mail/list" element={<CMSMailList />} />
                    <Route path="/cms-mail/edit/:id" element={<CMSMailEdit />} />
                    <Route path="/cms-mail/view/:id" element={<CMSMailView />} />
                  </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </TooltipProvider>
        </BrowserRouter>
        <Toaster position="top-right" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
