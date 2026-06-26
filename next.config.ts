import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Product/quote images come from the Shopify CDN.
  images: { remotePatterns: [{ protocol: 'https', hostname: 'cdn.shopify.com' }] },
};

export default nextConfig;
