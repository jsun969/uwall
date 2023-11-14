import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: '管理员后台',
  robots: 'noindex',
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default AdminLayout;
