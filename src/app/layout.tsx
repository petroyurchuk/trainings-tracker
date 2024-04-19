import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { StoreProvider } from "@/providers/StoreProvider";
import "./globals.css";
import SessionProviderCustom from "@/providers/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trainings Tracker",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppRouterCacheProvider>
      <SessionProviderCustom>
        <StoreProvider>
          <html lang="en">
            <body className={inter.className}>{children}</body>
          </html>
        </StoreProvider>
      </SessionProviderCustom>
    </AppRouterCacheProvider>
  );
}
