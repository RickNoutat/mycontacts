import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth";

export default function Protected() {
  const token = useAuthStore((s) => s.token);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
