type LoginResponseType = {
    adminRoleId?: string;
    token?: string;
    id_token?: string;     // eslint-disable-line
};
export type AuthUIActions = {
    logIn: (response: LoginResponseType) => void;
    loadEula: () => string;
};
