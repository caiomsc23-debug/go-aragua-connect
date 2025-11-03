import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminSetup from "./pages/AdminSetup";
import CompanyLogin from "./pages/CompanyLogin";
import CompanyPortal from "./pages/CompanyPortal";
import CompanyDashboard from "./pages/CompanyDashboard";
import CompanySuccess from "./pages/CompanySuccess";
import ManageJobs from "./pages/ManageJobs";
import NewJob from "./pages/NewJob";
import JobsList from "./pages/JobsList";
import JobDetails from "./pages/JobDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/company-login" element={<CompanyLogin />} />
            <Route path="/company-portal" element={<CompanyPortal />} />
            <Route path="/company-dashboard" element={<CompanyDashboard />} />
            <Route path="/company-dashboard/manage-jobs" element={<ManageJobs />} />
            <Route path="/company-dashboard/new-job" element={<NewJob />} />
            <Route path="/company-dashboard/jobs-list" element={<JobsList />} />
            <Route path="/company-dashboard/job/:id" element={<JobDetails />} />
            <Route path="/company-success" element={<CompanySuccess />} />
            <Route path="/admin/setup" element={<AdminSetup />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
