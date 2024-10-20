import AdminAuth, { AdminAuthFormSchema } from '@/components/admin-auth';
import { toast } from '@/components/hooks/use-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const UserLogin = () => {
  const navigate = useNavigate();

  async function onSubmit(data: z.infer<typeof AdminAuthFormSchema>) {
    console.log(data);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/login`,
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
        const username = response.data.data.username;
        localStorage.setItem('token', token);
        localStorage.setItem('name', username);
        navigate('/user/upload');
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
        User Login
      </h2>
      <AdminAuth onSubmit={onSubmit} />
      <div>
        <span className="text-xs sm:text-sm text-black dark:text-zinc-500">
          Don{`'`}t have an account?
          <span
            className="underline dark:hover:text-white ml-1 cursor-pointer"
            onClick={() => navigate('/user/signup')}
          >
            Signup
          </span>
        </span>
      </div>
    </div>
  );
};

export default UserLogin;
