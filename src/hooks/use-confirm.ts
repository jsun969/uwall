import { useConfirm as useMuiConfirm } from 'material-ui-confirm';

type UseConfirmProps = {
  title: string;
  description: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export const useConfirm = ({
  title,
  description,
  onConfirm,
  onCancel,
}: UseConfirmProps) => {
  const muiConfirm = useMuiConfirm();
  const confirm = () => {
    muiConfirm({ title, description })
      .then(() => {
        onConfirm?.();
      })
      .catch(() => {
        onCancel?.();
      });
  };
  return confirm;
};
