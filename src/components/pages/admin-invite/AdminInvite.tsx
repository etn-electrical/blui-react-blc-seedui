import React, { useState, useEffect, useMemo } from 'react';
import { useInjectedUIContext } from '../../../context/AuthContextProvider';

import {
    AccessListTypes,
    LocationSiteProps,
    AccessRoleTypes,
    LocationTypes,
    SiteTypes,
    InviteUserPropType,
    PostAdminInviteResponseType,
    SiteAccessDetailsType,
    RoleAccessType,
} from '../../../types/admininvite-types';
import CustomizedSnackbar from '../../common/snackbar/Snackbar';
import { postAdminInvite, getOrgList } from '../../../api/admin-invite-register';
import { ERROR_MSG } from '../../../constants/registration-constants';
import { LocalStorage } from '../../../utils/local-storage';
import { getSiteAccessDetails } from '../../../utils/inviteUtils';
import { appConfig } from '../../../app-config';
import { AddingUser } from './AddingUser';
import { GrantAccess } from './GrantAccess';
import { AdminInviteSuccess } from './AdminInviteSuccess';

export const AdminInvite: React.FC = () => {
    const { authUIConfig } = useInjectedUIContext();
    const { adopterId, adopterApplicationName } = authUIConfig;
    const [currentPage, setCurrentPage] = useState(0);
    const [email, setEmail] = useState([]);
    const [accessList, setAccessList] = useState<AccessListTypes>({ orgList: [], locList: {}, siteList: {} });
    const [inviteSuccess, setInviteSuccess] = useState<{ message: string }>({ message: '' });
    const url = new URL(window.location.href);
    const { email: loginUserEmail } = LocalStorage.getRememberMe();
    const { token = '' } = LocalStorage.getAuthTocken();

    const advancePage = (delta = 0): void => {
        setCurrentPage(currentPage + delta);
    };

    useEffect(() => {
        getSiteList();
    }, []);

    const processOrgList = (orgDetailsList: any) => {
        const orgList: AccessRoleTypes[] = [];
        const locList: LocationTypes = {};
        const siteList: SiteTypes = {};
        if (orgDetailsList) {
            orgDetailsList.map((org: AccessRoleTypes) => {
                if (org.Sites.length) {
                    org.Sites.map((loc: AccessRoleTypes) => {
                        if (loc.Sites.length) {
                            const sitesFilter = loc.Sites.filter((site: AccessRoleTypes) => site.canInviteUser);
                            if (sitesFilter.length) siteList[loc.id] = sitesFilter;
                        }
                    });
                    const locationFilter = org.Sites.filter(
                        (loc: AccessRoleTypes) => loc.canInviteUser || siteList[loc.id]
                    );
                    if (locationFilter.length) locList[org.id] = locationFilter;
                }
                if (locList[org.id] || org.canInviteUser) orgList.push(org);
            });
            setAccessList({ orgList, locList, siteList });
        }
    };

    const getSiteList = async () => {
        const siteList: LocationSiteProps[] = await getOrgList({ adopterId, token });
        processOrgList(siteList.slice(0, 100));
    };

    const inviteUser = async (data: InviteUserPropType) => {
        const { visibleData, setLoading, copyAccessType, rolesChanged, emailInput } = data;
        setLoading(true);
        const request = {
            adopterId,
            adopterApplicationName,
            adopterApplicationRegistrationUrl: `${url.host}${appConfig.inviteRegistrationUrl}`,
            usersToInvite: email.map((item) => ({ emailId: item })),
            myAccess: !rolesChanged && copyAccessType === 'My Access',
            someOneElseAccess: !rolesChanged && copyAccessType === "Someone Else's Access",
            accessEmailId: !rolesChanged && copyAccessType === 'My Access' ? loginUserEmail : emailInput,
            siteAccessDetails: !rolesChanged ? [] : getSiteAccessDetails(visibleData),
        };

        const response: PostAdminInviteResponseType = await postAdminInvite({ body: request, token });
        setLoading(false);
        response.status === 200 ? advancePage(1) : setInviteSuccess({ message: ERROR_MSG });
    };

    return (
        <>
            <CustomizedSnackbar
                open={!!inviteSuccess.message.length}
                message={inviteSuccess.message}
                removeToast={(event: Event) => setInviteSuccess({ message: '' })}
            />
            {currentPage === 0 && <AddingUser advancePage={advancePage} email={email} setEmail={setEmail} />}
            {currentPage === 1 && (
                <GrantAccess advancePage={advancePage} accessList={accessList} email={email} inviteUser={inviteUser} />
            )}
            {currentPage === 2 && <AdminInviteSuccess advancePage={advancePage} email={email} setEmail={setEmail} />}
        </>
    );
};
