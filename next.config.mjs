/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        staleTimes:{
            dynamic: 30
        }
    },
    serverExternalPackages: ["@node-rs/argon-2"]
};

export default nextConfig;
