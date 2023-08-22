import React, { useState, useEffect, useMemo, Fragment } from 'react';
import { Button, CardActions, CardContent, Divider, CardHeader, Box, Typography, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { LocationSiteProps, AccessRoleTypes, LocationTypes, SiteTypes } from '../../../types/admininvite-types';
import { useInjectedUIContext } from '../../../context/AuthContextProvider';
import { getAccessByEmail } from '../../../api/admin-invite-register';
import { ConfirmModal } from '../../common/modal/ConfirmModal';
import { isValidEmail } from '../../../utils/common';
import { ContainerComponent } from '../../common/container/Container';
import { DialogTitleStyles, DialogContentStyles } from '../../../styles/RegistrationStyle';
import { CopyTextFieldStyles, DiscardModal, CopyAccessModalStyle, SearchInputStyle, SearchCancelIconStyle, SearchIconStyle, SelectionContentStyles, LocationTextStyle, DialogButtonStyles, AdminInviteStyles, ToolTipIconStyles, FullDividerStyles, AlertStyles, TextFieldStyles, SubTitleStyles, ToolTipStyles, RoleContainerStyles } from './AdminInviteStyle';
import CustomizedSnackbar from '../../common/snackbar/Snackbar';
import { LocalStorage } from '../../../utils/local-storage';
import { ToggleActionComponent } from './ToggleActions';
import { GrantAccessHeader } from './GrantAccessHeader';

export const GrantAccess: React.FC<React.PropsWithChildren<any>> = (props: any) => {
    const { advancePage, accessList, email, inviteUser } = props;
    const { authUIConfig } = useInjectedUIContext();
    const { adopterId, adopterApplicationName } = authUIConfig;
    const [searchString, setSearchString] = useState('');
    const [visibleData, setVisibleData] = useState<any>({ siteData: {}, locationData: {}, orgnizationData: [] });
    const [filteredList, setFilteredList] = useState([]);
    const [searchDataList, setSearchDataList] = useState<any>([]);
    const [copyAccessModal, setCopyAccessModal] = useState<any>(false)
    const [discardModal, setDiscardModal] = useState<any>(false);
    const [isInviteEnabled, setIsInviteEnabled] = useState<boolean>(false);
    const [copyAccessData, setCopyAccessData] = useState<any>([]);
    const [copyAccessType, setCopyAccessType] = useState<any>([]);
    const [rolesChanged, setRolesChanged] = useState(false);
    const [expand, setExpand] = useState([])
    const [emailInput, setEmailInput] = React.useState('');
    const [inviteSuccess, setInviteSuccess] = useState<{ message: string }>({ message: '' })
    const [loading, setLoading] = useState<boolean>(false);
    const theme = useTheme();
    const showEmailError = emailInput.length !== 0 && !isValidEmail(emailInput);

    const loggedInUserData = useMemo(() => {
        const { roleId = '', token = '' } = LocalStorage.getAuthTocken();
        return { roleId, token };
    }, []);


    useEffect(() => {
        if (copyAccessData.length) {
            roleSelectionCopy()
        }
    }, [copyAccessData]);


    useEffect(() => {
        if (searchString.length >= 1) {
            var res = searchDataList.filter(({ name }: AccessRoleTypes) => name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
            setFilteredList(res);
        }
    }, [searchString, searchDataList]);

    useEffect(() => {
        const { siteData, locationData, orgnizationData } = visibleData;
        if (searchString.length || !searchDataList.length) {
            const searchNewList = [];
            searchNewList.push(...orgnizationData);
            Object.keys(locationData).map((key: string) => searchNewList.push(...locationData[key]))
            Object.keys(siteData).map((key: string) => searchNewList.push(...siteData[key]))
            setSearchDataList(searchNewList)
        }
        isUpdated();
    }, [visibleData]);

    useEffect(() => {
        const { orgList, locList, siteList } = accessList;
        setVisibleData({ siteData: siteList, locationData: locList, orgnizationData: orgList })
    }, [accessList])

    const roleSelectionProcess = (value: string, data: AccessRoleTypes, newSiteData: SiteTypes, newLocationData: LocationTypes, newOrganizationData: AccessRoleTypes[]) => {
        if (data.entityType === 'site') {
            const pos = newSiteData[data.parentId].findIndex((site: AccessRoleTypes) => site.id === data.id);
            newSiteData[data.parentId][pos].roleAccess = value;
        } else if (data.entityType === 'location') {
            const pos = newLocationData[data.parentId].findIndex((loc: AccessRoleTypes) => loc.id === data.id);
            newLocationData[data.parentId][pos].roleAccess = value;
            const associateSite = newSiteData[data.id] || [];
            associateSite.map((site: AccessRoleTypes) => site.roleAccess = value)
        } else {
            const pos = newOrganizationData.findIndex((org: AccessRoleTypes) => org.id === data.id);
            newOrganizationData[pos].roleAccess = value;
            const associateLocation = newLocationData[data.id] || [];
            associateLocation.map((location: AccessRoleTypes) => location.roleAccess = value);
            associateLocation.map((location: AccessRoleTypes) => {
                const associateSite = newSiteData[location.id] || [];
                associateSite.map((site: AccessRoleTypes) => site.roleAccess = value)
            });
        }
    }

    const roleSelection = (value: string, data: any) => {
        setVisibleData((roleList: any) => {
            const newSiteData = JSON.parse(JSON.stringify(roleList.siteData))
            const newLocationData = JSON.parse(JSON.stringify(roleList.locationData))
            const newOrganizationData = JSON.parse(JSON.stringify(roleList.orgnizationData))
            roleSelectionProcess(value, data, newSiteData, newLocationData, newOrganizationData);
            return { siteData: newSiteData, locationData: newLocationData, orgnizationData: newOrganizationData }
        })

        setRolesChanged(true);
    }

    const roleSelectionCopy = () => {
        const { orgList, locList, siteList } = accessList;

        const newSiteData = JSON.parse(JSON.stringify(siteList))
        const newLocationData = JSON.parse(JSON.stringify(locList))
        const newOrganizationData = JSON.parse(JSON.stringify(orgList))
        copyAccessData.map((data: any) => {
            const findSite = searchDataList.find((site: any) => site.id === data.siteId)
            if (findSite) roleSelectionProcess(data.roleName, findSite, newSiteData, newLocationData, newOrganizationData);
        })
        setVisibleData({ siteData: newSiteData, locationData: newLocationData, orgnizationData: newOrganizationData })

    }

    const isUpdated = () => {
        let flag = false;
        const { orgnizationData, locationData, siteData } = visibleData;
        orgnizationData.map((org: any, index: number) => {
            if (orgnizationData[index].roleAccess) flag = true;
        })
        Object.keys(locationData).map((key: string) => {
            locationData[key].map((loc: any, index: number) => {
                if (locationData[key][index].roleAccess) flag = true;
            })
        })
        Object.keys(siteData).map((key: string) => {
            siteData[key].map((site: any, index: number) => {
                if (siteData[key][index].roleAccess) flag = true;
            })
        })
        setIsInviteEnabled(flag);
    }

    const toggleActions = (data: any, index: number, parentOpt?: any) => {
        return <ToggleActionComponent
            data={data}
            index={index}
            roleSelection={roleSelection}
            parentOpt={parentOpt}
            searchDataList={searchDataList}
            searchString={searchString}
        />
    }

    const toggleElement = (id: string) => {
        const pos = expand.indexOf(id);
        if (pos !== -1) {
            expand.splice(pos, 1);
            setExpand([...expand]);
        } else {
            setExpand([...expand, id]);
        }
    }

    const copyUserAccess = async (myAccess?: boolean) => {
        setRolesChanged(false);
        const { email } = LocalStorage.getRememberMe();
        setCopyAccessModal(false);

        setLoading(true)
        const copyAccess: any = await getAccessByEmail({
            adopterId, token: loggedInUserData.token, email: !myAccess ? emailInput : email
        }) as any;
        setCopyAccessData(copyAccess)
        setLoading(false)
    }

    const roleNameActions = (site: AccessRoleTypes, index: number, parent?: AccessRoleTypes) => {
        return (<>
        <Typography sx={LocationTextStyle()}> {site.name}</Typography>
            {toggleActions(site, index, parent)}
        </>)
    }


    return (
        <>
            <ConfirmModal
                onClose={() => setCopyAccessModal(false)}
                customStyle={CopyAccessModalStyle}
                open={copyAccessModal}
                title={<>Copy Access from...<CloseIcon onClick={() => setCopyAccessModal(false)} sx={{ position: 'absolute', right: 8, top: 8, cursor: 'pointer' }} /></>}
                content={<>
                    <TextField
                        required
                        label={'Email Address'}
                        id={'email'}
                        value={emailInput}
                        variant={'filled'}
                        onChange={(evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
                            const { value } = evt.target;
                            setEmailInput(value);
                        }}
                        sx={CopyTextFieldStyles(theme)}
                        error={showEmailError}
                        helperText={showEmailError ? 'Please enter a valid email' : ''}
                    />
                    <Button
                        variant='contained'
                        id="copy"
                        color='primary'
                        disabled={!isValidEmail(emailInput)}
                        sx={{ marginLeft: '20px' }}
                        onClick={() => copyUserAccess()}
                    >Copy</Button>
                </>}
            />

            <ConfirmModal
                customStyle={DiscardModal}

                onClose={() => setDiscardModal(false)}
                open={discardModal}
                title={'Discard changes?'}
                content={`Your progress will be lost.`}
                actions={<><Button
                    id="invite"
                    color='primary'
                    onClick={() => setDiscardModal(false)}
                >Cancel</Button>
                    <Button
                        id="invite"
                        color='error'
                        onClick={() => advancePage(-1)}
                    >Discard</Button></>}
            />

            <ContainerComponent loading={loading} style={{ maxWidth: '600px', maxHeight: '765px' }}>
                <CustomizedSnackbar
                    open={inviteSuccess.message.length}
                    message={inviteSuccess.message}
                    removeToast={(event: Event) => setInviteSuccess({ message: '' })} />
                <CardHeader
                    title={<Typography variant={'h6'} sx={{ fontWeight: 600 }}> Grant Access</Typography>}
                    sx={DialogTitleStyles(theme)}
                />
                <CardContent sx={DialogContentStyles(theme)}>
                    <Typography sx={SubTitleStyles(true)}>
                        {email.length > 1 ?
                            `Grant ${email.length} users access to different organizations and groups.` :
                            `Grant this user (${email.join(',')}) access to different organizations and groups.`
                        }
                    </Typography>

                    <Divider sx={FullDividerStyles(theme)} />
                    <GrantAccessHeader searchString={searchString} setSearchString={setSearchString} setCopyAccessType={setCopyAccessType} copyUserAccess={copyUserAccess} setCopyAccessModal={setCopyAccessModal} />
                    <CardContent sx={SelectionContentStyles(theme)}>
                        {searchString.length < 1 &&
                            visibleData?.orgnizationData?.map((item: AccessRoleTypes, index: number) => <Fragment key={index}>
                                <Box sx={RoleContainerStyles()}>
                                    {visibleData?.locationData[item.id] && visibleData?.locationData[item.id].length ? <Typography sx={{ color: '#727E84', display: 'flex' }} onClick={() => toggleElement(item.id)}> {!expand.indexOf(item.id) ? <ArrowDropDownIcon /> : <ArrowRightIcon />}</Typography> : <Typography sx={{ width: '25px' }} />}
                                    {roleNameActions(item, index)}

                                </Box>
                                <Typography sx={{ display: expand.indexOf(item.id) === -1 ? 'none' : 'block', marginLeft: '16px' }}>
                                    {visibleData?.locationData[item.id]?.map((location: AccessRoleTypes, index: number) => <Fragment key={index}>
                                        <Box sx={RoleContainerStyles()}>
                                            {visibleData.siteData[location.id] && visibleData.siteData[location.id].length ? <Typography sx={{ color: '#727E84', display: 'flex' }} onClick={() => toggleElement(location.id)}>{expand.indexOf(location.id) != -1 ? <ArrowDropDownIcon /> : <ArrowRightIcon />}</Typography> : <Typography sx={{ width: '25px' }} />}
                                            {roleNameActions(location, index, item)}
                                        </Box>
                                        <Typography sx={{ display: expand.indexOf(location.id) === -1 ? 'none' : 'block', marginLeft: '40px' }}>
                                            {visibleData.siteData[location.id]?.map((site: AccessRoleTypes, index: number) => <Fragment key={index}>
                                                <Box sx={RoleContainerStyles()}>
                                                    {roleNameActions(site, index, location)}
                                                </Box>
                                            </Fragment>

                                            )}
                                        </Typography>
                                    </Fragment>

                                    )}
                                </Typography>
                            </Fragment>
                            )
                        }
                        {
                            searchString.length >= 1 && filteredList.map((item: any, index: number) => <>
                                <Box key={`search${index}`} sx={{ display: 'flex', height: 24, alignItems: 'center', marginBottom: '8px' }}>
                                    <Typography sx={{ width: '25px' }} />
                                    <Typography sx={LocationTextStyle()}> {item.name}</Typography>
                                    {toggleActions(item, index)}

                                </Box>
                            </>
                            )
                        }


                    </CardContent>
                </CardContent>
                <CardActions sx={AdminInviteStyles(theme)}>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={(): void => {
                            isInviteEnabled ? setDiscardModal(true) : advancePage(-1)
                        }}
                        sx={DialogButtonStyles()}
                    > Back</Button>

                    <Button
                        variant="contained"
                        color="primary"
                        data-testid="nextAction"
                        disableElevation
                        disabled={!isInviteEnabled}
                        onClick={(): void => inviteUser({ visibleData, setLoading, copyAccessType, rolesChanged, emailInput })}
                        sx={DialogButtonStyles()}
                    > Invite </Button>

                </CardActions>

            </ContainerComponent>
        </>
    )
}