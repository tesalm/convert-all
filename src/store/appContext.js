import { createContext, useReducer, useState } from "react";
import appReducer, { initialState } from "./reducer";
import useTimezones from "../util/useTimezones";

const AppContext = createContext();

export function AppContextProvider(props) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [scrollOffsetY, setScrollOffsetY] = useState(0);
  const timezones = useTimezones();

  return (
    <AppContext.Provider
      value={{state, dispatch, scrollOffsetY, setScrollOffsetY, ...timezones }}>
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContext;