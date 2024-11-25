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
        '/join-the-club': {
            en: '/join-the-club',
            tr: '/kulube-katil',
        },
    }
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const {Link, getPathname, redirect, usePathname, useRouter} =
    createNavigation(routing);