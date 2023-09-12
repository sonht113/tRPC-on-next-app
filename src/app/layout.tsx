import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Provider from "@/utils/Provider"
import Header from "./components/commons/header"
import ToasterProvider from "./providers/toaster-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Todo List",
  description: "Created by NuiCoder"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <Provider>
          <ToasterProvider />
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  )
}
