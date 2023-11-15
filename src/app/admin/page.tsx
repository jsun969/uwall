import { Alert, AlertTitle, Container, Stack } from '@mui/material';
import Link from 'next/link';

import { AdminHeader } from './_components/AdminHeader';
import { ConfigForm } from './_components/ConfigForm';
import { FooterLinksForm } from './_components/FooterLinksForm';
import { db } from '~/server/db';

const AdminPage = async () => {
  const config = (await db.config.findFirst())!;
  const footerLinks = await db.footerLink.findMany();

  return (
    <>
      <AdminHeader />
      <Container maxWidth="md">
        <Stack spacing={2}>
          <Alert severity="success">
            <AlertTitle>管理员模式</AlertTitle>
            你已成功登录为管理员，
            <Link href="/" style={{ color: 'inherit', fontWeight: 'bold' }}>
              返回主页（点这里）
            </Link>
            即可管理万能墙
          </Alert>
          <ConfigForm defaultValues={config} />
          <FooterLinksForm defaultValues={{ links: footerLinks }} />
        </Stack>
      </Container>
    </>
  );
};

export default AdminPage;
