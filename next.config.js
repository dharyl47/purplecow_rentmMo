/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
      APP_GMAP_API_KEY: process.env.APP_GMAP_API_KEY
  },
}

module.exports = nextConfig
