import ModeToggle from './mode-toggle';

const Footer = () => {
  return (
    <footer className="w-full fixed bottom-0 text-black dark:text-zinc-200 dark:bg-zinc-900 font-thin text-xs bg-zinc-100 px-[13px] py-[3px] flex items-center justify-between">
      <span>Made by Ky.inc</span>
      <ModeToggle />
    </footer>
  );
};

export default Footer;
