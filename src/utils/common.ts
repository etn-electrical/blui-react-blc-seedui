import { EMAIL_REGEX } from '../constants/registration-constants';
import { UserRoles as UserRolesT } from '../context/AuthContextProvider/types';
import { RegistrationResponseSites } from '../types/registration-types';
import { country, state } from '../constants/country-state';

export type RoleSiteCollectionRessponseType = {
    [key: string]: string[];
};

export const isValidEmail = (text: string): boolean => new RegExp(EMAIL_REGEX).test(text);

export const roleSiteCollection = (sites: RegistrationResponseSites[]): RoleSiteCollectionRessponseType => {
    const collection: any = {};
    sites.map((site: RegistrationResponseSites) => {
        const { siteName, roleName } = site;
        collection[roleName] = collection[roleName] ? [...collection[roleName], siteName] : siteName ? [siteName] : [];
    });
    return collection;
};

export const sortRoles = (roles: UserRolesT[]): UserRolesT[] => roles.sort((role1, role2) => role1.order - role2.order);

const dec2hex = (dec: any): string => `0${dec.toString(16)}`.substr(-2);

export const codeVerifier = (): string => {
    const array = new Uint32Array(56 / 2);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec2hex).join('');
};

function sha256(plain: any) {
    // returns promise ArrayBuffer
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
}

function base64urlencode(a: any) {
    let str = '';
    const bytes = new Uint8Array(a);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        str += String.fromCharCode(bytes[i]);
    }
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export const codeChallenge = async (v: any) => {
    const hashed = await sha256(v);
    const base64encoded = base64urlencode(hashed);
    return base64encoded;
};

export const getAllCountries = () => country;

export const getStatesOfCountry = (countryCode = '') => {
    if (!countryCode) return [];
    const states = state.filter((value) => value.countryCode === countryCode);
    return states.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });
};
