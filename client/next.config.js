/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_HCAPTCHA_SITEKEY: process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY,
  },
  // /api isteklerini Express'e yönlendir
  // Production (Docker): server:4000 (Docker iç ağ), Dev: localhost:4001
  async rewrites() {
    const apiDest =
      process.env.NODE_ENV === 'production'
        ? 'http://server:4000/api/:path*'
        : 'http://127.0.0.1:4001/api/:path*';
    return [{ source: '/api/:path*', destination: apiDest }];
  },
};

module.exports = nextConfig;
