import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";
import { useEffect, ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute = ({
  children,
  adminOnly = false,
}: ProtectedRouteProps) => {
  const { user, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else if (adminOnly && role !== "admin") {
      router.push("/"); // Redirect to home if not an admin
    }
  }, [user, role, router, adminOnly]);

  if (!user || (adminOnly && role !== "admin")) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
