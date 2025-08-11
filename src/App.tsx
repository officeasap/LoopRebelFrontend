// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import SessionWrapper from "@/components/layouts/SessionWrapper";
import ProtectedRoute from "@/components/layouts/ProtectedRoute";
import MainLayout from "@/components/layouts/MainLayout";
import InstallPrompt from "@/components/ui/InstallPrompt";
import { lazy, Suspense } from "react";
import { Loader } from "@/components/ui/Loader";

// ✅ Lazy load for PWA performance
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Verify = lazy(() => import("./pages/auth/Verify"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Profile = lazy(() => import("./pages/profile"));
const Withdraw = lazy(() => import("./pages/withdraw"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Loader />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <InstallPrompt />
        <BrowserRouter>
          <Routes>
            <Route element={<SessionWrapper />}>
              <Route element={<MainLayout />}>
                {/* Public Routes */}
                <Route
                  path="/"
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <Home />
                    </Suspense>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <Login />
                    </Suspense>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <Register />
                    </Suspense>
                  }
                />
                <Route
                  path="/verify"
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <Verify />
                    </Suspense>
                  }
                />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route
                    path="/dashboard"
                    element={
                      <Suspense fallback={<LoadingFallback />}>
                        <Dashboard />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <Suspense fallback={<LoadingFallback />}>
                        <Profile />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/withdraw"
                    element={
                      <Suspense fallback={<LoadingFallback />}>
                        <Withdraw />
                      </Suspense>
                    }
                  />
                </Route>

                {/* 404 */}
                <Route
                  path="*"
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <NotFound />
                    </Suspense>
                  }
                />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
