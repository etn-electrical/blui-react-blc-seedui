export type Config = {
    envName: string;
    apiUrl: string;
    oktaUrl: string;
};

export const config: Config = {
    envName: 'development',
    apiUrl: 'https://api-dev.eaton.com/dermsaep/user-management/v1',
    oktaUrl: 'https://eaton-perf.oktapreview.com',
};

export const appConfig = {
    inviteRegistrationUrl: '/inviteregistration',
    selfRegistrationUrl: '/selfregistration',
};

export const oktaConfig = {
    refresh_token_scope_name: '',
    scope: 'openid',
    state: 'anything',
    grant_type: 'authorization_code',
    code_challenge_method: 'S256',
    response_type: 'code',
};
