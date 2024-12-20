import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/query-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Project Manager",
  description: "manage your projects with ease",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "antialiased min-h-screen ")}>
        <QueryProvider>
          <Toaster position="top-right" richColors toastOptions={{ duration: 3000, className: "max-w-fit" }} />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
