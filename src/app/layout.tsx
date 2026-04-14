import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Auditoria de Risco Caixa",
  description: "Faça sua análise direta e libere seu subsídio MCMV.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${outfit.variable} antialiased text-slate-800 bg-slate-50 min-h-screen font-sans`}>
        {children}
      </body>
    </html>
  );
}
