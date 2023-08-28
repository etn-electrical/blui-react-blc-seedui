import { HttpRequest } from './http-request';
import { API_URL } from '../constants/ApiUrls';
import {
    AdminInviteRequestType,
    CopyAccessTypes,
    GetAdminInviteSitesApiProps,
    PostAdminInviteResponseType,
    PostAdminUserRegisterApiProps,
    LocationSiteProps,
    PostAdminUserRegisterType,
} from '../types/admininvite-types';

export const getAdminInviteSite = async ({
    body,
    token,
}: {
    body: GetAdminInviteSitesApiProps;
    token: string;
}): Promise<LocationSiteProps[]> => {
    const res = await HttpRequest.post({
        resource: `${API_URL.getAdminInviteSite}?includeDetails=false`,
        body,
        token,
    });
    return res.status !== 200 ? [] : (res.response as LocationSiteProps[]);
};

export const getOrgList = async ({
    adopterId,
    token,
}: {
    adopterId: string;
    token: string;
}): Promise<LocationSiteProps[]> => {
    const res = await HttpRequest.get({
        resource: `${API_URL.getOrgList}/${adopterId}/sites?flat=false`,
        token,
    });
    return res.status !== 200 ? [] : (res.response as LocationSiteProps[]);
};

export const getAccessByEmail = async ({
    adopterId,
    token,
    email,
}: {
    adopterId: string;
    token: string;
    email: string;
}): Promise<CopyAccessTypes[]> => {
    const res = await HttpRequest.get({
        resource: `${API_URL.getAccessByEmail}?adopterId=${adopterId}&email=${email}`,
        token,
    });
    return res.response as CopyAccessTypes[];
};

export const postAdminInvite = async ({
    body,
    token,
}: {
    body: AdminInviteRequestType;
    token: string;
}): Promise<PostAdminInviteResponseType> => {
    const res = await HttpRequest.post({ resource: API_URL.postAdminInvite, body, token });
    return res;
};

export const postAdminUserRegister = async (
    body: PostAdminUserRegisterApiProps
): Promise<PostAdminUserRegisterType> => {
    const res = await HttpRequest.post({ resource: API_URL.postAdminUserRegister, body });
    return res;
};
