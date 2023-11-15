import { Container } from '@mui/material';

const PostLayout = ({ children }: { children: React.ReactNode }) => {
  return <Container maxWidth="md">{children}</Container>;
};

export default PostLayout;
