import React, { createContext, useReducer, useContext, useMemo } from "react";
import { reducer, initialState } from "./reducer";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;

export const useGlobalContext = () => useContext(Context);
