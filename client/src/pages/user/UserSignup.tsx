import { toast } from '@/components/hooks/use-toast';
import UserAuth, { UserAuthFormSchema } from '@/components/user-auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const UserSignup = () => {
  const navigate = useNavigate();

  async function onSubmit(data: z.infer<typeof UserAuthFormSchema>) {
    console.log(data);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/signup`,
        {
          name: data.name,
          // dob: data.dob,
          // email: data.email,
          fatherName: data.fatherName,
          phoneNumber: data.phone,
          username: data.username,
          // password: data.password,
        }
      );

      if (response.status === 200) {
        toast({
          title: 'Success',
          description: (
            <div>
              <span>Signup successfull.</span>
            </div>
          ),
        });
        navigate('/user/login');
      }
      // eslint-disable-next-line
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
