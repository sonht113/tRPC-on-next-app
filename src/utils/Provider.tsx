"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { getFetch, httpBatchLink, loggerLink } from "@trpc/client"
import React, { useState } from "react"
import superjson from "superjson"
import { NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

import { trpc } from "./trpc"

export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: 3000 } }
      })
  )
  const url = "http://localhost:3000/api/trpc"

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink({
          enabled: () => true
        }),
        httpBatchLink({
          url,
          fetch: async (input, init?) => {
            const fetch = getFetch()
            return fetch(input, {
              ...init,
              credentials: "include"
            })
          }
        })
      ],
      transformer: superjson
    })
  )
  return (
    <NextUIProvider>
      <NextThemesProvider attribute='class' defaultTheme='dark'>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </trpc.Provider>
      </NextThemesProvider>
    </NextUIProvider>
  )
}
