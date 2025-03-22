import {ImageResponse} from 'next/og';
import {getTranslations} from "next-intl/server";

export const runtime = 'edge';
export let alt : string;
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
    const translations = {
        generalTranslations: await getTranslations("General"),
        pageTranslations: await getTranslations("IndexPage")
    }

    alt = translations.pageTranslations("description");

    return new ImageResponse(
        (
            <div
                style={{
                    backgroundImage: `url("${process.env.NEXT_PUBLIC_SITE_URL}/theme/default-og-image.jpg")`,
                    backgroundSize: 'cover',
                    fontSize: '48px',
                    color: '#FFFFFF',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontFamily: 'Inter, sans-serif',
                    padding: '30px',
                    borderRadius: '20px',
                }}
            >{translations.pageTranslations('title')}
                <br />
                <div style={{ fontSize: '20px', textAlign: 'left'}}>
                    {translations.pageTranslations('description')}
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
