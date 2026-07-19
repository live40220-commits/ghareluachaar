import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useShop } from '@/context/ShopContext';

export default function ProtectedLayout({
  children,
  requireAdmin = false,
}: {
  children: ReactNode;
  requireAdmin?: boolean;
}) {
  const { user } = useShop();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (requireAdmin && !user.isAdmin) {
      router.push('/');
    }
  }, [user, router, requireAdmin]);

  // While redirecting or loading, show a spinner
  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (requireAdmin && !user.isAdmin) {
    // Redirect already triggered; render nothing
    return null;
  }

  return <>{children}</>;
};
