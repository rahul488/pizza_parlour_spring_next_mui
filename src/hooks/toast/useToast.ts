import { useEffect } from 'react';
import { toast } from 'react-toastify';

const useToast = () => {
  const appToast = (
    message: string = 'Some thing went wrong',
    status: boolean
  ) => {
    toast(message, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      theme: 'dark',
      type: status ? 'success' : 'error',
    });
  };
  return appToast;
};
export default useToast;
