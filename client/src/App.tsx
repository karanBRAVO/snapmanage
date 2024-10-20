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

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element Component={Home} />

        {/* Admin */}
        <Route path="/admin/login" element Component={AdminLogin} />
        <Route path="/admin/signup" element Component={AdminSignup} />
        <Route path="/admin/dashboard" element Component={AdminDashboard} />

        {/* User */}
        <Route path="/user/login" element Component={UserLogin} />
        <Route path="/user/signup" element Component={UserSignup} />
        <Route path="/user/upload" element Component={UserUpload} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
