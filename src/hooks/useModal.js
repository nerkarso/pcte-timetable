import { useState } from 'react';

export function useModal() {
  const [isModalShown, setIsModalShown] = useState(false);

  return {
    isModalShown,
    toggleModalShown: () => setIsModalShown(!isModalShown),
  };
}
