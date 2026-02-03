import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { isAuthenticated, isAdmin, user } = useAuth();
  const [hasShownToast, setHasShownToast] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && !hasShownToast) {
      toast.error("Please login to access this page");
      setHasShownToast(true);
    } else if (requireAdmin && !isAdmin && !hasShownToast) {
      toast.error("Admin access required");
      setHasShownToast(true);
    }
  }, [isAuthenticated, isAdmin, requireAdmin, hasShownToast]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
