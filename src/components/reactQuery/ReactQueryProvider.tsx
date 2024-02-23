'use client';
import { createContext, ReactNode, useContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const QueryClientContext = createContext<QueryClient | undefined>(undefined);

export const useQueryClient = () => {
  const context = useContext(QueryClientContext);
  if (!context) {
    throw new Error('useQueryClient must be used within a QueryClientProvider');
  }
  return context;
};

const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientContext.Provider value={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </QueryClientContext.Provider>
  );
};

export default ReactQueryProvider;
