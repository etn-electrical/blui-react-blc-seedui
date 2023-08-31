export type Config = {
    envName: string;
    apiUrl: string;
    oktaUrl: string;
    apiKey: string;
    claimAppid: string;
};

export const config: Config = {
    envName: 'development',
    apiKey: 'euJMkV8aG2eyWbubPX1rAT6Gczm1vj9p',
    claimAppid: '0oa6c6ymssh6xpgS81d7',
    apiUrl: 'https://api-dev.eaton.com/dermsaep/user-management/v1',
    oktaUrl: 'https://eaton-perf.oktapreview.com',
};

export const appConfig = {
    inviteRegistrationUrl: '/inviteregistration',
    selfRegistrationUrl: '/selfregistration',
};

export const oktaConfig = {
    refresh_token_scope_name: '', // eslint-disable-line
    scope: 'openid',
    state: 'anything',
    grant_type: 'authorization_code', // eslint-disable-line
    code_challenge_method: 'S256', // eslint-disable-line
    response_type: 'code', // eslint-disable-line
};
