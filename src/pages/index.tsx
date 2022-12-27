import { Button } from '@mui/material';
import { type NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';

import { env } from '../env/client.mjs';

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  if (status === 'authenticated') {
    return (
      <>
        <div>Welcome {session.user?.email}</div>
        <Button
          variant="contained"
          onClick={() => {
            signOut();
            // FIXME 需要访问登出链接使账号完全登出
            window.location.href = env.NEXT_PUBLIC_AUTHING_SIGN_OUT;
          }}
        >
          Logout
        </Button>
      </>
    );
  }
  return (
    <>
      <div>Please Login</div>
      <Button variant="contained" onClick={() => signIn('authing')}>
        Login
      </Button>
    </>
  );
};

export default Home;
