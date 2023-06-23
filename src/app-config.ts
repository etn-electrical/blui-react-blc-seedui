export const config: Config = {
    envName: 'development',
    apiUrl:'https://api-dev.eaton.com/dermsaep/user-management/v1',
};

export type Config = {
    envName: string;
    apiUrl: string;
};
