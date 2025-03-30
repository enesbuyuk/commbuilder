import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    trailingSlash: false,
    output: 'standalone'
};

export default withNextIntl(nextConfig);
