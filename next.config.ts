import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();


const nextConfig: NextConfig = {
  // /* config options here */
  //   i18n: {
  //       locales: ['default', 'en', 'tr'],
  //       defaultLocale: 'default',
  //       localeDetection: false,
  //   },

    trailingSlash: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'dummyimage.com',
                port: '',
                pathname: '**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
                pathname: '**',
            }
        ],
    }
};
export default withNextIntl(nextConfig);
