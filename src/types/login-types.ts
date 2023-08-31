export type LoginUserType = {
    status?: number;
    response?: {
        token?: string;
        adminRoleId?: string;
        id_token?: string; // eslint-disable-line
        sessionToken?: string;
        access_token?: string; // eslint-disable-line
    };
};

export type LoginRequestType = {
    user: string;
    password: string;
    applicationId: string;
    adopterId: string;
};

export type LoginOktaRequestType = {
    username: string;
    password: string;
    options: {
        multiOptionalFactorEnroll: boolean;
        warnBeforePasswordExpired: boolean;
    };
};

export type LoginOktaTokenGeneratorType = {
    code: string;
    redirectUri: string;
    clientid: string;
    codeVerifier: string;
};
