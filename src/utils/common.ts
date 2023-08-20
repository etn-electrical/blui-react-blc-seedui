import { EMAIL_REGEX } from '../constants/registration-constants';
import { UserRoles as UserRolesT } from '../context/AuthContextProvider/types';
import { country, state } from '../constants/country-state';
import { RegistrationResponseSites } from  '../types/registration-types';

export type RoleSiteCollectionRessponseType = {
    [key: string]: string[];
}

export const isValidEmail = (text: string): boolean => new RegExp(EMAIL_REGEX).test(text);

export const roleSiteCollection = (sites: RegistrationResponseSites[]): RoleSiteCollectionRessponseType => {
    const collection: any = {};
    sites.map((site: RegistrationResponseSites) => {
        const { siteName, roleName } = site;
            collection[roleName] = collection[roleName] ? [...collection[roleName], siteName] : siteName ? [siteName] : []
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