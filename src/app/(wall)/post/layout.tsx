import { Container } from '@mui/material';

const PostLayout = ({ children }: { children: React.ReactNode }) => {
  return <Container maxWidth="sm">{children}</Container>;
};

export default PostLayout;
