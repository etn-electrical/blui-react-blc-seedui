export type RegistrationPage = {
    name: string;
    pageTitle: string;
    pageBody: JSX.Element;
    canGoForward: boolean;
    canGoBack: boolean;
    actionDisable?: boolean;
    lastScreen?: boolean;
};

export type SelfInviteApiProps  = {
    adopterId: string,
    emailId: string,
    adopterApplicationName: string,
    adopterApplicationRegistrationUrl: string,
}

export type SelfInviteRegisterApiProps = {
        invitationKey: string,
        adopterId: string,
        password: string,
        userDetails: {
            firstName: string,
            lastName: string,
            phoneNumber: string
        },
        siteDetails: {
            siteName: string,
            siteAddress1: string,
            city: string,
            country: string,
            state: string
        }
}

export type CreateAccountProps = {
    initialEmail?: string;
    onEmailChanged: (email: string) => void;
    onSubmit?: () => void;
};