"use client";

import { queryClient, trpc, trpcClient } from "./lib/trpc";
import "./globals.css";
import { QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <trpc.Provider queryClient={queryClient} client={trpcClient}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </trpc.Provider>
      </body>
    </html>
  );
}
