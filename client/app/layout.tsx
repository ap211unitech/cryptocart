import { MetaMaskInpageProvider } from "@metamask/providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";
import { Navigation } from "@/components/ui/navigation";
import { Providers } from "@/providers";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CryptoCart || A fully decentralized eCommerce platform",
  description: "A fully decentralized eCommerce platform",
};

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Alert className="bg-yellow-100 py-2 rounded-none">
            <AlertDescription className="flex items-center justify-center gap-2 text-black">
              <TriangleAlert className="h-5 w-5" />
              CryptoCart is currently deployed exclusively on the Sepolia
              Testnet.
            </AlertDescription>
          </Alert>
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
