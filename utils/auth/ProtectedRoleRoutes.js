
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';

const ProtectedRoleRoutes = (WrappedComponent, allowedRoles = []) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const { user } = useUser();

    useEffect(() => {
      if (!user) {
        router.push('/login');
      } else if (!allowedRoles.includes(user.role)) {
        router.push('/unauthorized');
      }
    }, [user, router]);

    return user ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default ProtectedRoleRoutes;
