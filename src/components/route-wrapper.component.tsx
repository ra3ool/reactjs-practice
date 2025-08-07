import { Loading, ProtectedRoute } from '@/components';
import { RouteWrapperProps } from '@/types';
import { Suspense, useEffect } from 'react';

export default function RouteWrapper({ route, children }: RouteWrapperProps) {
  useEffect(() => {
    // Update document title
    document.title = route.meta?.title
      ? `${route.meta.title} - React App`
      : 'React App';

    // Update meta description
    if (route.meta?.description) {
      const metaTag =
        document.head.querySelector('meta[name="description"]') ||
        document.createElement('meta');
      if (!metaTag.parentNode) {
        metaTag.setAttribute('name', 'description');
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', route.meta.description);
    }
  }, [route.meta]);

  return (
    <Suspense fallback={<Loading />}>
      <ProtectedRoute meta={route.meta}>{children}</ProtectedRoute>
    </Suspense>
  );
}
