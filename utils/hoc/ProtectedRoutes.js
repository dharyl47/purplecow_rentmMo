import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthProvider";

const ProtectedRoutes = WrappedComponent => {
  const Wrapper = props => {
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
      if (!user) {
        router.push("/login");
      }
    }, [user, router]);

    return user ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default ProtectedRoutes;
