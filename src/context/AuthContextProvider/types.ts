import { AuthUIActions } from './authTypes';


export type UserRoles = {
    id: string;
    name: string;
    canRegisterUser?: boolean;
    entityType: string;
    additionalRoleIds?: Array<string>,
    order?: number
}

type AuthUIConfig = {
    adopterId: string;
    adopterApplicationName: string;
    applicationId: string;
    inviteLimitation?: boolean;
    inviteCount?: number;
}
type AuthUIContextProviderProps = {
    authUIConfig: AuthUIConfig,
    authActions?: () => AuthUIActions,
    showSelfRegistration?: boolean,
    showInviteRegistration?: boolean
};

export type {
    AuthUIContextProviderProps,
};
