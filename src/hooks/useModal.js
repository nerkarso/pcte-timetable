import { useState } from 'react';

export default function useModal() {
  const [isModalShown, setIsModalShown] = useState(false);

  function toggleModalShown() {
    setIsModalShown(!isModalShown);
  }

  return {
    isModalShown,
    toggleModalShown
  };
}
