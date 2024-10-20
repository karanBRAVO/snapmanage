import { toast } from '@/components/hooks/use-toast';
import UserAuth, { UserAuthFormSchema } from '@/components/user-auth';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const UserSignup = () => {
  const navigate = useNavigate();

  function onSubmit(data: z.infer<typeof UserAuthFormSchema>) {
    console.log(data);
    toast({
      title: 'Success',
      description: (
        <div>
          <span>Sign up successfull. Now you can login.</span>
        </div>
      ),
    });
  }

  return (
    <div className="w-full flex flex-col items-center justify-center p-2 gap-3">
      <h2 className="dark:text-white font-bold text-black text-xl underline">
        User Signup
      </h2>
      <UserAuth onSubmit={onSubmit} />
      <div>
        <span className="text-xs sm:text-sm text-black dark:text-zinc-500">
          Already have an account?
          <span
            className="underline dark:hover:text-white ml-1 cursor-pointer"
            onClick={() => navigate('/user/login')}
          >
            Login
          </span>
        </span>
      </div>
    </div>
  );
};

export default UserSignup;
