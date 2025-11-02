import { withContentlayer } from 'next-contentlayer2'
import type { NextConfig } from 'next'

const config: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['contentlayer2', 'next-contentlayer2'],

  // Turbopack configuration (Next.js 16)
  turbopack: {},
  experimental: {
    turbopackUseSystemTlsCerts: true
  },

  // Production optimizations
  compress: true,
  poweredByHeader: false,

  // Image optimization (future-proofing)
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}

// Bundle Analyzer (only in analyze mode)
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer(withContentlayer(config))
