import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthProvider";

const ProtectedRoleRoutes = (WrappedComponent, allowedRoles = []) => {
  const Wrapper = props => {
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
      if (!user) {
        router.push("/login");
      } else if (!allowedRoles.includes(user.role)) {
        router.push("/");
      }
    }, [user, router]);

    return user ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default ProtectedRoleRoutes;
