import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const UserAvatar = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <Avatar>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{alt}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
