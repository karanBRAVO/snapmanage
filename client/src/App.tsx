import { Route, Routes } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Home from '@/pages/Home';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminSignup from '@/pages/admin/AdminSignup';
import UserLogin from '@/pages/user/UserLogin';
import UserSignup from '@/pages/user/UserSignup';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/navbar';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import UserUpload from '@/pages/user/UserUpload';
import Footer from '@/components/footer';
import ProtectedRoute from '@/pages/ProtectedRoute';

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster />
      <Navbar />
      <main className="pb-10">
        <Routes>
          <Route path="/" element Component={Home} />

          {/* Admin */}
          <Route
            path="/admin/login"
            element={
              <ProtectedRoute
                isAuthPath
                authPath="/admin/login"
                moveTo="/admin/dashboard"
              >
                <AdminLogin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/signup"
            element={
              <ProtectedRoute
                isAuthPath
                authPath="/admin/signup"
                moveTo="/admin/dashboard"
              >
                <AdminSignup />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute authPath="/admin/login">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* User */}
          <Route
            path="/user/login"
            element={
              <ProtectedRoute
                isAuthPath
                authPath="/user/login"
                moveTo="/user/upload"
              >
                <UserLogin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/signup"
            element={
              <ProtectedRoute
                isAuthPath
                authPath="/user/signup"
                moveTo="/user/upload"
              >
                <UserSignup />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/upload"
            element={
              <ProtectedRoute authPath="/user/login">
                <UserUpload />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
