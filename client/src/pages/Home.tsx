import RoleCard, { IRoleCardProps } from '@/components/role-card';
import { useNavigate } from 'react-router-dom';
import { Webhook } from 'lucide-react';
import { ShieldPlus } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const roles: IRoleCardProps[] = [
    {
      title: 'Admin',
      desc: 'Manage/View other users',
      actions: [
        {
          text: 'View',
          action: () => navigate('/admin/login'),
        },
      ],
      content: (
        <>
          <ShieldPlus size={50} />
        </>
      ),
    },
    {
      title: 'User',
      desc: 'Upload your transaction status',
      actions: [
        {
          text: 'Upload',
          action: () => navigate('/user/login'),
        },
      ],
      content: (
        <>
          <Webhook size={50} />
        </>
      ),
    },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center gap-3 p-2">
      <h2 className="text-black dark:text-white font-serif text-base">
        Select your Role
      </h2>
      <div className="flex flex-col md:flex-row items-center gap-3 w-full justify-center">
        {roles.map((role, key) => (
          <RoleCard key={key} {...role} />
        ))}
      </div>
    </div>
  );
};

export default Home;
