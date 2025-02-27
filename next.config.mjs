/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['randomuser.me', 'lh3.googleusercontent.com'],
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    typescript: {
        ignoreBuildErrors: true
    }
};

export default nextConfig;
