import AdminAuth, { AdminAuthFormSchema } from '@/components/admin-auth';
import { toast } from '@/components/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const UserLogin = () => {
  const navigate = useNavigate();

  function onSubmit(data: z.infer<typeof AdminAuthFormSchema>) {
    console.log(data);
    toast({
      title: 'Success',
      description: (
        <div>
          <span>Logged in successfully.</span>
        </div>
      ),
    });
    navigate('/user/upload');
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
