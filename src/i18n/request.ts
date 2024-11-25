import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
    let locale = await requestLocale;
    
    if (!locale || !routing.locales.includes(locale as never)) {
        locale = routing.defaultLocale;
    }

    return {
        locale,
        messages: (
            await (locale === 'tr' ? import('../messages/tr.json') : import('../messages/en.json'))
        ).default
    };
});