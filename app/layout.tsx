"use client";
import "./_style/globals.css";
import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="w-full h-screen overflow-hidden"
        suppressHydrationWarning
      >
        <Toaster />
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
        >
          {isMounted && children}
        </ThemeProvider>
      </body>
    </html>
  );
}
