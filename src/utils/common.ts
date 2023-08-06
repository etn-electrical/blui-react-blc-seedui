import { EMAIL_REGEX } from '../constants/registration-constants';
import { UserRoles as UserRolesT } from '../context/AuthContextProvider/types';
import { country, state } from '../constants/country-state';

export const isValidEmail = (text: string): boolean => new RegExp(EMAIL_REGEX).test(text);

export const roleSiteCollection = (sites: any) => {
    const collection: any = {};
    sites.map((site: any) => {
        const { siteName, roles } = site;
        roles.map((role: any) => {
            collection[role.roleName] = collection[role.roleName] ? [...collection[role.roleName], siteName] : siteName ? [siteName] : []
        })
    })
    return collection;
}

export const sortRoles = (roles: UserRolesT[]) => roles.sort((role1, role2) => role1.order - role2.order);

export const getAllCountries = () => {
    return country;
}

export const getStatesOfCountry = (countryCode = '') => {
    if (!countryCode)
        return [];
    const states = state.filter((value) => {
        return value.countryCode === countryCode;
    });
    return states.sort((a, b) => {
        if (a.name < b.name)
            return -1;
        if (a.name > b.name)
            return 1;
        return 0;
    });
}