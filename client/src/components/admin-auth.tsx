'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export const AdminAuthFormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 4 characters.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
});

const AdminAuth = ({
  onSubmit,
}: {
  onSubmit: (data: z.infer<typeof AdminAuthFormSchema>) => void;
}) => {
  const form = useForm<z.infer<typeof AdminAuthFormSchema>>({
    resolver: zodResolver(AdminAuthFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
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
                  placeholder="Karan Yadav"
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
        <div className="w-full flex items-center justify-center">
          <Button type="submit" className="w-full max-w-md">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AdminAuth;
