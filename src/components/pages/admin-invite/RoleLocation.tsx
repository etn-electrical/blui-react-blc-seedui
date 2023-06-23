import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

import { AutoComplete } from '../../common/autocomplete/AutoComplete';
import { LocationSiteSelection } from './LocationSiteSelection';
import { RoleSiteSelection, AdminRoleSiteOptions, RoleLocationProps } from '../../../types/admininvite-types';
import { ADMIN_CONSTANTS } from '../../../constants/registration-constants';
import { RoleLocationContainer, RoleLocationAction } from './AdminInviteStyle';


export const RoleLocation: React.FC<React.PropsWithChildren<RoleLocationProps>> = (props) => {
    const { setAccess, access, siteDataList, getSiteListDetails, roleList, locationDataList } = props;
    const [isVisible, setIsVisible] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        isAddVisible();
    }, [access])

    const onRoleSelect = (role: AdminRoleSiteOptions, position: number) => {
        if (role && role.id && ADMIN_CONSTANTS.includes(role.entityType)) {
            setAccess([{ roles: role, sites: [], isSiteVisible: false }])
        } else {
            const updatedAccess = [...access.slice(0, position)];
            updatedAccess[position] = { roles: role || {} as AdminRoleSiteOptions, sites: [], isSiteVisible: !!role };
            setAccess(updatedAccess)
            role && role.entityType && getSiteListDetails() 
        }
    }

    const onSiteSelect = (options: Array<AdminRoleSiteOptions>, reason: string, position: number, items: Array<AdminRoleSiteOptions>) => {
        const updatedAccess = [...access];
        if (reason === "selectOption" || reason === "removeOption") {
            if (options.find(option => option.id === "select-all")) {
                updatedAccess[position].sites = updatedAccess[position].sites.length && updatedAccess[position].sites.length === options.length - 1 ? [] : items;
            } else {
                updatedAccess[position].sites = options || [];
            }
        } else if (reason === "clear") {
            updatedAccess[position].sites = options || [];
        }
        setAccess(updatedAccess)
        isAddVisible()
    }

    const getLocationList = (data: Array<AdminRoleSiteOptions>) => {
        const locationList: Array<AdminRoleSiteOptions> = [];
        data.map((item: AdminRoleSiteOptions) => {
            if (!locationList.find((location: AdminRoleSiteOptions) => location.id === item.parentId)) {
                locationList.push({ id: item.parentId, name: item.parentName })
            }
        })
        return [...locationList];
    }

    const previousSelectedSite = (data: Array<AdminRoleSiteOptions>, locations: Array<AdminRoleSiteOptions>) => {
        return data.filter((item: AdminRoleSiteOptions) => locations.find((location: AdminRoleSiteOptions) => item.parentId === location.id))
    }

    const locationBasedSite = (location: Array<AdminRoleSiteOptions>, sites: Array<AdminRoleSiteOptions>) => {
        return location.filter((item: AdminRoleSiteOptions) => sites.find((site: AdminRoleSiteOptions) => site.parentId === item.id))
    }



    const siteMenuList = (data: RoleSiteSelection, index: number) => {
        const menuItems = siteDataList || [];
        let selectedSite: Array<AdminRoleSiteOptions> = [];
        access.map((role: RoleSiteSelection, pos: number) => {
            if (index !== pos) {
                if (role.roles.entityType === 'site') selectedSite = [...selectedSite, ...role.sites]
                if (role.roles.entityType === 'location' && role.roles.canRegisterUser)
                    selectedSite = [...selectedSite, ...previousSelectedSite(menuItems, role.sites)]

                if (!data.roles?.canRegisterUser && role.roles.entityType === 'location' && !role.roles.canRegisterUser)
                    selectedSite = [...selectedSite, ...previousSelectedSite(menuItems, role.sites)]
            }
        })
        const filteredMenu = menuItems.filter((item: AdminRoleSiteOptions) => {
            return data.sites && data.sites.find((role: AdminRoleSiteOptions) => role.id === item.id) || !selectedSite.find((role: AdminRoleSiteOptions) => role.id === item.id)
        });
        return filteredMenu;
    }

    const locationMenuList = (data: RoleSiteSelection, index: number) => {
        const menuItems = getLocationList(siteDataList || []);
        let selectedLocation: Array<AdminRoleSiteOptions> = [];
        access.map((role: RoleSiteSelection, pos: number) => {
            if (index !== pos) {
                if (role.roles.entityType === 'location') selectedLocation = [...selectedLocation, ...role.sites];
                if (role.roles.entityType === 'site' && role.roles.canRegisterUser)
                    selectedLocation = [...selectedLocation, ...locationBasedSite(menuItems, role.sites)]
                if (!data.roles?.canRegisterUser && role.roles.entityType === 'site' && !role.roles.canRegisterUser)
                    selectedLocation = [...selectedLocation, ...locationBasedSite(menuItems, role.sites)]
            }
        })
        const filteredMenu = menuItems.filter((item: AdminRoleSiteOptions) => {
            return data.sites && data.sites.find((role: AdminRoleSiteOptions) => role.id === item.id) || !selectedLocation.find((role: AdminRoleSiteOptions) => role.id === item.id)
        });
        const filterCanInviteUser = filteredMenu.filter((item: AdminRoleSiteOptions) => {
            return locationDataList.find((location: AdminRoleSiteOptions) => location.id === item.id)
        })
        return filterCanInviteUser;
    }

    const siteOptionsList = (data: RoleSiteSelection, index: number) => {
        if (data.roles?.entityType === 'location') {
            return locationMenuList(data, index)
        } else {
            return siteMenuList(data, index)
        }
    }
    const isAddVisible = (): void => {
        const VisibleRoles = roleOptionsList(access.length).filter((role: AdminRoleSiteOptions) => !role.isDisable)
        setIsVisible(!!access[access.length - 1].roles?.id && !!(access[access.length - 1].sites.length && VisibleRoles.length))
    }

    const onAddNewRole = (): void => {
        access.push({ roles: {} as AdminRoleSiteOptions, sites: [], isSiteVisible: false })
        setAccess([...access]);
        isAddVisible();
    }

    const onRemoveRole = (): void => {
        access.pop();
        setAccess([...access]);
        isAddVisible();
    }

    const roleOptionsList = (pos: number) => {
        const selectedEntityType: Array<string> = []
        access.map((item: RoleSiteSelection, index: number) => {
            if (pos !== index && item.roles?.entityType) selectedEntityType.push(item.roles?.entityType)
        })
        const currentRole = access[pos]?.roles;

        const newRoleList = roleList.filter((item: AdminRoleSiteOptions) =>
            (currentRole?.id && currentRole.id === item.id) ||
            ((ADMIN_CONSTANTS.includes(item.entityType) && !(selectedEntityType.includes('site') || selectedEntityType.includes('location'))) ||
                !ADMIN_CONSTANTS.includes(item.entityType)) &&
            !access.find((role: RoleSiteSelection) => role.roles.id === item.id))

        const visibleRoleList = newRoleList.filter((item: AdminRoleSiteOptions) => {
            if (item.entityType === 'location' && siteDataList.length) {
                return locationMenuList({ roles: item }, pos).length
            } else if (item.entityType === 'site' && siteDataList.length) {
                return siteMenuList({ roles: item }, pos).length
            }
            return true;
        })
        return visibleRoleList;
    }

    return (
        <>
            {access.map((item: RoleSiteSelection, index: number) =>
                <Box sx={RoleLocationContainer(theme)}>
                    <AutoComplete
                        required
                        id={`Role`}
                        label={'Roles'}
                        options={roleOptionsList(index)}
                        value={item.roles?.id ? item.roles : null}
                        onValueSelect={(opt: AdminRoleSiteOptions) => onRoleSelect(opt, index)}
                        optionDisabled={(opt: AdminRoleSiteOptions) => opt.isDisable}
                        sx={{ mb: '16px' }}
                        readOnly={!(index === access.length - 1)}
                    />
                    {item.isSiteVisible &&
                        <LocationSiteSelection
                            multiple
                            required
                            disabled={ADMIN_CONSTANTS.includes(item.roles?.entityType as string)}
                            id={'Site'}
                            label={item.roles?.entityType === 'site' ? `Sites` : 'Location'}
                            options={siteOptionsList(item, index)}
                            value={item.sites as any}
                            onValueSelect={(opt: Array<AdminRoleSiteOptions>, reason: string) => onSiteSelect(opt, reason, index, siteOptionsList(item, index))}
                            isOptionEqualToValue={(option: AdminRoleSiteOptions, newValue: AdminRoleSiteOptions) => {
                                return option.id === newValue.id;
                            }}
                        />
                    }
                </Box>
            )
            }

            <Box style={{ paddingTop: 16 }} >
                    <Button sx={RoleLocationAction(!isVisible)}
                        color="primary" variant="contained" onClick={onAddNewRole}
                        data-testid="addRole"
                        >
                        <Add fontSize="small" sx={{ mr: '2px', ml: '-2px' }} />  Add a New Role
                    </Button>
                {access.length > 1 &&
                    <Button sx={RoleLocationAction(false, true)}
                        color="primary" variant="contained" onClick={onRemoveRole}
                        data-testid="removeRole"
                        >
                        <Delete fontSize="small" sx={{ mr: '2px' }} /> Remove this Role
                    </Button>
                }
            </Box>
        </>
    )
}