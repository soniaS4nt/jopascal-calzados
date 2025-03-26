import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jopascal-calzados.vercel.app',
        pathname: '/api/media/file/**',
      },
    ],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
