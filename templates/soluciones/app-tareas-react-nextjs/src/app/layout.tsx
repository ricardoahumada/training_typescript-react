// ============================================================
// src/app/layout.tsx - Root Layout para Next.js App Router
// ============================================================
// Lab 5A.2: App Router - Layout

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sistema de Tareas - Next.js SSR',
  description: 'Caso 1r con Server Side Rendering',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
