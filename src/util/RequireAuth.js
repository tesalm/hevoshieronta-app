import { Navigate } from "react-router-dom";
import { useContext } from "react";
import ContextProvider from "../store/context-reducer";

export function RequireAuth({ children }) {
  const { state } = useContext(ContextProvider);
  
  if (state.isAuthenticated === false) {
    return <Navigate to="/kirjaudu" replace />;
  } else {
    return children;
  }
}