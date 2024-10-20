import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const ImgDialog = ({
  children,
  src,
}: {
  children: React.ReactNode;
  src: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Image Preview</DialogTitle>
          <DialogDescription>
            Check your image is clear and everything is visible.
          </DialogDescription>
        </DialogHeader>
        <img
          src={src}
          alt="UP"
          width={100}
          height={100}
          loading="lazy"
          className="w-full h-full max-w-lg max-h-[300px] object-contain"
        />
      </DialogContent>
    </Dialog>
  );
};

export default ImgDialog;
