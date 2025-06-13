import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import TaskInitializer from "../components/TaskInitializer";
import HeaderComponent from "../components/ui/HeaderComponent";
import { ModalProvider } from "../components/modal/ModalComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Manager",
  description: "A simple task management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ModalProvider>
            <TaskInitializer />
            <HeaderComponent />
            <main className="container mx-auto p-4">
              {children}
            </main>
          </ModalProvider>
        </Providers>
      </body>
    </html>
  );
} 