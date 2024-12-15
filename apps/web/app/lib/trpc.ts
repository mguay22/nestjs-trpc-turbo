"use client";

import { AppRouter } from "@repo/trpc/router";
import { QueryClient } from "@tanstack/react-query";
import {
  CreateTRPCReact,
  createTRPCReact,
  httpBatchLink,
} from "@trpc/react-query";

export const trpc: CreateTRPCReact<AppRouter, unknown, null> =
  createTRPCReact<AppRouter>();

export const queryClient = new QueryClient();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: process.env.NEXT_PUBLIC_TRPC_URL!,
    }),
  ],
});
