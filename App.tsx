import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import OTPVerification from "./pages/OTPVerification";
import Unauthorized from "./pages/Unauthorized";
import RoleSelection from "./pages/RoleSelection";
import Profile from "./pages/Profile";
import NearbyFarmers from "./pages/NearbyFarmers";
import FarmerDashboard from "./pages/FarmerDashboard";
import Products from "./pages/Products"; // Import Products component
import Header from "./components/layout/Header"; // Import Header component
import Footer from "./components/layout/Footer"; // Import Footer component

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Header /> {/* Add Header component */}
          <AnimatePresence mode="wait">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<RoleSelection />} />
              <Route path="/sign-up/farmer" element={<SignUp />} />
              <Route path="/sign-up/customer" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/verify-otp" element={<OTPVerification />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              
              {/* Protected routes for all authenticated users */}
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              
              {/* Role-specific protected routes */}
              {/* For customer-only routes */}
              <Route 
                path="/nearbyfarmers" 
                element={
                  <ProtectedRoute requiredRole="customer">
                    <NearbyFarmers />
                  </ProtectedRoute>
                } 
              />
              
              {/* For farmer-only routes */}
              <Route 
                path="/farmer-dashboard" 
                element={
                  <ProtectedRoute requiredRole="farmer">
                    <FarmerDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* For displaying farmers list */}
              <Route 
                path="/products" 
                element={<Products />} 
              />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
          <Footer /> {/* Add Footer component */}
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
