import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/authContext';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (!allowedRoles.includes(user.role)) {
      router.push('/unauthorized'); // Redirect to unauthorized page if user's role is not allowed
    }
  }, [user, allowedRoles, router]);

  return <>{children}</>;
};

export default ProtectedRoute;
