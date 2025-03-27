import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['jopascal-calzados.vercel.app'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jopascal-calzados.vercel.app',
        pathname: '/api/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/**',
      },
    ],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
