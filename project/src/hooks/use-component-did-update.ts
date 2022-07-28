import { DependencyList, useEffect, useRef } from 'react';

type Effect = () => void;

export const useComponentDidUpdate = (effect: Effect, dependencies: DependencyList) => {
  const hasMounted = useRef(false);

  useEffect(
    () => {
      if (!hasMounted.current) {
        hasMounted.current = true;
        return;
      }
      effect();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies,
  );
};
