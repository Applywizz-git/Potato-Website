import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { CartProvider } from "@/contexts/cart-context"
import { Header } from "@/components/header"
import { MousePotatoEffect } from "@/components/mouse-potato-effect"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PotatoPost - Execute Your Secret Mission",
  description: "The most classified way to deliver intelligence. Anonymous. Encrypted. Unforgettable.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className={inter.className}>
        <CartProvider>
          <Header />
          {children}
          <MousePotatoEffect />
        </CartProvider>
      </body>
    </html>
  )
}
