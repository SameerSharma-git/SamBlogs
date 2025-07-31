// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint : {
    ignoreDuringBuilds: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    // It's highly recommended to also set contentDispositionType and contentSecurityPolicy
    // to prevent scripts embedded in the image from executing.
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: 'images.pexels.com',
      //   port: '',
      //   pathname: '/**', // Allows any path from pexels.com
      // },
      // Add other image domains here if you use them, e.g.,
      // {
      //   protocol: 'https',
      //   hostname: 'another-image-host.com',
      //   port: '',
      //   pathname: '/**',
      // },
      {
        protocol: "https",
        hostname: '*',
      }
    ],
  },
  // Any other Next.js configurations you might have go here
};

export default nextConfig;
