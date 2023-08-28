import { addMinutes } from 'date-fns';
import { UserDataType, BaseInfoType, RememberMeType } from '../types/storage-types';

const getAuthTocken = (): UserDataType => {
    const userData = JSON.parse(window.localStorage.getItem('user_data') || '{}');
    return userData;
};

const setAuthTocken = (token: string, roleId: string, id_token: string): void => {
    const expirationString = addMinutes(new Date(), 55);
    const userData = { expirationString, token, roleId, id_token };
    window.localStorage.setItem('user_data', JSON.stringify(userData));
};

const setRememberMe = (rememberMe: boolean, email: string): void => {
    const userData = { rememberMe, email };
    window.localStorage.setItem('rememberMe', JSON.stringify(userData));
};

const getRememberMe = (): RememberMeType => {
    const userData = JSON.parse(window.localStorage.getItem('rememberMe') || '{}');
    return userData;
};

const clearAuthToken = (): void => {
    window.localStorage.removeItem('user_data');
    window.localStorage.removeItem('base_info');
};

function setCodeVerifier(codeVerifier: string, codeChallenge: string): void {
    const verifier = { codeVerifier, codeChallenge };
    window.localStorage.setItem('code_verifier', JSON.stringify(verifier));
}

function getCodeVerifier() {
    const verifier = JSON.parse(window.localStorage.getItem('code_verifier') || '{}');
    return verifier;
}

export const LocalStorage = {
    setAuthTocken,
    getAuthTocken,
    setRememberMe,
    getRememberMe,
    clearAuthToken,
    setCodeVerifier,
    getCodeVerifier,
};
