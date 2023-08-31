export type UserDataType = {
    expirationString: string;
    token: string;
    roleId: string;
};

export type BaseInfoType = {
    organizationId: string;
    adopterId: string;
};

export type RememberMeType = {
    rememberMe: boolean;
    email: string;
};

export type CodeVerifierType = {
    codeVerifier: string;
    codeChallenge: string;
};
