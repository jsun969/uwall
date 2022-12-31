import {
  Button,
  FormControlLabel,
  Link,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import type { GetServerSideProps, NextPage } from 'next';
import { default as NextLink } from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { TextFieldElement } from 'react-hook-form-mui';

import { ActiveAlert, InactiveAlert } from '../components/console/ActiveAlert';
import Layout from '../components/layout/Layout';
import { getServerAuth } from '../server/common/getServerAuth';
import { prisma } from '../server/db/client';

interface ConsolePageProps {
  activeExpires: string;
  haveWall: boolean;
  wallName: string | null;
  verifyPost: boolean | null;
  schoolId: string | null;
}

export const getServerSideProps: GetServerSideProps<ConsolePageProps> = async (
  ctx,
) => {
  const { session } = await getServerAuth(ctx);
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const user = await prisma.user.findUnique({
    where: { email: session!.user!.email! },
    select: { activeExpires: true, school: true },
  });
  return {
    props: {
      activeExpires: user!.activeExpires.toString(),
      haveWall: !!user?.school,
      wallName: user?.school?.wallName ?? null,
      verifyPost: user?.school?.postVerify ?? null,
      schoolId: user?.school?.id ?? null,
    },
  };
};

const ConsolePage: NextPage<ConsolePageProps> = ({
  activeExpires,
  haveWall,
  wallName,
  verifyPost,
  schoolId,
}) => {
  const activeExpiresDayjs = dayjs(activeExpires);
  const isActive = dayjs().isBefore(activeExpiresDayjs);

  const { control, handleSubmit } = useForm({
    defaultValues: { wallName, verifyPost },
  });

  return (
    <Layout>
      <Stack
        spacing={3}
        component="form"
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <Typography variant="h4">控制台</Typography>
        {isActive ? (
          <ActiveAlert
            activeExpires={activeExpiresDayjs.format('YYYY/MM/DD HH:mm')}
          />
        ) : (
          <InactiveAlert />
        )}
        {haveWall && (
          <>
            <Typography>
              万能墙地址：
              <NextLink href={'/wall/' + schoolId} passHref legacyBehavior>
                <Link>/wall/{schoolId}</Link>
              </NextLink>
            </Typography>
            <TextFieldElement
              control={control}
              name="wallName"
              label="万能墙名"
              disabled={!isActive}
            />
            {/* TODO 等PR合并后改成rhf-mui的switch */}
            {/* https://github.com/dohomi/react-hook-form-mui/pull/110 */}
            {/* <SwitchElement
              control={control}
              name="verifyPost"
              label="审核"
              disabled={!isActive}
            /> */}
            <Controller
              name="verifyPost"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  disabled={!isActive}
                  control={<Switch checked={!!field.value} {...field} />}
                  label="审核"
                />
              )}
            />
            <Button type="submit" variant="contained" disabled={!isActive}>
              保存
            </Button>
          </>
        )}
      </Stack>
    </Layout>
  );
};

export default ConsolePage;
