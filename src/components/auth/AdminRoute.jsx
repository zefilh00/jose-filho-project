import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function AdminRoute() {
  const {
    user,
    loading,
    profile,
    profileLoading,
    isAdmin,
  } = useAuth();

  if (loading || (user && (profileLoading || !profile))) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080b18]">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-violet-500/20 border-t-violet-500" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}