import {ReactNode} from 'react';
import './globals.css';

type Props = {
    children: ReactNode;
};

export async function generateMetadata() {
    return {
        metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!).origin,
        alternates: {
            canonical: '/',
            languages: {
                'en-US': '/en',
                'tr-TR': '/tr',
            },
        },
    };
}

export default function RootLayout({children}: Props) {
    return children;
}