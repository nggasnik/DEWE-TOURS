import { Navigate, Outlet } from "react-router-dom";

export const UserPrivateRoute = () => {
  
  return <>{!JSON.parse(localStorage.getItem("user")) === "user" ? (<Navigate to="/" />) : (<Outlet />)}</>;
};
