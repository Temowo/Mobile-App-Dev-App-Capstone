import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NotifyError = (message, duration = 3000) =>
  toast.error(message, {
    position: "top-right",
    hideProgressBar: true,
    autoClose: duration,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    toastId: "error",
  });

export const NotifySuccess = (message, duration = 3000) =>
  toast.success(message, {
    className: "test",
    position: "top-right",
    hideProgressBar: true,
    autoClose: duration,
    toastId: "success",
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
