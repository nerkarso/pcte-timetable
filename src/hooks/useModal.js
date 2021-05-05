import { useState } from 'react';

export function useModal(initialState = false) {
  const [isModalShown, setIsModalShown] = useState(initialState);

  return {
    isModalShown,
    toggleModalShown: () => setIsModalShown(!isModalShown),
  };
}
