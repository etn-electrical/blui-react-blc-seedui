import { AccessRoleTypes, RoleAccessType, SiteTypes, LocationTypes } from '../types/admininvite-types';

export const getSiteAccessDetails = (dataList: RoleAccessType) => {
    const { orgnizationData, locationData, siteData } = dataList;
    const newAccessDetailsObj: { [key: string]: { siteId: string }[] } = {};

    orgnizationData.map((org: AccessRoleTypes) => {
        if (org.roleAccess) {
            newAccessDetailsObj[org.roleAccess] = newAccessDetailsObj[org.roleAccess]
                ? [...newAccessDetailsObj[org.roleAccess], { siteId: org.id }]
                : [{ siteId: org.id }];
        }
        const findlocation = locationData[org.id] || [];
        findlocation.map((loc: AccessRoleTypes) => {
            if (loc.roleAccess && org.roleAccess !== loc.roleAccess) {
                newAccessDetailsObj[loc.roleAccess] = newAccessDetailsObj[loc.roleAccess]
                    ? [...newAccessDetailsObj[loc.roleAccess], { siteId: loc.id }]
                    : [{ siteId: loc.id }];
            }
            const findsite = siteData[loc.id] || [];
            findsite.map((site: AccessRoleTypes) => {
                if (site.roleAccess && loc.roleAccess !== site.roleAccess) {
                    newAccessDetailsObj[site.roleAccess] = newAccessDetailsObj[site.roleAccess]
                        ? [...newAccessDetailsObj[site.roleAccess], { siteId: site.id }]
                        : [{ siteId: site.id }];
                }
            });
        });
    });
    return Object.keys(newAccessDetailsObj).map((key) => ({ roleName: key, sites: newAccessDetailsObj[key] }));
};

export const isUpdated = (visibleData: any) => {
    let flag = false;
    const { orgnizationData, locationData, siteData } = visibleData;
    orgnizationData.map((org: AccessRoleTypes, index: number) => {
        if (orgnizationData[index].roleAccess) flag = true;
    });
    Object.keys(locationData).map((key: string) => {
        locationData[key].map((loc: AccessRoleTypes, index: number) => {
            if (locationData[key][index].roleAccess) flag = true;
        });
    });
    Object.keys(siteData).map((key: string) => {
        siteData[key].map((site: AccessRoleTypes, index: number) => {
            if (siteData[key][index].roleAccess) flag = true;
        });
    });
    //setIsInviteEnabled(flag);
    return flag;
};

export const roleSelectionProcess = (
    value: string,
    data: AccessRoleTypes,
    newSiteData: SiteTypes,
    newLocationData: LocationTypes,
    newOrganizationData: AccessRoleTypes[]
) => {
    if (data.entityType === 'site') {
        const pos = newSiteData[data.parentId].findIndex((site: AccessRoleTypes) => site.id === data.id);
        newSiteData[data.parentId][pos].roleAccess = value;
    } else if (data.entityType === 'location') {
        const pos = newLocationData[data.parentId].findIndex((loc: AccessRoleTypes) => loc.id === data.id);
        newLocationData[data.parentId][pos].roleAccess = value;
        const associateSite = newSiteData[data.id] || [];
        associateSite.map((site: AccessRoleTypes) => (site.roleAccess = value));
    } else {
        const pos = newOrganizationData.findIndex((org: AccessRoleTypes) => org.id === data.id);
        newOrganizationData[pos].roleAccess = value;
        const associateLocation = newLocationData[data.id] || [];
        associateLocation.map((location: AccessRoleTypes) => (location.roleAccess = value));
        associateLocation.map((location: AccessRoleTypes) => {
            const associateSite = newSiteData[location.id] || [];
            associateSite.map((site: AccessRoleTypes) => (site.roleAccess = value));
        });
    }
};
