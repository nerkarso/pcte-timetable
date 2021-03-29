import React, { createContext, useContext, useState } from 'react';

const MasterDetailsContext = createContext(null);

export const useMasterDetails = () => useContext(MasterDetailsContext);

export default function MasterDetailsProvider({ children }) {
  const [state, setState] = useState(null);

  const setDetails = (details) => setState(details);

  return (
    <MasterDetailsContext.Provider value={{ details: state, setDetails }}>{children}</MasterDetailsContext.Provider>
  );
}
