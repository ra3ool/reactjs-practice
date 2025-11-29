import { JSX } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

export function ReloadPrompt(): JSX.Element | null {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(registration?: ServiceWorkerRegistration) {
      console.log('✅ Service Worker registered:', registration);
    },
    onRegisterError(error: Error) {
      console.error('❌ Service Worker registration error:', error);
    },
  });

  const handleClose = (): void => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  if (!offlineReady && !needRefresh) return null;

  return (
    <div
      className="
        fixed bottom-4 right-4 z-50
        rounded-lg bg-white text-gray-900 shadow-lg
        px-4 py-3 w-72 max-w-full
        border border-gray-200
        animate-in fade-in slide-in-from-bottom-4
      "
      role="alert"
      aria-live="polite"
    >
      <p className="text-sm font-medium">
        {offlineReady
          ? '✅ App is ready to work offline.'
          : '🔄 New content is available — reload to update.'}
      </p>

      <div className="mt-3 flex items-center gap-2">
        {needRefresh && (
          <button
            type="button"
            onClick={() => updateServiceWorker(true)}
            className="
              px-4 py-1.5 rounded-md
              bg-blue-600 text-white text-sm font-semibold
              hover:bg-blue-700 active:bg-blue-800
              transition-colors
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
            "
          >
            Reload
          </button>
        )}
        <button
          type="button"
          onClick={handleClose}
          className="
            px-4 py-1.5 rounded-md
            bg-gray-200 text-gray-800 text-sm font-medium
            hover:bg-gray-300 active:bg-gray-400
            transition-colors
            focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
          "
        >
          Close
        </button>
      </div>
    </div>
  );
}
