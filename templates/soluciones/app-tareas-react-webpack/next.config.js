// ============================================================
// next.config.js - Configuracion Next.js para SSR
// ============================================================
// Lab 5A.1: Configuración de Next.js

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Habilitar SSR
  reactStrictMode: true,

  // Configuracion de images si se usa next/image
  images: {
    domains: ['example.com'],
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  },
};

module.exports = withBundleAnalyzer(nextConfig);
