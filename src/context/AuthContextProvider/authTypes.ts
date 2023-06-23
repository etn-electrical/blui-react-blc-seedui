type LoginResponseType = {
    adminRoleId: string,
    token: string,
}
export type AuthUIActions = {
    logIn: (response: LoginResponseType) => void,
    loadEula: () => string,
};
