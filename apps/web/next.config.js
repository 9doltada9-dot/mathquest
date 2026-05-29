/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@mathquest/ui', '@mathquest/types', '@mathquest/utils'],
  images: {
    domains: ['localhost'],
  },
  experimental: {
    typedRoutes: true,
  },
}

module.exports = nextConfig
