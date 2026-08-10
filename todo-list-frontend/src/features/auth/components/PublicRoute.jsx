import { Navigate, Outlet } from "react-router-dom";
import Spinner from "@/components/ui/Spinner.jsx";
import useAuth from "../hooks/useAuth.js";

/** Evita mostrar login/registro a un usuario con sesion activa. */
export default function PublicRoute() {
  const { isAuthenticated, initializing } = useAuth();

  if (initializing) {
    return (
      <div className="grid min-h-screen place-items-center bg-surface text-brand-400">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
}
