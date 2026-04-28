import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./Styles/globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600", "700"], 
});

export const metadata: Metadata = {
  title: "Gaapo - Adoção de Animais",
  description: "Adoção de animais",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${poppins.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}