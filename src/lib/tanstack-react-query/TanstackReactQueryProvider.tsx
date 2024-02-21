'use client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChildrenProps } from "../common/ChildrenProps";

export function TanstackReactQueryProvider({children}: ChildrenProps) {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}