
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BarChart3, Users2, Building2 } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16 text-center lg:pt-32">
        <h1 className="mx-auto max-w-4xl font-heading text-4xl font-bold tracking-tight sm:text-6xl">
          Streamline Your Business with
          <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"> Aura CRM</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          Transform your customer relationships with our powerful, intuitive CRM solution. 
          Manage leads, track interactions, and grow your business efficiently.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button size="lg" onClick={() => navigate("/login")}>
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Lead Management */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-4">
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Lead Management</h3>
            <p className="text-muted-foreground">
              Track and nurture leads through your sales pipeline with our intuitive interface.
            </p>
          </div>

          {/* User Management */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-4">
              <Users2 className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Team Collaboration</h3>
            <p className="text-muted-foreground">
              Manage your team efficiently with role-based access and permissions.
            </p>
          </div>

          {/* Organization Management */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-4">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Organization Tracking</h3>
            <p className="text-muted-foreground">
              Keep detailed records of organizations and their interactions with your business.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Aura CRM. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
