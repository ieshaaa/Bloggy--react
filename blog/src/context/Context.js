import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const storedUser = localStorage.getItem("user");
let parsedUser;

try {
  parsedUser = JSON.parse(storedUser);
} catch (error) {
  console.error("Error parsing user from local storage:", error);
  // Handle the error or set a default value for parsedUser
  parsedUser = null;
}

const INITIAL_STATE = {
  user: parsedUser || null,
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
