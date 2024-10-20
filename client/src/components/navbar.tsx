import { useNavigate } from 'react-router-dom';
import ModeToggle from './mode-toggle';
import UserAvatar from './user-avatar';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between p-4 md:px-8 lg:px-16 border-b-2 dark:border-white border-black">
      <div
        className="flex items-center gap-1 sm:gap-2 flex-col sm:flex-row justify-center"
        onClick={() => {
          navigate('/');
        }}
      >
        <img
          alt="SnapManage"
          width={100}
          height={100}
          loading="lazy"
          src="/rbac.webp"
          className="w-14 h-14 rounded-md"
        />
        <h1 className="text-xs sm:text-base font-sans text-black dark:text-white lg:text-xl font-bold">
          SnapManage
        </h1>
      </div>

      <div className="flex items-center space-x-6">
        <UserAvatar src="" alt="KY" />
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
