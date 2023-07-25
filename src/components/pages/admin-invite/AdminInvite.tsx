import React, { useState, useEffect, useMemo } from 'react';
import { CardContent, Divider, CardHeader, Box, Typography, Button as Muibtn, Snackbar, Tooltip, Alert as MuiAlert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useInjectedUIContext } from '../../../context/AuthContextProvider';
import { Help as HelpIcon, CheckCircleOutline as CheckCircleOutlineIcon } from '@mui/icons-material';

import { ContainerComponent } from '../../common/container/Container';
import { TextField } from '../../common/textField/TextField';
import { Button } from '../../common/button/Button';
import { DialogTitleStyles, DialogContentStyles } from '../../../styles/RegistrationStyle';
import { AdminInviteStyles, ToolTipIconStyles, FullDividerStyles, AlertStyles, TextFieldStyles, SubTitleStyles, ToolTipStyles } from './AdminInviteStyle';
import { RoleLocation } from './RoleLocation';
import { RoleSiteSelection, AdminRoleSiteOptions, RoleSiteSelectionList, LocationSiteProps } from '../../../types/admininvite-types';
import CustomizedSnackbar from '../../common/snackbar/Snackbar';
import { getAdminInviteSite, postAdminInvite } from '../../../api/admin-invite-register';
import { EMAIL_REGEX, ERROR_MSG } from '../../../constants/registration-constants';
import { isValidEmail, sortRoles } from '../../../utils/common';
import { LocalStorage } from '../../../utils/local-storage';
import { UserRoles as UserRolesT } from '../../../context/AuthContextProvider/types';
import { ConfirmModal } from '../../common/modal/ConfirmModal';
import { rolesConfig } from '../../../config';

export const AdminInvite: React.FC = () => {
    const { authUIConfig } = useInjectedUIContext();
    const { adopterId, adopterApplicationName } = authUIConfig;
    const { organizationId } = LocalStorage.getBaseConfig();

    const url = new URL(window.location.href);
    const [emailInput, setEmailInput] = React.useState('');
    const [access, setAccess] = useState<RoleSiteSelectionList>([{ roles: {} as AdminRoleSiteOptions, sites: [], isSiteVisible: false }])
    const [siteDataList, setSiteDataList] = useState<any>([]);
    const [locationDataList, setLocationDataList] = useState<any>([]);
    const [inviteSuccess, setInviteSuccess] = useState<{ message: string }>({ message: '' })
    const [loading, setLoading] = useState<boolean>(false);
    const [modalData, setModalData] = useState<any>({ isOpen: false, email: '' })
    const [isopen, setIsOpen] = useState<boolean>(false);
    const theme = useTheme();

    const loggedInUserData = useMemo(() => {
        const { roleId = '', token = '' } = LocalStorage.getAuthTocken();
        return { roleId, token };
    }, []);


    const roleList = useMemo(() => {
        const { adopterAdmin, userRoles } = rolesConfig.roles;
        if (!loggedInUserData.roleId) return [];
        if (adopterAdmin.id === loggedInUserData.roleId) return sortRoles([adopterAdmin, ...userRoles]);
        const rolePos = userRoles.findIndex((item: UserRolesT) => item.id === loggedInUserData.roleId);
        if (rolePos !== -1 && userRoles[rolePos].canRegisterUser) {
            return sortRoles([...userRoles.slice(rolePos, userRoles.length)]);
        }
        return []
    }, [rolesConfig])

    const showEmailError = emailInput.length !== 0 && !isValidEmail(emailInput);

    useEffect(() => {
        setEmailInput('');
    }, [])

    const getSiteAccessDetails = () => access.map((selection: RoleSiteSelection) => {
        return {
            roleId: selection.roles.id,
            sites: selection.roles.entityType === 'organization' ? [{ siteId: organizationId }] : selection.sites.map((site: AdminRoleSiteOptions) => ({ siteId: site.id }))
        }
    })

    const getSiteList = async (entityType: string) => {
        const siteList: [LocationSiteProps] = await getAdminInviteSite({
            body: {
                adopterId,
                organizationId,
                entityType
            }, token: loggedInUserData.token
        }) as [LocationSiteProps];
        return siteList;
    }

    const getSiteListDetails = async () => {
        const [siteList, locationList] = await Promise.all([getSiteList('site'), getSiteList('location')])
        const filteredList = siteList ? siteList.filter((site: LocationSiteProps) => site.canInviteUser) : [];
        setSiteDataList(filteredList)
        const filteredLocationList = locationList ? locationList.filter((location: LocationSiteProps) => location.canInviteUser) : [];
        setLocationDataList(filteredLocationList)
    }

    const inviteUser = async () => {
        setLoading(true);
        const response: any = await postAdminInvite({
            body: {
                adopterId,
                adopterApplicationName,
                adopterApplicationRegistrationUrl: `${url.host}${rolesConfig.inviteRegistrationUrl}`,
                emailId: emailInput,
                organizationId,
                siteAccessDetails: getSiteAccessDetails()
            },
            token: loggedInUserData.token
        });
        if (response.status === 200) {
            handleClose(true);
        } else if (response.status === 409) {
            setModalData({ isOpen: true, email: emailInput });
        } else {
            setInviteSuccess({ message: ERROR_MSG });
        }
        setLoading(false);
        setEmailInput('');
        setAccess([{ roles: {} as any, sites: [], isSiteVisible: false }]);

    };

    const canInvite = (): boolean => {
        const selectedRoles = access.map((item: RoleSiteSelection) => item.roles.entityType);
        const latestRoles = access[access.length - 1];

        const result = EMAIL_REGEX.test(emailInput) && !!latestRoles.roles?.id &&
            (selectedRoles.includes('admin') || selectedRoles.includes('organization') || !!latestRoles.sites.length)
        return result;
    };

    const handleClose = (open: boolean) => {
        setIsOpen(open);
    };

    const toastMessage = () => {
        return (
            <Snackbar open={isopen} autoHideDuration={5000} onClose={() => handleClose(false)} sx={AlertStyles(theme)}>
                <MuiAlert onClose={() => handleClose(false)} severity="success" sx={{ width: '100%' }} icon={<CheckCircleOutlineIcon />}>
                    Invite Sent
                </MuiAlert>
            </Snackbar>
        )
    }


    return (
        <>
            <ConfirmModal
                onClose={() => setModalData({ isOpen: false, email: '' })}
                open={modalData.isOpen}
                title={'Account already exists'}
                content={`This email address already has an account with ${adopterApplicationName}. If you believe there is an error, please reach out to Brightlayerappsupport@eaton.com`}
                actions={<Muibtn onClick={() => setModalData({ isOpen: false, email: '' })}>Ok</Muibtn>}
            />
            <ContainerComponent loading={loading}>
                <CustomizedSnackbar
                    open={!!inviteSuccess.message.length}
                    message={inviteSuccess.message}
                    removeToast={(event: Event) => setInviteSuccess({ message: '' })} />
                <CardHeader
                    title={<Typography variant={'h6'} sx={{ fontWeight: 600 }}> Add User to Organization</Typography>}
                    sx={DialogTitleStyles(theme)}
                />
                <CardContent sx={DialogContentStyles(theme)}>
                    <Typography sx={SubTitleStyles(true)}>Grant access to new or existing users.
                        <Tooltip
                            title={<><p style={ToolTipStyles()}>Roles and Sites listed in the dropdown lists are determined by what permissions you have from your own Roles.</p> <p style={ToolTipStyles()}> You may see a limited selection of Roles or Sites to choose from because of this.</p></>}
                            placement="right"
                            arrow
                        ><HelpIcon sx={ToolTipIconStyles()} /></Tooltip></Typography>
                    <Typography sx={SubTitleStyles()}>Fields marked with an (*) are required.</Typography>

                    <Divider sx={FullDividerStyles(theme)} />
                    <TextField
                        required
                        label={'Email Address'}
                        id={'email'}
                        name={'email'}
                        type={'email'}
                        value={emailInput}
                        variant={'filled'}
                        onChange={(evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
                            const { value } = evt.target;
                            setEmailInput(value);
                        }}
                        sx={TextFieldStyles(theme, true)}
                        error={showEmailError}
                        helperText={showEmailError ? 'Please enter a valid email' : ''}
                    />
                    <RoleLocation
                        setAccess={setAccess}
                        access={access}
                        siteDataList={siteDataList}
                        getSiteListDetails={getSiteListDetails}
                        roleList={roleList}
                        locationDataList={locationDataList}
                    />
                </CardContent>
                <Divider />
                <Box sx={AdminInviteStyles(theme)} >
                    <Button
                        variant='contained'
                        id="invite"
                        disabled={!canInvite()}
                        color='primary'
                        label='Send Invite'
                        onClick={inviteUser}
                    />
                </Box>
                {toastMessage()}
            </ContainerComponent>
        </>
    )
}