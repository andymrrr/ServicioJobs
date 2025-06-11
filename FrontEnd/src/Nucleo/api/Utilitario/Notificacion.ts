import { toast, ToastOptions } from 'react-toastify';

const defaultOptions: ToastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const Mensajeria = {
  success: (message: string, options: ToastOptions = {}) => {
    toast.success(message, { ...defaultOptions, ...options });
  },
  error: (message: string, options: ToastOptions = {}) => {
    toast.error(message, { ...defaultOptions, ...options });
  },
  warn: (message: string, options: ToastOptions = {}) => {
    toast.warn(message, { ...defaultOptions, ...options });
  },
  info: (message: string, options: ToastOptions = {}) => {
    toast.info(message, { ...defaultOptions, ...options });
  },
  default: (message: string, options: ToastOptions = {}) => {
    toast(message, { ...defaultOptions, ...options });
  }
};

