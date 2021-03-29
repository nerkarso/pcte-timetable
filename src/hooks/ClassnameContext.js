import React, { createContext, useContext, useEffect, useState } from 'react';

const initialState = {
  classname: null,
  setClassname: () => {},
};

const ClassnameContext = createContext(initialState);

export const useClassname = () => useContext(ClassnameContext);

export default function ClassnameProvider({ children }) {
  const [state, setState] = useState(initialState.classname);

  const setClassname = (classname) => {
    localStorage.setItem('classname', classname);
    setState(classname);
  };

  useEffect(() => {
    setState(localStorage.getItem('classname'));
  }, [state]);

  return <ClassnameContext.Provider value={{ classname: state, setClassname }}>{children}</ClassnameContext.Provider>;
}
