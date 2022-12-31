import { Alert, AlertTitle } from '@mui/material';

export const InactiveAlert = () => {
  return (
    <Alert severity="warning">
      <AlertTitle>
        <strong>账号未激活</strong>
      </AlertTitle>
      请加QQ群 <strong>153535519</strong> 联系群主，或加微信{' '}
      <strong>jsun969</strong> 以激活账号
    </Alert>
  );
};

export const ActiveAlert = ({ activeExpires }: { activeExpires: string }) => {
  return (
    <Alert severity="success">
      <AlertTitle>
        <strong>账号已激活</strong>
      </AlertTitle>
      将在 <strong>{activeExpires}</strong> 过期
    </Alert>
  );
};
