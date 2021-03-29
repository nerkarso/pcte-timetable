import { useState } from 'react';

export function useToast() {
  const [isToastShown, setIsToastShown] = useState(false);

  return {
    isToastShown,
    setToastShown: (value) => setIsToastShown(value),
  };
}
