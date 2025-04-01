import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import Layout from "@/components/layouts/DefaultLayout";
import { ThemeProvider } from "@/components/themes/ThemeProvider";
import CartProvider from "../contexts/CartContext";
import FavProvider from "@/contexts/FavContext";

import Footer from "@/components/layouts/Footer";
// import Layout from "@/components/layouts/DefaultLayout";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ecobazar eCommerce",
  description: "Organic eCommerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <Layout> */}
        <CartProvider>
          <FavProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
              <Footer />
            </ThemeProvider>
          </FavProvider>
        </CartProvider>
        {/* </Layout> */}
      </body>
    </html>
  );
}
