/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: 'https://langtimeengine.framer.website/',
        permanent: true,
      },
    ];
  }
}

module.exports = nextConfig
