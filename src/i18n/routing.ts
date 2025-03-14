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
        // Admin panel pages
        '/admin': '/admin',
        '/admin/sign-in': '/admin/sign-in',
        '/admin/sign-up': '/admin/sign-up',
        '/admin/sign-out': '/admin/sign-out',
        '/admin/dashboard': {
            en: '/admin/dashboard',
            tr: '/admin/kontrol-paneli'
        },
        '/admin/announcements':{
            en: '/admin/announcements',
            tr: '/admin/duyurular'
        },
        '/admin/events':{
            en: '/admin/events',
            tr: '/admin/etkinlikler'
        },
        '/admin/user-management':{
            en: '/admin/user-management',
            tr: '/admin/kullanici-yonetimi'
        },
        '/admin/settings':{
            en: '/admin/settings',
            tr: '/admin/ayarlar'
        },
        '/admin/social-media-management':{
            en: '/admin/social-media-management',
            tr: '/admin/sosyal-medya-yonetimi'
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
