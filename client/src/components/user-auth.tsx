import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import parsePhoneNumber from 'libphonenumber-js';

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
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export const UserAuthFormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 4 characters.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
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
  email: z.string().email({
    message: 'Inavlid email address',
  }),
  dob: z.date({
    required_error: 'A date of birth is required.',
  }),
});

const UserAuth = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const form = useForm<z.infer<typeof UserAuthFormSchema>>({
    resolver: zodResolver(UserAuthFormSchema),
    defaultValues: {
      username: '',
      password: '',
      name: '',
      fatherName: '',
      phone: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
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
        <FormField
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
        />
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
              <FormDescription>Your username here</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
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
        />
        <FormField
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
        />
        <div className="w-full flex items-center justify-center">
          <Button type="submit" className="w-full max-w-md">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserAuth;
