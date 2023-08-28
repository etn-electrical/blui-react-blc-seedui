export type RegistrationPage = {
    name: string;
    pageTitle: string;
    pageBody: JSX.Element;
    canGoForward: boolean;
    canGoBack: boolean;
    actionDisable?: boolean;
    lastScreen?: boolean;
};

export type SelfInviteApiProps = {
    adopterId: string;
    emailId: string;
    adopterApplicationName: string;
    adopterApplicationRegistrationUrl: string;
};

export type SelfInviteRegisterApiProps = {
    invitationKey: string;
    adopterId: string;
    password: string;
    userDetails: {
        firstName: string;
        lastName: string;
        phoneNumber: string | number;
    };
    siteDetails: {
        siteName: string;
        siteAddress1: string;
        city: string;
        country: string;
        state: string;
    };
};

export type CreateAccountProps = {
    initialEmail?: string;
    onEmailChanged: (email: string) => void;
    onSubmit?: () => void;
};

export type PostSelfInviteType = {
    errorCode?: number;
};

export type PostSelfUserRegisterType = {
    status?: number;
    response?: {
        data?: {
            name: string;
            emailId: string;
            siteName: string;
            roleName: string[];
        };
    };
};

export type SiteOrgDetailsType = {
    address: string;
    address2: string;
    city: string;
    state: { name: string; id: string };
    postalCode: string;
    country: { name: string; id: string };
};

export type SelfInviteSuccessProps = {
    name: string;
    emailId: string;
    siteName: string;
    roleName: string[];
};
