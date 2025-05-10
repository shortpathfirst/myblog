import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';


const nextConfig: NextConfig = {
    basePath: isProd ? '/myblog' : '',
};

export default nextConfig;
