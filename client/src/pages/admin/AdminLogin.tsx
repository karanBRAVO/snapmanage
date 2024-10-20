import AdminAuth, { AdminAuthFormSchema } from '@/components/admin-auth';
import { toast } from '@/components/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import axios from 'axios';

const AdminLogin = () => {
  const navigate = useNavigate();

  async function onSubmit(data: z.infer<typeof AdminAuthFormSchema>) {
    console.log(data);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/login`,
        {
          username: data.username,
          password: data.password,
        }
      );

      if (response.status === 200) {
        toast({
          title: 'Success',
          description: (
            <div>
              <span>Login successfull.</span>
            </div>
          ),
        });
        const token = response.data.data.token;
        const userName = response.data.data.username;
        localStorage.setItem('token', token);
        localStorage.setItem('name', userName);
        navigate('/admin/dashboard');
      }
    } catch (err: any) {
      console.log(err);
      if (err.response) {
        toast({
          title: 'Error',
          description: (
            <div>
              <span>{err.response.data.message}</span>
            </div>
          ),
        });
      }
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-center p-2 gap-3">
      <h2 className="dark:text-white font-bold text-black text-xl underline">
        Admin Login
      </h2>
      <AdminAuth onSubmit={onSubmit} />
      <div>
        <span className="text-xs sm:text-sm text-black dark:text-zinc-500">
          Don{`'`}t have an account?
          <span
            className="underline dark:hover:text-white ml-1 cursor-pointer"
            onClick={() => navigate('/admin/signup')}
          >
            Signup
          </span>
        </span>
      </div>
    </div>
  );
};

export default AdminLogin;
