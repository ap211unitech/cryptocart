import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CryptoCart || A fully decentralized eCommerce platform",
  description: "A fully decentralized eCommerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Alert className="bg-yellow-100">
          <AlertDescription className="flex items-center justify-center gap-2">
            <TriangleAlert className="h-5 w-5" />
            CryptoCart is currently deployed exclusively on the Sepolia Testnet.
          </AlertDescription>
        </Alert>
        {children}
      </body>
    </html>
  );
}
