/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify:       true,
  webpack:         ( config ) => 
  {
    config.watchOptions =
    {
        aggregateTimeout: 5,
        ignored:          [ '**/.git/**', '**/.next/**', '**/node_modules/**' ],
        poll:             1000,
    }

    return config
  },
}

module.exports = nextConfig
