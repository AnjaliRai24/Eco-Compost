import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { ProgressProvider } from "./contexts/ProgressContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import BookPickup from "./pages/BookPickup";
import Shop from "./pages/Shop";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ProgressProvider>
            <LanguageProvider>
              <NotificationProvider>
                <TooltipProvider>
                <Toaster />
                <Sonner />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin/register" element={<AdminRegister />} />
                  <Route path="/book-pickup" element={<BookPickup />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <UserDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute requireAdmin>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                </TooltipProvider>
              </NotificationProvider>
            </LanguageProvider>
          </ProgressProvider>
        </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
