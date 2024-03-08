import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';

const ProtectedRoutes = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const { user } = useUser();

    useEffect(() => {
      if (!user) {
        router.push('/login');
      }
    }, [user, router]);

    return user ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default ProtectedRoutes;
