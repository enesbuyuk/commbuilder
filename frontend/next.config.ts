import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const bucketURL = process.env.NEXT_PUBLIC_BUCKET ? new URL(process.env.NEXT_PUBLIC_BUCKET) : null;

const nextConfig: NextConfig = {
    trailingSlash: false,
    output: 'standalone',
    images: {
        remotePatterns: bucketURL
            ? [
                {
                    protocol: bucketURL.protocol.replace(':', '') as "http" | "https",
                    hostname: bucketURL.hostname,
                    pathname: '/**',
                }
            ]
            : []
    }
};

export default withNextIntl(nextConfig);
