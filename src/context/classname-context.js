import React, { createContext, useEffect, useState } from 'react';

const initialState = {
  className: null,
  changeClassName: () => {}
};

const ClassNameContext = createContext(initialState);

function ClassNameProvider({ children }) {
  const [className, setClassName] = useState(initialState.className);

  useEffect(() => {
    const name = localStorage.getItem('className');
    setClassName(name);
  }, [className]);

  const changeClassName = name => {
    localStorage.setItem('className', name);
    setClassName(name);
  };

  return (
    <ClassNameContext.Provider value={{ className, changeClassName }}>
      {children}
    </ClassNameContext.Provider>
  );
}

export { ClassNameContext, ClassNameProvider };
