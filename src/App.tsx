
import React, { Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
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
const DashboardLayout = React.lazy(() => import("./components/dashboard/DashboardLayout").then(module => ({ default: module.default })));
const Deals = React.lazy(() => import("./pages/Deals"));

const queryClient = new QueryClient();

// Define which roles can access which routes
const ALL_ROLES: RolePermission[] = ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'];
const ADMIN_ROLES: RolePermission[] = ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'];
const SUPER_ADMIN_ONLY: RolePermission[] = ['ROLE_SUPER_ADMIN'];

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <TooltipProvider delayDuration={700}>
            <Toaster />
            <Sonner />
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {/* Public routes (no layout) */}
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/oauth2/google/redirect" element={<GoogleCallback />} />
                <Route path="/oauth2/github/redirect" element={<GitHubCallback />} />
                <Route path="auth/redirect" element={<GitHubCallback />} />
                <Route path="*" element={<NotFound />} />

                {/* Protected routes wrapped in DashboardLayout */}
                <Route element={
                  <ProtectedRoute requiredRole={ALL_ROLES}>
                    <DashboardLayout />
                  </ProtectedRoute>
                }>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/deals" element={<Deals />} />

                  {/* Leads */}
                  <Route path="/leads" element={<Leads />} />
                  <Route path="/leads/edit/:id" element={
                    <ProtectedRoute requiredRole={ADMIN_ROLES} allowedOperations={['read', 'update']}>
                      <Leads />
                    </ProtectedRoute>
                  } />

                  {/* Organizations */}
                  <Route path="/organizations" element={
                    <ProtectedRoute requiredRole={SUPER_ADMIN_ONLY}>
                      <Organizations />
                    </ProtectedRoute>
                  } />
                  <Route path="/organizations/edit/:id" element={
                    <ProtectedRoute requiredRole={SUPER_ADMIN_ONLY}>
                      <Organizations />
                    </ProtectedRoute>
                  } />

                  {/* Users */}
                  <Route path="/users" element={
                    <ProtectedRoute requiredRole={ADMIN_ROLES}>
                      <Users />
                    </ProtectedRoute>
                  } />
                  <Route path="/users/edit/:id" element={
                    <ProtectedRoute requiredRole={SUPER_ADMIN_ONLY}>
                      <Users />
                    </ProtectedRoute>
                  } />

                  {/* LinkedIn */}
                  <Route path="/linkedin" element={<LinkedIn />} />
                  <Route path="/linkedin/edit/:id" element={
                    <ProtectedRoute requiredRole={ADMIN_ROLES} allowedOperations={['read', 'update']}>
                      <LinkedIn />
                    </ProtectedRoute>
                  } />

                  {/* Roles */}
                  <Route path="/roles" element={
                    <ProtectedRoute requiredRole={SUPER_ADMIN_ONLY}>
                      <Roles />
                    </ProtectedRoute>
                  } />
                  <Route path="/roles/edit/:id" element={
                    <ProtectedRoute requiredRole={SUPER_ADMIN_ONLY}>
                      <Roles />
                    </ProtectedRoute>
                  } />

                  {/* Targets */}
                  <Route path="/targets" element={<Targets />} />
                  <Route path="/targets/edit/:id" element={
                    <ProtectedRoute requiredRole={ADMIN_ROLES} allowedOperations={['read', 'update']}>
                      <Targets />
                    </ProtectedRoute>
                  } />

                  {/* Projects */}
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/edit/:id" element={
                    <ProtectedRoute requiredRole={ADMIN_ROLES}>
                      <Projects />
                    </ProtectedRoute>
                  } />

                  {/* User Tasks */}
                  <Route path="/user-tasks" element={<UserTasks />} />
                  <Route path="/user-tasks/edit/:id" element={
                    <ProtectedRoute requiredRole={ADMIN_ROLES}>
                      <UserTasks />
                    </ProtectedRoute>
                  } />

                  {/* Events */}
                  <Route path="/calendar" element={<Events />} />
                  <Route path="/calendar/edit/:id" element={
                    <ProtectedRoute requiredRole={ADMIN_ROLES}>
                      <Events />
                    </ProtectedRoute>
                  } />

                  {/* CMS Content */}
                  <Route path="/cms/list" element={<CMSContentList />} />
                  <Route path="/cms/edit/:id" element={<CMSContentEdit />} />
                  <Route path="/cms/create" element={<CMSContentEdit />} />
                  <Route path="/cms/view/:id" element={<CMSContentView />} />

                  {/* CMS Mail */}
                  <Route path="/cms-mail/list" element={<CMSMailList />} />
                  <Route path="/cms-mail/edit/:id" element={<CMSMailEdit />} />
                  <Route path="/cms-mail/create" element={<CMSMailEdit />} />
                  <Route path="/cms-mail/view/:id" element={<CMSMailView />} />
                </Route>
              </Routes>
            </Suspense>
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
