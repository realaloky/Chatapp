import { useEffect, useRef } from 'react';

export default function useScrollToBottom(dependency) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dependency]);

  return ref;
}
