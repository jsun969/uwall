'use client';

import { ConfirmProvider as MuiConfirmProvider } from 'material-ui-confirm';

export const ConfirmProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <MuiConfirmProvider
      defaultOptions={{
        dialogProps: { sx: { '& .MuiPaper-root': { width: 'auto' } } },
        confirmationButtonProps: { autoFocus: true },
        confirmationText: '确定',
        cancellationText: '取消',
      }}
    >
      {children}
    </MuiConfirmProvider>
  );
};
