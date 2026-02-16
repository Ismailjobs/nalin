/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_HCAPTCHA_SITEKEY: process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY,
  },
  // Geliştirme: /api istekleri Express (4001) üzerine proxy
  async rewrites() {
    if (process.env.NODE_ENV === 'development') {
      return [{ source: '/api/:path*', destination: 'http://127.0.0.1:4001/api/:path*' }];
    }
    return [];
  },
};

module.exports = nextConfig;
