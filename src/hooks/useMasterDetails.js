import { MasterDetailsContext } from 'hooks/MasterDetailsContext';
import { useContext } from 'react';

export default function useMasterDetails() {
  return useContext(MasterDetailsContext);
}
