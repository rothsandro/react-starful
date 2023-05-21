import { useLayoutEffect, useRef } from 'react';

export function useResetHandler(onReset: VoidFunction) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const form = ref.current?.closest('form');
    form?.addEventListener('reset', onReset);
    return () => form?.removeEventListener('reset', onReset);
  });

  return { ref };
}
