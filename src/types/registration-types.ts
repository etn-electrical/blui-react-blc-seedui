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
export type AccountDetailsProps = {
    onDetailsChanged: (details: any) => void;
    initialDetails?: any;
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