type LoginResponseType = {
    adminRoleId?: string;
    token?: string;
    id_token?: string;
};
export type AuthUIActions = {
    logIn: (response: LoginResponseType) => void;
    loadEula: () => string;
};
