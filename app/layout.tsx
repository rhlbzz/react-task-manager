import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '../src/styles/_globals.scss';
import HeaderComponent from "../src/components/ui/HeaderComponent";
import { ModalProvider } from "../src/components/modal/ModalComponent";
import { Providers } from "../src/app/providers";
import TaskInitializer from "../src/components/TaskInitializer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "React Task Manager",
  description: "Mangage yoir tasks with this simple app!",
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
        <Providers>
          <TaskInitializer />
          <ModalProvider>
            <HeaderComponent />
            {children}
          </ModalProvider>
        </Providers>
      </body>
    </html>
  );
}
