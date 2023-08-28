export type RoleLocationProps = {
    setAccess: (data: RoleSiteSelectionList) => void;
    access: RoleSiteSelection[];
    siteDataList: AdminRoleSiteOptions[];
    getSiteListDetails: () => void;
    roleList: AdminRoleSiteOptions[];
    locationDataList: AdminRoleSiteOptions[];
};

export type AdminRoleSiteOptions = {
    id: string;
    name: string;
    isDisable?: boolean;
    entityType?: string;
    canRegisterUser?: boolean;
    parentId?: string;
    parentName?: string;
};

export type RoleSiteSelection = {
    roles?: AdminRoleSiteOptions;
    sites?: AdminRoleSiteOptions[];
    isSiteVisible?: boolean;
};

export type RoleSiteSelectionList = RoleSiteSelection[];

export type GetAdminInviteSitesApiProps = {
    adopterId: string;
    organizationId?: string;
    entityType: string;
};

type SiteDetails = {
    roleId: string;
    sites: Array<{ siteId: string }>;
};

export type PostAdminInviteApiProps = {
    adopterId: string;
    emailId: string;
    organizationId: string;
    adopterApplicationName: string;
    adopterApplicationRegistrationUrl: string;
    siteAccessDetails: SiteDetails[];
};

export type PostAdminUserRegisterApiProps = {
    invitationKey: string;
    password: string;
    userDetails: {
        firstName: string;
        lastName: string;
        phoneNumber?: string | number;
    };
};

export type LocationSiteCustomAttrProps = {
    entityType: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
};

export type LocationSiteProps = {
    id: string;
    name: string;
    parentId: string;
    parentName: string;
    canInviteUser: boolean;
    isDefaultOrganization: boolean;
};

export type PostAdminInviteType = {
    status: number;
};

export type PostAdminUserRegisterType = {
    status: number;
    response?: {
        data?: any;
    };
};

export type AccessRoleTypes = {
    canInviteUser: boolean;
    entityType: string;
    id: string;
    name: string;
    parentId: string;
    roleName: string;
    roleAccess?: string;
    Sites?: AccessRoleTypes[];
};

export type LocationTypes = {
    [key: string]: AccessRoleTypes[];
};

export type SiteTypes = {
    [key: string]: AccessRoleTypes[];
};

export type SiteAccessDetailsType = {
    roleName: string;
    sites: Array<{ siteId: string }>;
};

export type RoleAccessType = {
    orgnizationData: AccessRoleTypes[];
    locationData: LocationTypes;
    siteData: SiteTypes;
};

export type InviteUserPropType = {
    copyAccessType: string;
    emailInput: string;
    rolesChanged: boolean;
    setLoading: (open: boolean) => void;
    visibleData: RoleAccessType;
};

export type PostAdminInviteResponseType = {
    response?: { message?: string };
    status: number;
};

export type AccessListTypes = {
    orgList: AccessRoleTypes[];
    locList: LocationTypes;
    siteList: SiteTypes;
};

export type CopyAccessTypes = {
    roleName: string;
    siteId: string;
};

export type CopyAccessResponseType = {
    errorCode: number;
    errorId: string;
    errorNumber: number;
    generatedTime: string;
    message: string;
};

export type AdminInviteRequestType = {
    adopterId: string;
    adopterApplicationName: string;
    adopterApplicationRegistrationUrl: string;
    usersToInvite: Array<{ emailId: string }>;
    myAccess: boolean;
    someOneElseAccess: boolean;
    accessEmailId: string;
    siteAccessDetails: SiteAccessDetailsType[];
};

export type GrantAccessPropsTypes = {
    accessList: AccessListTypes;
    advancePage: (active: number) => void;
    email: string[];
    inviteUser: (data: InviteUserPropType) => void;
};
