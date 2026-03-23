import type { NextConfig } from 'next';

/**
 * Next inlines only NEXT_PUBLIC_* into the client bundle.
 * If .env still uses Vite names (VITE_*), we map them here so the app does not fall back to placeholder.supabase.co.
 */
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
  process.env.VITE_SUPABASE_URL?.trim() ||
  '';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
  process.env.VITE_SUPABASE_ANON_KEY?.trim() ||
  '';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  turbopack: {
    root: process.cwd(),
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: supabaseUrl || 'https://placeholder.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: supabaseAnonKey || 'placeholder-anon-key',
  },
  experimental: {
    optimizePackageImports: ['recharts', '@tanstack/react-table', 'react-calendar', 'dayjs'],
    staleTimes: {
      dynamic: 30,
      static: 300,
    },
  },
};

export default nextConfig;
