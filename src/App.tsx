
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Organizations from "./pages/Organizations";
import Users from "./pages/Users";
import LinkedIn from "./pages/LinkedIn";
import Roles from "./pages/Roles";
import Targets from "./pages/Targets";
import Projects from "./pages/Projects";
import UserTasks from "./pages/UserTasks";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import Events from "./pages/Events";
import CMSContentList from "./pages/CMSContentList";
import CMSContentEdit from "./pages/CMSContentEdit";
import CMSContentView from "./pages/CMSContentView";
import CMSMailList from "./pages/CMSMailList";
import CMSMailEdit from "./pages/CMSMailEdit";
import CMSMailView from "./pages/CMSMailView";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider delayDuration={300}>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />

            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/leads" element={
              <ProtectedRoute>
                <Leads />
              </ProtectedRoute>
            } />
            <Route path="/leads/edit/:id" element={
              <ProtectedRoute>
                <Leads />
              </ProtectedRoute>
            } />
            <Route path="/organizations" element={
              <ProtectedRoute>
                <Organizations />
              </ProtectedRoute>
            } />
            <Route path="/organizations/edit/:id" element={
              <ProtectedRoute>
                <Organizations />
              </ProtectedRoute>
            } />
            <Route path="/users" element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            } />
            <Route path="/users/edit/:id" element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            } />
            <Route path="/linkedin" element={
              <ProtectedRoute>
                <LinkedIn />
              </ProtectedRoute>
            } />
            <Route path="/linkedin/edit/:id" element={
              <ProtectedRoute>
                <LinkedIn />
              </ProtectedRoute>
            } />
            <Route path="/roles" element={
              <ProtectedRoute>
                <Roles />
              </ProtectedRoute>
            } />
            <Route path="/roles/edit/:id" element={
              <ProtectedRoute>
                <Roles />
              </ProtectedRoute>
            } />
            <Route path="/targets" element={
              <ProtectedRoute>
                <Targets />
              </ProtectedRoute>
            } />
            <Route path="/targets/edit/:id" element={
              <ProtectedRoute>
                <Targets />
              </ProtectedRoute>
            } />
            <Route path="/projects" element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            } />
            <Route path="/projects/edit/:id" element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            } />
            <Route path="/user-tasks" element={
              <ProtectedRoute>
                <UserTasks />
              </ProtectedRoute>
            } />
            <Route path="/user-tasks/edit/:id" element={
              <ProtectedRoute>
                <UserTasks />
              </ProtectedRoute>
            } />
            
            {/* New routes for Calendar/Events */}
            <Route path="/calendar" element={
              <ProtectedRoute>
                <Events />
              </ProtectedRoute>
            } />
            <Route path="/calendar/edit/:id" element={
              <ProtectedRoute>
                <Events />
              </ProtectedRoute>
            } />
            
            {/* New routes for CMS Content */}
            <Route path="/cms/list" element={
              <ProtectedRoute>
                <CMSContentList />
              </ProtectedRoute>
            } />
            <Route path="/cms/edit/:id" element={
              <ProtectedRoute>
                <CMSContentEdit />
              </ProtectedRoute>
            } />
            <Route path="/cms/create" element={
              <ProtectedRoute>
                <CMSContentEdit />
              </ProtectedRoute>
            } />
            <Route path="/cms/view/:id" element={
              <ProtectedRoute>
                <CMSContentView />
              </ProtectedRoute>
            } />
            
            {/* New routes for CMS Mail */}
            <Route path="/cms-mail/list" element={
              <ProtectedRoute>
                <CMSMailList />
              </ProtectedRoute>
            } />
            <Route path="/cms-mail/edit/:id" element={
              <ProtectedRoute>
                <CMSMailEdit />
              </ProtectedRoute>
            } />
            <Route path="/cms-mail/create" element={
              <ProtectedRoute>
                <CMSMailEdit />
              </ProtectedRoute>
            } />
            <Route path="/cms-mail/view/:id" element={
              <ProtectedRoute>
                <CMSMailView />
              </ProtectedRoute>
            } />

            {/* Other routes */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
