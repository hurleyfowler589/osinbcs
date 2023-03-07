/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  watch: true,
  env: {
    GRAPPLE_API_URI: process.env.GRAPPLE_API_URI,
    GRAPPLE_API_GRAPHQL_PATH: process.env.GRAPPLE_API_GRAPHQL_PATH,
  }
}

module.exports = nextConfig
