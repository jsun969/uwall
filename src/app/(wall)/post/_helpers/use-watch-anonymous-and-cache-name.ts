import { useEffect, useRef } from 'react';
import { type UseFormReturn } from 'react-hook-form';

// type RequiredFieldValues =
//   | { anonymous: true; name: '' }
//   | { anonymous: false; name: string };
type RequiredFieldValues = { anonymous: boolean; name: string };

export const useWatchAnonymousAndCacheName = <
  TFieldValues extends RequiredFieldValues = RequiredFieldValues,
>(
  paramForm: UseFormReturn<TFieldValues>,
) => {
  // TODO: Remove this assertion and enable type safe in param
  const form = paramForm as unknown as UseFormReturn<RequiredFieldValues>;
  const cacheName = useRef(form.getValues('name'));
  const watchAnonymous = form.watch('anonymous');
  useEffect(() => {
    if (watchAnonymous) {
      cacheName.current = form.getValues('name');
      form.setValue('name', '');
    } else {
      form.setValue('name', cacheName.current);
    }
  }, [watchAnonymous]);
  return watchAnonymous;
};
