import type { Metadata } from "next";
import { setDefaultResultOrder } from "dns";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Footer from "@/app/components/Footer";

setDefaultResultOrder("ipv4first");

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <title>Nolan's cool blog posts</title>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider defaultColorScheme="light">
          {children}
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
