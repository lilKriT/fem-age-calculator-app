import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

const poppinsSans = Poppins({
  variable: "--font-poppins-sans",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "FEM Age Calculator App | lilKriT",
  description: "Created by lilKriT using Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppinsSans.variable} antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
