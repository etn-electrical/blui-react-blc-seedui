import React, { useState, useEffect, useMemo } from 'react';
import { useInjectedUIContext } from '../../../context/AuthContextProvider';

import { LocationSiteProps } from '../../../types/admininvite-types';
import CustomizedSnackbar from '../../common/snackbar/Snackbar';
import { postAdminInvite, getOrgList } from '../../../api/admin-invite-register';
import { ERROR_MSG } from '../../../constants/registration-constants';
import { LocalStorage } from '../../../utils/local-storage';
import { rolesConfig } from '../../../config';
import { AddingUser } from './AddingUser';
import { GrantAccess } from './GrantAccess';
import { AdminInviteSuccess } from './AdminInviteSuccess';

export const AdminInvite: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [email, setEmail] = useState([]);

    const { authUIConfig } = useInjectedUIContext();
    const { adopterId, adopterApplicationName } = authUIConfig;
    const { email: loginUserEmail } = LocalStorage.getRememberMe();

    const url = new URL(window.location.href);
    const [orgDetailsList, setOrgDetailsList] = useState<any>();
    const [accessList, setAccessList] = useState<any>({ orgList: [], locList: {}, siteList: {} })
    const [loading, setLoading] = useState<boolean>(false);
    const [inviteSuccess, setInviteSuccess] = useState<{ message: string }>({ message: '' })

    const loggedInUserData = useMemo(() => {
        const { roleId = '', token = '' } = LocalStorage.getAuthTocken();
        return { roleId, token };
    }, []);

    const advancePage = (delta = 0): void => {
        setCurrentPage(currentPage + delta)
    };

    useEffect(() => {
        getSiteList();
    }, [])

    useEffect(() => {
        const orgList: any = [];
        const locList: any = {};
        const siteList: any = {};
        if (orgDetailsList) {
            orgDetailsList.map((org: any) => {

                if (org.Sites.length) {
                    org.Sites.map((loc: any) => {
                        if (loc.Sites.length) {
                            const sitesFilter = loc.Sites.filter((site: any) => site.canInviteUser)
                            if (sitesFilter.length) siteList[loc.id] = sitesFilter;
                        }
                    })
                    const locationFilter = org.Sites.filter((loc: any) => loc.canInviteUser || siteList[loc.id]);
                    if (locationFilter.length) locList[org.id] = locationFilter;
                }
                if (locList[org.id] || org.canInviteUser) orgList.push(org);
            })
            setAccessList({ orgList, locList, siteList })
        }
    }, [orgDetailsList])

    const getSiteList = async () => {
        setLoading(true);
        const siteList: [LocationSiteProps] = await getOrgList({
            adopterId, token: loggedInUserData.token
        }) as [LocationSiteProps];
        setOrgDetailsList(siteList.slice(0, 100));
        // setOrgDetailsList(siteList);

        setLoading(false);
    }

    const getSiteAccessDetails = (dataList: any) => {
        const { orgnizationData, locationData, siteData } = dataList;
        const accessDetails: any = [];
        orgnizationData.map((org: any) => {

            if (org.roleAccess) {
                accessDetails.push({ roleId: "561c019c-5d12-4e6e-99f7-154443a9f39b", roleName: org.roleAccess, sites: [{ siteId: org.id }] })
            }
            const findlocation = locationData[org.id] || [];
            findlocation.map((loc: any) => {
                if (loc.roleAccess && org.roleAccess !== loc.roleAccess) {
                    accessDetails.push({ roleId: "561c019c-5d12-4e6e-99f7-154443a9f39b", roleName: loc.roleAccess, sites: [{ siteId: loc.id }] })
                }

                const findsite = siteData[loc.id] || [];
                findsite.map((site: any) => {
                    if (site.roleAccess && loc.roleAccess !== site.roleAccess) {
                        accessDetails.push({ roleName: site.roleAccess, sites: [{ siteId: site.id }] })
                    }
                })
            })
        })
        const newAccessDetailsObj: any = {};
        accessDetails.map((item: any) => {
            if (newAccessDetailsObj[item.roleName]) {
                newAccessDetailsObj[item.roleName] = [...newAccessDetailsObj[item.roleName], ...item.sites]
            } else {
                newAccessDetailsObj[item.roleName] = item.sites;
            }
        })
        const newAccessDetails = Object.keys(newAccessDetailsObj).map(key => ({ roleId: "561c019c-5d12-4e6e-99f7-154443a9f39b", roleName: key, sites: newAccessDetailsObj[key] }))
        return newAccessDetails;
    }

    const inviteUser = async (data: any) => {
        const { visibleData, setLoading, copyAccessType, rolesChanged, emailInput } = data;
        setLoading(true);
        const request = {
            adopterId,
            adopterApplicationName,
            adopterApplicationRegistrationUrl: `${url.host}${rolesConfig.inviteRegistrationUrl}`,
            usersToInvite: email.map(item => ({ emailId: item })),
            myAccess: !rolesChanged && copyAccessType === 'My Access',
            someOneElseAccess: !rolesChanged && copyAccessType === "Someone Else's Access",
            accessEmailId: !rolesChanged && copyAccessType === 'My Access' ? loginUserEmail : emailInput,
            siteAccessDetails: !rolesChanged ? [] : getSiteAccessDetails(visibleData)
        }
        const response: any = await postAdminInvite({
            body: request,
            token: loggedInUserData.token
        });
        setLoading(false);

        if (response.status === 200) {
            advancePage(1);
        } else {
            setInviteSuccess({ message: ERROR_MSG });

        }
    };

    return (
        <>
            <CustomizedSnackbar
                open={inviteSuccess.message.length}
                message={inviteSuccess.message}
                removeToast={(event: Event) => setInviteSuccess({ message: '' })}
            />
            {currentPage === 0 && <AddingUser advancePage={advancePage} email={email} setEmail={setEmail} />}
            {currentPage === 1 && <GrantAccess advancePage={advancePage} accessList={accessList} email={email} inviteUser={inviteUser} />}
            {currentPage === 2 && <AdminInviteSuccess advancePage={advancePage} email={email} setEmail={setEmail} />}
        </>
    )
}