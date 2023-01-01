import { toast as toastifyToast } from 'react-toastify';

type ToastPayload = { id: string; message: string };

const loading = ({ id, message }: ToastPayload) => {
  toastifyToast.loading(message, { toastId: id });
};

const stopLoadingOptions = { isLoading: false, autoClose: 3000 };

const success = ({ id, message }: ToastPayload) => {
  toastifyToast.update(id, {
    render: message,
    type: 'success',
    ...stopLoadingOptions,
  });
};

const error = ({ id, message }: ToastPayload) => {
  toastifyToast.update(id, {
    render: message,
    type: 'error',
    ...stopLoadingOptions,
  });
};

export const toast = { loading, success, error };
