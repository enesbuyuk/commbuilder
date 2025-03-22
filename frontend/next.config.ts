import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    trailingSlash: false,
    images: {
        remotePatterns: [
            {
                hostname: process.env.NEXT_PUBLIC_HOST_NAME!,
            }
        ],
    }
};

export default withNextIntl(nextConfig);
