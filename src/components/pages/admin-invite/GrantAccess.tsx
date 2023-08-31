import React, { useState, useEffect, useMemo, Fragment } from 'react';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {
    GrantAccessPropsTypes,
    CopyAccessResponseType,
    CopyAccessTypes,
    RoleAccessType,
    InviteUserPropType,
    AccessListTypes,
    AccessRoleTypes,
} from '../../../types/admininvite-types';
import { useInjectedUIContext } from '../../../context/AuthContextProvider';
import { getAccessByEmail } from '../../../api/admin-invite-register';
import { ConfirmModal } from '../../common/modal/ConfirmModal';
import { isUpdated, roleSelectionProcess } from '../../../utils/inviteUtils';
import { isValidEmail } from '../../../utils/common';
import { ContainerComponent } from '../../common/container/Container';
import { DialogTitleStyles, DialogContentStyles } from '../../../styles/RegistrationStyle';
import {
    CopyTextFieldStyles,
    DiscardModal,
    CopyAccessModalStyle,
    SelectionContentStyles,
    LocationTextStyle,
    DialogButtonStyles,
    AdminInviteStyles,
    FullDividerStyles,
    SubTitleStyles,
    RoleContainerStyles,
} from './AdminInviteStyle';
import { LocalStorage } from '../../../utils/local-storage';
import { ToggleActionComponent } from './ToggleActions';
import { GrantAccessHeader } from './GrantAccessHeader';

export const GrantAccess: React.FC<React.PropsWithChildren<GrantAccessPropsTypes>> = (props: GrantAccessPropsTypes) => {
    const { advancePage, accessList, email, inviteUser } = props;
    const { authUIConfig } = useInjectedUIContext();
    const { adopterId } = authUIConfig;
    const [searchString, setSearchString] = useState('');
    const [visibleData, setVisibleData] = useState<RoleAccessType>({
        siteData: {},
        locationData: {},
        orgnizationData: [],
    });
    const [filteredList, setFilteredList] = useState<AccessRoleTypes[]>([]);
    const [searchDataList, setSearchDataList] = useState<AccessRoleTypes[]>([]);
    const [copyAccessModal, setCopyAccessModal] = useState<boolean>(false);
    const [discardModal, setDiscardModal] = useState<boolean>(false);
    const [isInviteEnabled, setIsInviteEnabled] = useState<boolean>(false);
    const [copyAccessType, setCopyAccessType] = useState<string>('');
    const [rolesChanged, setRolesChanged] = useState(false);
    const [expand, setExpand] = useState([]);
    const [emailInput, setEmailInput] = React.useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const [copyErrorMessage, setCopyErrorMessage] = useState('');
    const theme = useTheme();
    const showEmailError = emailInput.length !== 0 && !isValidEmail(emailInput);

    const { token = '' } = LocalStorage.getAuthTocken();

    useEffect(() => {
        if (searchString.length >= 1) {
            var res = searchDataList.filter(
                ({ name }: AccessRoleTypes) => name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
            );
            setFilteredList(res);
        }
    }, [searchString, searchDataList]);

    useEffect(() => {
        const { siteData, locationData, orgnizationData } = visibleData;
        if (searchString.length || !searchDataList.length) {
            const searchNewList = [...orgnizationData];
            Object.keys(locationData).map((key: string) => searchNewList.push(...locationData[key]));
            Object.keys(siteData).map((key: string) => searchNewList.push(...siteData[key]));
            setSearchDataList(searchNewList);
        }
        setIsInviteEnabled(isUpdated(visibleData));
    }, [visibleData, searchString]);

    useEffect(() => {
        const { orgList, locList, siteList } = accessList;
        setVisibleData({ siteData: siteList, locationData: locList, orgnizationData: orgList });
    }, [accessList]);

    const roleSelection = (value: string, data: AccessRoleTypes) => {
        setVisibleData((roleList: RoleAccessType) => {
            const { siteData, locationData, orgnizationData } = JSON.parse(JSON.stringify(roleList));
            roleSelectionProcess(value, data, siteData, locationData, orgnizationData);
            return { siteData, locationData, orgnizationData };
        });

        setRolesChanged(true);
    };

    const roleSelectionCopy = (copyAccessData: CopyAccessTypes[]) => {
        const { orgList, locList, siteList } = JSON.parse(JSON.stringify(accessList));
        copyAccessData.map((data: CopyAccessTypes) => {
            if (data.roleName === 'AdopterAdmin') {
                searchDataList.map((site: AccessRoleTypes) => {
                    roleSelectionProcess('Admin', site, siteList, locList, orgList);
                });
            } else {
                const findSite = searchDataList.find((site: AccessRoleTypes) => site.id === data.siteId);
                if (findSite) roleSelectionProcess(data.roleName, findSite, siteList, locList, orgList);
            }
        });
        setVisibleData({ siteData: siteList, locationData: locList, orgnizationData: orgList });
    };

    const toggleActions = (data: AccessRoleTypes, parentOpt?: AccessRoleTypes) => {
        return (
            <ToggleActionComponent
                data={data}
                roleSelection={roleSelection}
                parentOpt={parentOpt}
                searchDataList={searchDataList}
                searchString={searchString}
            />
        );
    };

    const toggleElement = (id: string) => {
        const pos = expand.indexOf(id);
        if (pos !== -1) {
            expand.splice(pos, 1);
            setExpand([...expand]);
        } else {
            setExpand([...expand, id]);
        }
    };

    const copyUserAccess = async (myAccess?: boolean) => {
        const { email } = LocalStorage.getRememberMe();
        setLoading(true);
        setCopyAccessModal(false);
        const copyAccess: CopyAccessTypes[] | CopyAccessResponseType = await getAccessByEmail({
            adopterId,
            token,
            email: !myAccess ? emailInput : email,
        });
        if (copyAccess.length) {
            roleSelectionCopy(copyAccess);
            setRolesChanged(false);
        }
        if ('errorCode' in copyAccess && copyAccess.errorCode === 404) {
            setCopyErrorMessage('User not found.');
            setCopyAccessModal(true);
        }
        setLoading(false);
    };

    const roleNameActions = (site: AccessRoleTypes, parent?: AccessRoleTypes) => (
        <>
            <Typography sx={LocationTextStyle()}> {site.name}</Typography>
            {toggleActions(site, parent)}
        </>
    );

    return (
        <>
            <ConfirmModal
                onClose={() => setCopyAccessModal(false)}
                customStyle={CopyAccessModalStyle}
                open={copyAccessModal}
                title={
                    <>
                        Copy Access from...
                        <CloseIcon
                            onClick={() => setCopyAccessModal(false)}
                            sx={{ position: 'absolute', right: 8, top: 8, cursor: 'pointer' }}
                        />
                    </>
                }
                content={
                    <>
                        <TextField
                            required
                            label={'Email Address'}
                            id={'email'}
                            value={emailInput}
                            variant={'filled'}
                            onChange={(evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
                                setCopyErrorMessage('');
                                setEmailInput(evt.target.value);
                            }}
                            sx={CopyTextFieldStyles(theme)}
                            error={!!(showEmailError || copyErrorMessage.length > 0)}
                            helperText={
                                copyErrorMessage
                                    ? copyErrorMessage
                                    : showEmailError
                                    ? 'Please enter legit email address???'
                                    : ''
                            }
                        />
                        <Button
                            variant="contained"
                            id="copy"
                            color="primary"
                            disabled={!isValidEmail(emailInput)}
                            sx={{ marginLeft: '20px' }}
                            onClick={() => copyUserAccess()}
                        >
                            Copy
                        </Button>
                    </>
                }
            />

            <ConfirmModal
                customStyle={DiscardModal}
                onClose={() => setDiscardModal(false)}
                open={discardModal}
                title={'Discard changes?'}
                content={`Your progress will be lost.`}
                actions={
                    <>
                        <Button id="invite" color="primary" onClick={() => setDiscardModal(false)}>
                            Cancel
                        </Button>
                        <Button id="invite" color="error" onClick={() => advancePage(-1)}>
                            Discard
                        </Button>
                    </>
                }
            />

            <ContainerComponent loading={loading} style={{ maxWidth: '600px', maxHeight: '765px' }}>
                <CardHeader
                    title={
                        <Typography variant={'h6'} sx={{ fontWeight: 600 }}>
                            {' '}
                            Grant Access
                        </Typography>
                    }
                    sx={DialogTitleStyles(theme)}
                />
                <CardContent sx={DialogContentStyles(theme)}>
                    <Typography sx={SubTitleStyles(true)}>
                        {email.length > 1
                            ? `Grant ${email.length} users access to different organizations and groups.`
                            : `Grant this user (${email.join(',')}) access to different organizations and groups.`}
                    </Typography>

                    <Divider sx={FullDividerStyles(theme)} />
                    <GrantAccessHeader
                        visibleData={visibleData}
                        searchString={searchString}
                        setSearchString={setSearchString}
                        setCopyAccessType={setCopyAccessType}
                        copyUserAccess={copyUserAccess}
                        setCopyAccessModal={setCopyAccessModal}
                    />
                    <CardContent sx={SelectionContentStyles(theme)}>
                        {searchString.length < 1 &&
                            visibleData?.orgnizationData?.map((item: AccessRoleTypes, index: number) => (
                                <Fragment key={index}>
                                    <Box sx={RoleContainerStyles()}>
                                        {visibleData?.locationData[item.id] &&
                                        visibleData?.locationData[item.id].length ? (
                                            <Typography
                                                sx={{ color: '#727E84', display: 'flex' }}
                                                onClick={() => toggleElement(item.id)}
                                            >
                                                {' '}
                                                {!expand.indexOf(item.id) ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
                                            </Typography>
                                        ) : (
                                            <Typography sx={{ width: '25px' }} />
                                        )}
                                        {roleNameActions(item)}
                                    </Box>
                                    <Typography
                                        sx={{
                                            display: expand.indexOf(item.id) === -1 ? 'none' : 'block',
                                            marginLeft: '16px',
                                        }}
                                    >
                                        {visibleData?.locationData[item.id]?.map(
                                            (location: AccessRoleTypes, index: number) => (
                                                <Fragment key={index}>
                                                    <Box sx={RoleContainerStyles()}>
                                                        {visibleData.siteData[location.id] &&
                                                        visibleData.siteData[location.id].length ? (
                                                            <Typography
                                                                sx={{ color: '#727E84', display: 'flex' }}
                                                                onClick={() => toggleElement(location.id)}
                                                            >
                                                                {!expand.indexOf(location.id) ? (
                                                                    <ArrowDropDownIcon />
                                                                ) : (
                                                                    <ArrowRightIcon />
                                                                )}
                                                            </Typography>
                                                        ) : (
                                                            <Typography sx={{ width: '25px' }} />
                                                        )}
                                                        {roleNameActions(location, item)}
                                                    </Box>
                                                    <Typography
                                                        sx={{
                                                            display:
                                                                expand.indexOf(location.id) === -1 ? 'none' : 'block',
                                                            marginLeft: '40px',
                                                        }}
                                                    >
                                                        {visibleData.siteData[location.id]?.map(
                                                            (site: AccessRoleTypes, index: number) => (
                                                                <Fragment key={index}>
                                                                    <Box sx={RoleContainerStyles()}>
                                                                        {roleNameActions(site, location)}
                                                                    </Box>
                                                                </Fragment>
                                                            )
                                                        )}
                                                    </Typography>
                                                </Fragment>
                                            )
                                        )}
                                    </Typography>
                                </Fragment>
                            ))}
                        {searchString.length >= 1 &&
                            filteredList.map((item: AccessRoleTypes, index: number) => (
                                <>
                                    <Box
                                        key={`search${index}`}
                                        sx={{ display: 'flex', height: 24, alignItems: 'center', marginBottom: '8px' }}
                                    >
                                        <Typography sx={{ width: '25px' }} />
                                        <Typography sx={LocationTextStyle()}> {item.name}</Typography>
                                        {toggleActions(item)}
                                    </Box>
                                </>
                            ))}
                    </CardContent>
                </CardContent>
                <CardActions sx={AdminInviteStyles(theme)}>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={(): void => {
                            isInviteEnabled ? setDiscardModal(true) : advancePage(-1);
                        }}
                        sx={DialogButtonStyles()}
                    >
                        {' '}
                        Back
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        data-testid="nextActionInvite"
                        disableElevation
                        disabled={!isInviteEnabled}
                        onClick={(): void =>
                            inviteUser({ visibleData, setLoading, copyAccessType, rolesChanged, emailInput })
                        }
                        sx={DialogButtonStyles()}
                    >
                        {' '}
                        Invite{' '}
                    </Button>
                </CardActions>
            </ContainerComponent>
        </>
    );
};
