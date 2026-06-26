import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'EasyTech3D · Admin',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="bg">
      <body className="min-h-screen bg-slate-100 text-slate-800 antialiased">{children}</body>
    </html>
  );
}
