/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['randomuser.me'],
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    typescript: {
        ignoreBuildErrors: true
    }
};

export default nextConfig;
