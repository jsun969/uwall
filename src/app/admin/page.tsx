import { Alert, AlertTitle, Container } from '@mui/material';
import Link from 'next/link';

import { AdminHeader } from './_components/AdminHeader';
import { ConfigForm } from './_components/ConfigForm';
import { db } from '~/server/db';

const AdminPage = async () => {
  const config = (await db.config.findFirst())!;

  return (
    <>
      <AdminHeader />
      <Container
        maxWidth="sm"
        sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Alert severity="success">
          <AlertTitle>管理员模式</AlertTitle>
          你已成功登录为管理员，
          <Link href="/" style={{ color: 'inherit', fontWeight: 'bold' }}>
            返回主页（点这里）
          </Link>
          即可管理万能墙
        </Alert>
        <ConfigForm defaultValues={config} />
      </Container>
    </>
  );
};

export default AdminPage;
