import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import ImgDialog from '@/components/img-dialog';

const UserUpload = () => {
  const [file, setFile] = useState<null | File>(null);
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleString());

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('File submitted:', file);
  };

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
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="mt-3 flex flex-col items-center justify-center gap-3"
      >
        <div className="flex items-center justify-center w-full max-w-md">
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
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
        </div>
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
            <Button>Upload</Button>
          </div>
        ) : (
          <p className="text-black dark:text-zinc-500">No image selected</p>
        )}
      </form>
    </div>
  );
};

export default UserUpload;
