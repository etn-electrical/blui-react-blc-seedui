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
    refresh_token_scope_name: '',           // eslint-disable-line
    scope: 'openid',
    state: 'anything',
    grant_type: 'authorization_code',       // eslint-disable-line
    code_challenge_method: 'S256',          // eslint-disable-line
    response_type: 'code',                  // eslint-disable-line
};
