import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import './src/styles/_globals.scss';
import HeaderComponent from "./src/components/ui/HeaderComponent";
import { ModalProvider } from "./src/components/modal/ModalComponent";
import { Providers } from "./providers";
import TaskInitializer from "./src/components/TaskInitializer";

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
  description: "Manage your tasks with this simple app!",
  openGraph: {
    title: "React Task Manager",
    description: "Manage your tasks with this simple app!",
    images: [
      {
        url: '/shared.jpg',
        width: 1440,
        height: 800,
        alt: 'React Task Manager',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
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
