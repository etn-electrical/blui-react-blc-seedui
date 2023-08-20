export type RoleLocationProps = {
    setAccess: (data: RoleSiteSelectionList) => void;
    access: Array<RoleSiteSelection>;
    siteDataList: Array<AdminRoleSiteOptions>;
    getSiteListDetails: () => void;
    roleList: Array<AdminRoleSiteOptions>;
    locationDataList: Array<AdminRoleSiteOptions>;
}

export type AdminRoleSiteOptions = {
    id: string,
    name: string,
    isDisable?: boolean,
    entityType?: string,
    canRegisterUser?: boolean,
    parentId?: string,
    parentName?: string,
}

export type RoleSiteSelection = {
    roles?: AdminRoleSiteOptions,
    sites?: Array<AdminRoleSiteOptions>
    isSiteVisible?: boolean
}

export type RoleSiteSelectionList = Array<RoleSiteSelection>

export type LocationSiteSelectionProps = {
    multiple?: boolean;
    id: string;
    options: Array<AdminRoleSiteOptions>;
    label: string;
    onValueSelect?: any;
    value?: any;
    optionDisabled?: any;
    disabled?: boolean;
    required?: boolean;
    isOptionEqualToValue?: (option: AdminRoleSiteOptions, value: AdminRoleSiteOptions) => boolean;
    allSelected?: boolean;
}

export type GetAdminInviteSitesApiProps = {
    adopterId: string,
    organizationId?: string,
    entityType: string
}


type SiteDetails = {
    roleId: string,
    sites: Array<({ siteId: string })>
}

export type PostAdminInviteApiProps = {
    adopterId: string,
    emailId: string,
    organizationId: string,
    adopterApplicationName: string,
    adopterApplicationRegistrationUrl: string,
    siteAccessDetails: Array<SiteDetails>
}

export type PostAdminUserRegisterApiProps = {
    invitationKey: string,
    password: string,
    userDetails: {
        firstName: string,
        lastName: string,
        phoneNumber?: string,

    }
}

export type LocationSiteCustomAttrProps = {
    entityType: string,
    address?: string,
    city?: string,
    state?: string,
    country?: string
}

export type LocationSiteProps = {
    id: string,
    name: string,
    custom_attributes: LocationSiteCustomAttrProps,
    parentId: string,
    parentName: string 
    canInviteUser: boolean 
    isDefaultOrganization: boolean
}

export type PostAdminInviteType = {
    status: number
}

export type PostAdminUserRegisterType = {
    status: number;
    response?: {
        data?: any
    }
}