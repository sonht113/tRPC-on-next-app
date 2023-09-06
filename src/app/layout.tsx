"use client"

import { trpc } from "@/utils/trpc"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Provider from "@/utils/Provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Todo List",
  description: "Created by NuiCoder"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
