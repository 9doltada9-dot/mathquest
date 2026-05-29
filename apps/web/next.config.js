/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  transpilePackages: ['@mathquest/ui', '@mathquest/types', '@mathquest/utils'],
  images: { unoptimized: true },
}

module.exports = nextConfig