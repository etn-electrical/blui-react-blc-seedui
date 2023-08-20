import { addMinutes } from 'date-fns';

function getAuthTocken() {
    const userData = JSON.parse(window.localStorage.getItem('user_data') || '{}');
    return userData
}

function setAuthTocken(token: string, roleId: string): void {
    const expirationString = addMinutes(new Date, 55);
    const userData = { expirationString, token, roleId};
    window.localStorage.setItem('user_data', JSON.stringify(userData));
}

function setRememberMe(rememberMe: boolean, email: string): void {
    const userData = { rememberMe, email};
    window.localStorage.setItem('rememberMe', JSON.stringify(userData));
}

function getRememberMe() {
    const userData = JSON.parse(window.localStorage.getItem('rememberMe') || '{}');
    return userData
}

function clearAuthToken(): void {
    window.localStorage.removeItem('user_data');
    window.localStorage.removeItem('base_info');
}

export const LocalStorage = {
    setAuthTocken,
    getAuthTocken,
    setRememberMe,
    getRememberMe,
    clearAuthToken
};
