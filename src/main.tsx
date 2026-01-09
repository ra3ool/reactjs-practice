import { ThemeProvider } from '@/contexts';
import '@/index.css';
import router from '@/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { ReloadPrompt } from './components/reload-prompt.component';
import "./i18n";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      <ReloadPrompt />
    </ThemeProvider>
  </StrictMode>,
);
