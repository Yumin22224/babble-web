import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    console.log("accessToken yes", token);
  } else {
    console.log("accessToken no");
  }
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
