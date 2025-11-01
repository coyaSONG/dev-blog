import { withContentlayer } from 'next-contentlayer2'
import type { NextConfig } from 'next'

const config: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['contentlayer2', 'next-contentlayer2'],
  turbopack: {},
  experimental: {
    turbopackUseSystemTlsCerts: true
  }
}

export default withContentlayer(config)
