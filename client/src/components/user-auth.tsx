import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import parsePhoneNumber from 'libphonenumber-js';
import ImgDialog from '@/components/img-dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from './ui/input';
// import { format } from 'date-fns';
// import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { Calendar } from '@/components/ui/calendar';
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover';
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

export const UserAuthFormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 4 characters.',
  }),
  // password: z.string().min(8, {
  //   message: 'Password must be at least 8 characters.',
  // }),
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters',
  }),
  fatherName: z.string().min(2, {
    message: 'Father name must be at least 2 characters',
  }),
  phone: z.string().transform((value, ctx) => {
    const phoneNumber = parsePhoneNumber(value, {
      defaultCountry: 'IN',
    });
    if (!phoneNumber?.isValid()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid phone number',
      });
      return z.NEVER;
    }
    return phoneNumber.formatInternational();
  }),
  // email: z.string().email({
  //   message: 'Inavlid email address',
  // }),
  // dob: z.date({
  //   required_error: 'A date of birth is required.',
  // }),
});

const UserAuth = ({
  onSubmit,
}: {
  onSubmit: (data: {
    name: string;
    fatherName: string;
    phone: string;
    username: string;
    file: File | null;
  }) => Promise<void>;
}) => {
  const form = useForm<z.infer<typeof UserAuthFormSchema>>({
    resolver: zodResolver(UserAuthFormSchema),
    defaultValues: {
      username: '',
      // password: '',
      name: '',
      fatherName: '',
      phone: '',
    },
  });

  const [file, setFile] = useState<null | File>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (data) => {
          setSubmitting(true);
          await onSubmit({ ...data, file });
          setSubmitting(false);
        })}
        className="w-2/3 space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  autoComplete="off"
                  required={true}
                  placeholder="Karan Yadav"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter your complete name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fatherName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Father Name</FormLabel>
              <FormControl>
                <Input
                  autoComplete="off"
                  required={true}
                  placeholder="John Doe"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter your father{`'`}s name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  autoComplete="off"
                  required={true}
                  placeholder="xyz123@example.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter your Email here</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input
                  autoComplete="off"
                  required={true}
                  placeholder="(+91) 000-0000-000"
                  type="tel"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter your phone number</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  autoComplete="off"
                  required={true}
                  placeholder="karan_yadav"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Your username here as given by your instructor
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  autoComplete="off"
                  required={true}
                  type="password"
                  placeholder="********"
                  {...field}
                />
              </FormControl>
              <FormDescription>Your profile secret.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        {/* <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
        {file ? (
          <div className="flex flex-row items-center gap-3">
            <ImgDialog src={URL.createObjectURL(file)}>
              <img
                src={URL.createObjectURL(file)}
                alt="UP"
                width={100}
                height={100}
                loading="lazy"
                className="w-[200px] h-[200px] object-contain"
              />
            </ImgDialog>
            {/* <Button>Upload</Button> */}
          </div>
        ) : (
          <p className="text-black dark:text-zinc-500">No image selected</p>
        )}
        <div className="w-full flex items-center justify-center">
          <Button
            type="submit"
            disabled={submitting}
            className="w-full max-w-md disabled:bg-zinc-400"
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserAuth;
