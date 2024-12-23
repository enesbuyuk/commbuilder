import {createNavigation} from 'next-intl/navigation';
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['en', 'tr'] as const,
    defaultLocale: 'en',
    pathnames: {
        '/': '/',
        '/announcements': {
            en: '/announcements',
            tr: '/duyurular'
        },
        '/events':{
            en: '/events',
            tr: '/etkinlikler'
        },
        '/useful-links':{
            en: '/useful-links',
            tr: '/faydali-linkler'
        },
        '/links':{
            en: '/links',
            tr: '/linkler'
        },
        '/gallery':{
            en: '/gallery',
            tr: '/galeri'
        },
        '/about': {
            en: '/about',
            tr: '/hakkinda'
        },
        '/about/team':{
            en: '/about/team',
            tr: '/hakkinda/takim'
        },
        '/contact': {
            en: '/contact',
            tr: '/iletisim'
        },
        '/faq': {
            en: '/faq',
            tr: '/sss'
        },
        '/join-the-club': {
            en: '/join-the-club',
            tr: '/kulube-katil',
        },
    }
});

export type Pathnames = Extract<keyof typeof routing.pathnames, string>;
export type locale = (typeof routing.locales)[number];

export const {Link, getPathname, redirect, usePathname, useRouter} =
    createNavigation(routing)

export function getPath(pathname: Pathnames, locale: string): string {
    const value = routing.pathnames[pathname];
    if (typeof value === 'string') {
        return value;
    }
    if (locale in value) {
        return value[locale as keyof typeof value];
    }

    return value[routing.defaultLocale as keyof typeof value];
}