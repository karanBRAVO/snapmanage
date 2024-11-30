import { useEffect, useState } from 'react';
import UserAuth from '@/components/user-auth';
import { toast } from '@/components/hooks/use-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserUpload = () => {
  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(new Date().toLocaleString());

  const onSubmit = async (data: {
    name: string;
    username: string;
    phone: string;
    fatherName: string;
    file: File | null;
  }) => {
    const { username, name, phone, fatherName, file } = data;

    if (!username) {
      toast({
        title: 'Error',
        description: (
          <div>
            <span>Please provide the your username</span>
          </div>
        ),
      });
      return;
    }
    if (!name) {
      toast({
        title: 'Error',
        description: (
          <div>
            <span>Please provide the name</span>
          </div>
        ),
      });
      return;
    }
    if (!phone) {
      toast({
        title: 'Error',
        description: (
          <div>
            <span>Please provide the phone number</span>
          </div>
        ),
      });
      return;
    }
    if (!fatherName) {
      toast({
        title: 'Error',
        description: (
          <div>
            <span>Please provide the father's name</span>
          </div>
        ),
      });
      return;
    }
    if (!file) {
      toast({
        title: 'Error',
        description: (
          <div>
            <span>Please provide slip</span>
          </div>
        ),
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('username', username);
      formData.append('name', name);
      formData.append('fatherName', fatherName);
      formData.append('phone', phone);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/upload-image`,
        formData
      );

      if (response.status === 200) {
        toast({
          title: 'Success',
          description: (
            <div>
              <span>Uploaded successfully.</span>
            </div>
          ),
        });

        navigate('/');
      }
      // eslint-disable-next-line
    } catch (err: any) {
      console.error(err);
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
  };

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   if (!file) {
  //     toast({
  //       title: 'Error',
  //       description: (
  //         <div>
  //           <span>No image selected</span>
  //         </div>
  //       ),
  //     });
  //     return;
  //   }

  //   console.log('File submitted:', file);
  //   try {
  //     const formData = new FormData();
  //     formData.append('image', file);

  //     const response = await axios.post(
  //       `${import.meta.env.VITE_API_URL}/api/user/upload-image`,
  //       formData
  //     );

  //     if (response.status === 200) {
  //       toast({
  //         title: 'Success',
  //         description: (
  //           <div>
  //             <span>Image uploading done.</span>
  //           </div>
  //         ),
  //       });
  //       setFile(null);
  //     }
  //   } catch (err: any) {
  //     console.log(err);
  //     if (err.response) {
  //       toast({
  //         title: 'Error',
  //         description: (
  //           <div>
  //             <span>{err.response.data.message}</span>
  //           </div>
  //         ),
  //       });
  //     }
  //   }
  // };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date().toLocaleString());
    }, 1 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="p-1 sm:p-4 flex flex-col">
      <h2 className="text-black dark:text-zinc-200 text-lg font-semibold">
        Upload your transaction Status
      </h2>
      <p className="text-black dark:text-zinc-400 text-sm">{currentDate}</p>
      <UserAuth onSubmit={onSubmit} />
    </div>
  );
};

export default UserUpload;
