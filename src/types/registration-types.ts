export type RegistrationPage = {
    name: string;
    pageTitle: string;
    pageBody: JSX.Element;
    canGoForward: boolean;
    canGoBack: boolean;
    lastScreen?: boolean;
};

export type AcceptEulaProps = {
    eulaAccepted: boolean;
    eulaContent?: string;
    onEulaChanged: (accepted: boolean) => void;
};

export type AccountDetailsWrapperProps = {
    description?: string;
};

export type AccountDetails = {
    firstName: string;
    lastName: string;
    phoneNumber?: string | number;
};

export type AccountDetailsProps = {
    onDetailsChanged: (details: AccountDetails) => void;
    initialDetails?: AccountDetails;
    onSubmit?: () => void;
};

export type CreatePasswordProps = {
    onPasswordChanged: (password: string) => void;
    initialPassword?: string;
    onSubmit?: () => void;
};

export type RegistrationCompleteProps = {
    firstName: string;
    lastName: string;
    email: string;
    responseData: any;
};

export type RegistrationResponseSites = {
    siteId: string;
    siteName: string;
    roles: Array<{ roleName: string }>;
    roleName: string;
};
