
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BarChart3, Users2, Building2, CheckCircle2, Mail, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import graph from "@/assests/landing-page/graph.png";
import permission from "@/assests/landing-page/permission.png";
import leadManagement from "@/assests/landing-page/lead-management.png";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-3">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <span className="text-sm font-bold text-white">E</span>
            </div>
            <span className="font-semibold text-xl">Ensar CRM</span>
          </div>
          <div className="hidden md:flex space-x-6 text-sm">
            <a href="#features" className="text-muted-foreground hover:text-foreground">Features</a>
            <a href="#components" className="text-muted-foreground hover:text-foreground">Components</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground">Pricing</a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground">Testimonials</a>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button onClick={() => navigate("/login")}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Transform your business with <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Ensar CRM</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              All-in-one customer relationship management platform designed to streamline your business processes, enhance customer engagement, and boost your revenue.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => navigate("/login")}>
                Start your free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Book a demo
              </Button>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>No credit card required</span>
              <span className="mx-2">•</span>
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>14-day free trial</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -z-10 top-1/3 right-1/3 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
            <img 
              src={graph}
              alt="Ensar CRM Dashboard" 
              className="rounded-lg shadow-2xl border border-border/40 w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Logos */}
      <section className="container mx-auto px-4 py-12 border-y border-border/10">
        <p className="text-center text-muted-foreground mb-8">Trusted by leading companies worldwide</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50">
          <div className="h-8 w-24 bg-muted rounded"></div>
          <div className="h-8 w-24 bg-muted rounded"></div>
          <div className="h-8 w-24 bg-muted rounded"></div>
          <div className="h-8 w-24 bg-muted rounded"></div>
          <div className="h-8 w-24 bg-muted rounded"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Everything you need to manage your business</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive suite of tools helps you streamline operations, enhance customer relationships, and drive growth.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center p-6 rounded-lg border border-border/40 bg-card shadow-sm"
          >
            <div className="mb-4 rounded-full bg-primary/10 p-4">
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Advanced Analytics</h3>
            <p className="text-muted-foreground">
              Gain insights from comprehensive reports and analytics to make data-driven decisions.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center p-6 rounded-lg border border-border/40 bg-card shadow-sm"
          >
            <div className="mb-4 rounded-full bg-primary/10 p-4">
              <Users2 className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Team Collaboration</h3>
            <p className="text-muted-foreground">
              Enhance teamwork with role-based access, task assignments, and shared dashboards.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center p-6 rounded-lg border border-border/40 bg-card shadow-sm"
          >
            <div className="mb-4 rounded-full bg-primary/10 p-4">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Organization Management</h3>
            <p className="text-muted-foreground">
              Keep detailed records of organizations and their interactions with your business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Screenshot */}
      <section className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative rounded-xl overflow-hidden shadow-2xl border border-border/40"
        >
          <img 
            src="/images/dashboard-analytics.png" 
            alt="Ensar CRM Dashboard" 
            className="w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-background/80 to-transparent p-8 md:p-12 flex flex-col justify-end">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Powerful and intuitive dashboard</h3>
            <p className="max-w-md text-lg mb-6">Get a comprehensive view of your business at a glance with customizable widgets and real-time data.</p>
            <Button size="lg" className="w-fit">
              Explore Features <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Components Section */}
      <section id="components" className="container mx-auto px-4 py-24 bg-muted/30 rounded-3xl my-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Flexible Components</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ensar CRM comes with a comprehensive suite of features designed to enhance your customer relationship management.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="bg-card border border-border/40">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <BarChart3 className="h-8 w-8 text-primary mb-4" />
              <h4 className="font-medium">Analytics</h4>
            </CardContent>
          </Card>
          
          <Card className="bg-card border border-border/40">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Users2 className="h-8 w-8 text-primary mb-4" />
              <h4 className="font-medium">User Management</h4>
            </CardContent>
          </Card>
          
          <Card className="bg-card border border-border/40">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Building2 className="h-8 w-8 text-primary mb-4" />
              <h4 className="font-medium">Organizations</h4>
            </CardContent>
          </Card>
          
          <Card className="bg-card border border-border/40">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Mail className="h-8 w-8 text-primary mb-4" />
              <h4 className="font-medium">Email Campaigns</h4>
            </CardContent>
          </Card>
          
          <Card className="bg-card border border-border/40">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <MessageSquare className="h-8 w-8 text-primary mb-4" />
              <h4 className="font-medium">Communications</h4>
            </CardContent>
          </Card>
          
          <Card className="bg-card border border-border/40">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Users2 className="h-8 w-8 text-primary mb-4" />
              <h4 className="font-medium">Leads Management</h4>
            </CardContent>
          </Card>
          
          <Card className="bg-card border border-border/40">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <BarChart3 className="h-8 w-8 text-primary mb-4" />
              <h4 className="font-medium">Sales Tracking</h4>
            </CardContent>
          </Card>
          
          <Card className="bg-card border border-border/40">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <ArrowRight className="h-8 w-8 text-primary mb-4" />
              <h4 className="font-medium">And More...</h4>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <img 
              src={leadManagement}
              alt="Ensar CRM Leads Management" 
              className="rounded-lg shadow-lg border border-border/40"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <h3 className="text-2xl font-bold mb-4">Lead Management & Tracking</h3>
            <p className="text-muted-foreground mb-6">
              Easily manage your leads from acquisition to conversion. Track interactions, assign tasks, and analyze conversion rates to optimize your sales funnel.
            </p>
            <ul className="space-y-3">
              {["Drag-and-drop lead pipeline", "Automated lead scoring", "Follow-up reminders", "Conversion analytics"].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>
      
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">User & Team Management</h3>
            <p className="text-muted-foreground mb-6">
              Manage your team with role-based permissions, track performance, and ensure everyone has access to the tools they need to succeed.
            </p>
            <ul className="space-y-3">
              {["Role-based access control", "Performance dashboards", "Team collaboration tools", "Activity tracking"].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-[80%]"
          >
            <img 
              src={permission} 
              alt="Ensar CRM User Management" 
              className="rounded-lg shadow-lg border border-border/40"
            />
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Transparent Pricing</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that's right for your business. No hidden fees, no surprises.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-card border border-border/40 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-muted"></div>
            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-medium">Starter</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold">$29</span>
                  <span className="ml-1 text-muted-foreground">/month</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">For small teams getting started</p>
              </div>
              <ul className="mt-6 space-y-3">
                {["5 team members", "10,000 contacts", "Email support", "Basic analytics"].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-8" variant="outline">Get Started</Button>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-2 border-primary relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
            <div className="absolute -right-12 top-6 rotate-45 bg-primary text-primary-foreground py-1 px-12 text-xs font-medium">Popular</div>
            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-medium">Professional</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold">$79</span>
                  <span className="ml-1 text-muted-foreground">/month</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">For growing businesses</p>
              </div>
              <ul className="mt-6 space-y-3">
                {[
                  "20 team members", 
                  "50,000 contacts", 
                  "Priority email support", 
                  "Advanced analytics",
                  "Custom reporting",
                  "API access"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-8">Get Started</Button>
            </CardContent>
          </Card>
          
          <Card className="bg-card border border-border/40 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-muted"></div>
            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-medium">Enterprise</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold">$199</span>
                  <span className="ml-1 text-muted-foreground">/month</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">For large organizations</p>
              </div>
              <ul className="mt-6 space-y-3">
                {[
                  "Unlimited team members", 
                  "Unlimited contacts", 
                  "24/7 dedicated support", 
                  "Advanced analytics",
                  "Custom reporting",
                  "API access",
                  "White labeling",
                  "Custom integrations"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-8" variant="outline">Contact Sales</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary/10 py-24 my-12 rounded-3xl">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to transform your business?</h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of businesses already using Ensar CRM to streamline operations and boost growth.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" onClick={() => navigate("/login")}>
                Start your free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Book a demo
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">No credit card required. 14-day free trial.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <span className="text-sm font-bold text-white">E</span>
                </div>
                <span className="font-semibold text-xl">Ensar CRM</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Transform your customer relationships with our powerful, intuitive CRM solution.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Product</h4>
              <ul className="space-y-3">
                {["Features", "Pricing", "Integrations", "Updates"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-muted-foreground hover:text-foreground text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Resources</h4>
              <ul className="space-y-3">
                {["Documentation", "Guides", "Support", "API Reference"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-muted-foreground hover:text-foreground text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-3">
                {["About", "Blog", "Careers", "Contact"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-muted-foreground hover:text-foreground text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="pt-8 mt-8 border-t flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Ensar CRM. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {["Terms", "Privacy", "Cookies"].map((item, index) => (
                <a key={index} href="#" className="text-xs text-muted-foreground hover:text-foreground">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
