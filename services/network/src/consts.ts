// Import this module on any other module like so:
// import { IS_DEV } from './consts';
// // or
// import * as CONSTS from './consts';

function get(
    name: string, 
    required: boolean = false
): string {
    const val = process.env[name] || null;
    if (!val && required) {
        throw new Error(`${name} environment variable is required.`);
    }

    return val || "";
}

// tslint:disable: max-line-length
export const NODE_ENV = get('NODE_ENV') || 'development';

export const IS_DEV = NODE_ENV !== 'production';

export const PORT_API = Number(get('PORT')) || 8080;

export const PORT_APP = Number(get('APP_PORT')) || 3000;

let _urlAPI: string = get('URL_API');
if (_urlAPI !== "") {
    _urlAPI = IS_DEV
        ? get('DEVELOPMENT_URL_API') || `http://localhost:${PORT_API}`
        : get('PRODUCTION_URL_API', true);
}
export const URL_API = _urlAPI;

let _urlApp: string = get('URL_APP');
if (_urlApp !== "") {
    _urlApp = IS_DEV
        ? get('DEVELOPMENT_URL_APP') || `http://localhost:${PORT_APP}`
        : get('PRODUCTION_URL_APP', true);
}
export const URL_APP = _urlApp;

let cookieDomain: string = get('COOKIE_DOMAIN');
if (cookieDomain !== "") {
    cookieDomain = IS_DEV ? get('DEVELOPMENT_COOKIE_DOMAIN') : get('PRODUCTION_COOKIE_DOMAIN');
}
if (!cookieDomain) {
    cookieDomain = IS_DEV ? 'localhost' : '.virtuoso.org';
}
export const COOKIE_DOMAIN = cookieDomain;

let mongoURL: string= get('MONGO_URL');
if (!mongoURL) {
    mongoURL = IS_DEV ? get('MONGO_URL_TEST', true) : get('MONGO_URL', true);
}
export const MONGO_URL = mongoURL;

export const SESSION_NAME: string = get('SESSION_NAME') || 'sid';

let sessionSecret: string = get('SESSION_SECRET');
if (sessionSecret !== "") {
    if (!IS_DEV) {
        throw new Error('SESSION_SECRET environment variable is required.');
    }
    sessionSecret = Math.random()
        .toString(36)
        .substring(2);
}

export const SESSION_SECRET: string = sessionSecret;