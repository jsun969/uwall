import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Link, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import type { GetServerSideProps, NextPage } from 'next';
import { default as NextLink } from 'next/link';
import { useForm } from 'react-hook-form';
import { SwitchElement, TextFieldElement } from 'react-hook-form-mui';
import { z } from 'zod';

import { ActiveAlert, InactiveAlert } from '../components/console/ActiveAlert';
import Layout from '../components/layout/Layout';
import { trpc } from '../lib/trpc';
import { p } from '../server/db/client';
import { checkUserActive } from '../server/utils/checkUserActive';
import { getServerAuth } from '../server/utils/getServerAuth';
import { toast } from '../utils/toast';

interface ConsolePageProps {
  activeExpires: string;
  haveWall: boolean;
  wallName: string | null;
  postVerify: boolean | null;
  schoolId: string | null;
}

export const getServerSideProps: GetServerSideProps<ConsolePageProps> = async (
  ctx,
) => {
  const { session, role } = await getServerAuth(ctx);
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  if (role === 'super') {
    return {
      redirect: {
        destination: '/super',
        permanent: false,
      },
    };
  }
  const user = await p.user.findUnique({
    where: { email: session!.user!.email! },
    select: { activeExpires: true, school: true },
  });
  return {
    props: {
      activeExpires: user!.activeExpires.toString(),
      haveWall: !!user?.school,
      wallName: user?.school?.wallName ?? null,
      postVerify: user?.school?.postVerify ?? null,
      schoolId: user?.school?.id ?? null,
    },
  };
};

export const consoleFormSchema = z.object({
  wallName: z
    .string()
    .min(1, { message: '请输入万能墙名' })
    .max(14, { message: '长度需小于15个字符' })
    .optional(),
  postVerify: z.boolean().optional(),
});

const ConsolePage: NextPage<ConsolePageProps> = ({
  activeExpires,
  haveWall,
  wallName,
  postVerify,
  schoolId,
}) => {
  const activeExpiresDayjs = dayjs(activeExpires);
  const isActive = checkUserActive(activeExpiresDayjs);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
    watch,
  } = useForm({
    defaultValues: { wallName, postVerify },
    resolver: zodResolver(consoleFormSchema),
  });

  const { mutate, isLoading } = trpc.admin.updateWall.useMutation({
    onMutate() {
      toast.loading({ id: 'updateWall', message: '修改中...' });
    },
    onSuccess(_, variables) {
      toast.success({ id: 'updateWall', message: '修改成功' });
      reset(variables);
    },
    onError() {
      toast.error({ id: 'updateWall', message: '修改失败' });
    },
  });

  return (
    <Layout>
      <Stack
        spacing={3}
        component="form"
        onSubmit={handleSubmit((form) => {
          mutate({ wallName: form.wallName!, postVerify: form.postVerify! });
        })}
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
            <SwitchElement
              control={control}
              name="postVerify"
              label={
                watch('postVerify') ? '审核（请到您的站点内审核帖子）' : '审核'
              }
              disabled={!isActive}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!isActive || !isDirty || isLoading}
            >
              保存
            </Button>
          </>
        )}
      </Stack>
    </Layout>
  );
};

export default ConsolePage;
