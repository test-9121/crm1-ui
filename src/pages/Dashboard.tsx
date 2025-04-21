
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { useAuth } from "@/contexts/AuthContext";

const salesData = [
  { name: "Jan", amount: 1200 },
  { name: "Feb", amount: 900 },
  { name: "Mar", amount: 1800 },
  { name: "Apr", amount: 1400 },
  { name: "May", amount: 2200 },
  { name: "Jun", amount: 1900 },
];

const leadsData = [
  { name: "New", value: 42, color: "#3b82f6" },
  { name: "Contacted", value: 28, color: "#10b981" },
  { name: "Qualified", value: 15, color: "#f59e0b" },
  { name: "Lost", value: 8, color: "#ef4444" },
];

const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <section className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name || "User"}</h1>
          <p className="text-muted-foreground">
            Here's an overview of your CRM performance and key metrics.
          </p>
        </section>

        {/* Stats Overview */}
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">93</div>
              <p className="text-xs text-muted-foreground mt-1">
                +8% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground mt-1">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="m16 6 4 14M12 6v14M8 8v12M4 4v16" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18.3%</div>
              <p className="text-xs text-muted-foreground mt-1">
                +2.5% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-muted-foreground"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$58,464</div>
              <p className="text-xs text-muted-foreground mt-1">
                +18.2% from last month
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Charts */}
        <section className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Monthly Sales</CardTitle>
              <CardDescription>
                Your sales performance over the past 6 months
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                  <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Lead Status</CardTitle>
              <CardDescription>
                Current distribution of leads by status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={leadsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {leadsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip formatter={(value) => [value, "Leads"]} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>

        {/* Recent Activity */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                The latest actions across your CRM
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-start gap-4 border-b border-border pb-4 last:border-0 last:pb-0">
                    <div className={`w-2 h-2 mt-2 rounded-full ${
                      i % 4 === 0 ? "bg-red-500" :
                      i % 3 === 0 ? "bg-green-500" :
                      i % 2 === 0 ? "bg-blue-500" : "bg-yellow-500"
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {i % 4 === 0 ? "Deal closed with Acme Inc." :
                         i % 3 === 0 ? "New lead created: Sarah Johnson" :
                         i % 2 === 0 ? "Meeting scheduled with potential client" :
                         "Follow-up email sent to John Doe"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {i % 4 === 0 ? "By Mark Wilson" :
                         i % 3 === 0 ? "By Jennifer Adams" :
                         i % 2 === 0 ? "By Robert Chen" :
                         "By Emily Parker"}
                         {" • "}
                        {i % 4 === 0 ? "2 hours ago" :
                         i % 3 === 0 ? "Yesterday" :
                         i % 2 === 0 ? "2 days ago" :
                         "3 days ago"}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
