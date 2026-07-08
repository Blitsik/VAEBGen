/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'api.qrserver.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "img-src 'self' data: blob: https://api.qrserver.com;",
          },
        ],
      },
    ];
  },
};

const isCloudflare = process.env.CLOUDFLARE_WORKERS || process.env.CF_PAGES;
const isDocker = process.env.DOCKER_BUILD === '1';

if (isCloudflare) {
  // Static export for CF Workers/Pages — API handled by worker
  nextConfig.output = 'export';
  nextConfig.distDir = 'out';
  nextConfig.trailingSlash = true;
} else if (isDocker) {
  // Standalone server for Docker/Dokploy
  nextConfig.output = 'standalone';
}
// Vercel/Netlify — default (no output override needed)

export default nextConfig;
