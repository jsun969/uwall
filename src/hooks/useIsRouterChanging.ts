import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useIsRouterChanging = () => {
  const [isChanging, setIsChanging] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setIsChanging(true);
    };
    const handleStop = () => {
      setIsChanging(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return isChanging;
};
