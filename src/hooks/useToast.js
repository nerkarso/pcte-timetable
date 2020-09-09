import { useState } from 'react';

export default function useToast() {
  const [isToastShown, setIsToastShown] = useState(false);

  function setToastShown(value) {
    setIsToastShown(value);
  }

  return {
    isToastShown,
    setToastShown
  };
}
