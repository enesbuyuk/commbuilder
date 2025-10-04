import {getLocale, getTranslations} from "next-intl/server";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import {getMetadata} from "@/lib/metadata";

const pageName = "contact";

export async function generateMetadata() {
    return getMetadata(pageName);
}

// Social media icon mapping
const contactConfig = {
    address: {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 384 512">
                <path d="M168 0C75.1 0 0 75.1 0 168c0 87.2 140.8 272 168 272s168-184.8 168-272C336 75.1 260.9 0 168 0zm0 256c-48.6 0-88-39.4-88-88s39.4-88 88-88 88 39.4 88 88-39.4 88-88 88z"/>
            </svg>
        ),
        color: "text-blue-600"
    },
    email: {
        icon: (
            <svg className="" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512">
                <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
            </svg>
        ),
        color: "text-red-600"
    },
    instagram: {
        icon: (
            <svg className="" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512">
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
            </svg>
        ),
        color: "text-pink-500"
    },
    linkedin: {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512">
                <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"/>
            </svg>
        ),
        color: "text-blue-700"
    },
    whatsapp: {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512">
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
            </svg>
        ),
        color: "text-green-600"
    },
    x: {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512">
                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
            </svg>
        ),
        color: "text-black"
    }
};

type ContactKey = keyof typeof contactConfig;

export default async function Page() {
    const [metadataTranslations, contentTranslations] = await Promise.all([
        getTranslations(`metadata.${pageName}`),
        getTranslations(`pages.${pageName}`)
    ]);

    const locale = await getLocale();

    // Fetch all contact information dynamically
    const contactKeys: ContactKey[] = ['email', 'address', 'instagram', 'linkedin', 'whatsapp', 'x'];
    const contactPromises = contactKeys.map(async (key) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SITE_URL}/api/external/contact/${key}`,
                { cache: "no-store" }
            );
            if (response.ok) {
                const data = await response.json();
                return { key, data };
            }
        } catch (error) {
            console.error(`Failed to fetch ${key}:`, error);
        }
        return null;
    });

    const contactResults = await Promise.all(contactPromises);
    const contacts = contactResults.filter((result): result is { key: ContactKey; data: any } => result !== null);

    return (
        <PageLayout title={metadataTranslations("title")} description={metadataTranslations("description")}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                <div className="w-full">
                    <iframe
                        title="İstanbul Üniversitesi Fen Fakültesi Haritası"
                        className={"rounded-lg shadow-lg"}
                        src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d266.1054973692008!2d28.95958402053108!3d41.01125558151917!3m2!1i1024!2i768!4f13.1!2m1!1sistanbul%20%C3%BCversitesi%20fen%20fak%C3%BCltesi!5e0!3m2!1sen!2sde!4v1733314369887!5m2!1sen!2sde"
                        width="100%" height="650" allowFullScreen={false} loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>

                <div className="w-full text-left bg-white p-12 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">{contentTranslations("ourContactInformation")}</h2>
                    
                    {/* Email Section */}
                    {contacts.find(c => c.key === 'email') && (() => {
                        const emailData = contacts.find(c => c.key === 'email')?.data;
                        const emailName = emailData?.name?.[locale] || emailData?.name?.en || 'Email';
                        const emailValue = emailData?.value?.[locale] || emailData?.value?.en || '';
                        return (
                            <p className="text-base text-gray-700 mb-2">
                                <strong>{emailName}:</strong>{' '}
                                <Link 
                                    href={`mailto:${emailValue}`}
                                    title={emailName}
                                    className="hover:text-primary transition-colors"
                                >
                                    {emailValue}
                                </Link>
                            </p>
                        );
                    })()}
                    {/* Address Section */}
                    {contacts.find(c => c.key === 'address') && (() => {
                        const addressData = contacts.find(c => c.key === 'address')?.data;
                        const addressName = addressData?.name?.[locale] || addressData?.name?.en || 'Address';
                        const addressValue = addressData?.value?.[locale] || addressData?.value?.en || '';
                        return (
                            <p className="text-base text-gray-700 mb-2">
                                <strong>{addressName}:</strong>{' '}
                                <Link 
                                    target = "_blank"
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressValue)}`}
                                    title={addressName }
                                    className="hover:text-primary transition-colors"
                                >
                                    {addressValue}
                                </Link>
                            </p>
                        );
                    })()}

                    {/* Social Media Icons */}
                    <div className="flex flex-wrap justify-center gap-4 p-4">
                        {contacts
                            .filter(contact => contact.key !== 'email' && contact.key !== 'address')
                            .map(({ key, data }) => {
                                const config = contactConfig[key];
                                const value = data.value?.[locale] || data.value?.en || '';
                                const name = data.name?.[locale] || data.name?.en || key;
                                
                                if (!value || !config) return null;
                                
                                return (
                                    <Link 
                                        key={key}
                                        className={`[&>svg]:h-5 [&>svg]:w-5 flex items-center justify-center w-12 h-12 ${config.color} bg-white rounded-full shadow-md hover:text-secondaryDark transition duration-300`}
                                        href={value}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={name}
                                    >
                                        {config.icon}
                                    </Link>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}
