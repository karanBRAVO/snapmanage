import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export interface IRoleCardProps {
  title: string;
  desc: string;
  actions: { text: string; action: () => void }[];
  content: JSX.Element;
}

const RoleCard = ({ actions, content, desc, title }: IRoleCardProps) => {
  return (
    <Card className="w-[250px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent>{content}</CardContent>
      <CardFooter className="flex justify-between">
        {actions.map((action, index) => (
          <Button
            key={index}
            onClick={() => {
              action.action();
            }}
          >
            {action.text}
          </Button>
        ))}
      </CardFooter>
    </Card>
  );
};

export default RoleCard;
