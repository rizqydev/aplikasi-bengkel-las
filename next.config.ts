import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    dirs: ['app'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
