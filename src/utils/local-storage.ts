import { addMinutes } from 'date-fns';
import { UserDataType, RememberMeType, CodeVerifierType } from '../types/storage-types';

const getAuthTocken = (): UserDataType => {
    const userData = JSON.parse(window.localStorage.getItem('user_data') || '{}');
    return userData;
};

const setAuthTocken = (token: string, roleId: string, id_token: string): void => {      // eslint-disable-line
    const expirationString = addMinutes(new Date(), 55);
    const userData = { expirationString, token, roleId, id_token };                     // eslint-disable-line
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

const setCodeVerifier = (codeVerifier: string, codeChallenge: string): void => {
    const verifier = { codeVerifier, codeChallenge };
    window.localStorage.setItem('code_verifier', JSON.stringify(verifier));
}

const getCodeVerifier = (): CodeVerifierType => {
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
