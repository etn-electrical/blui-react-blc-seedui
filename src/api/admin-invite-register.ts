import { HttpRequest } from "./http-request";
import { config } from '../app-config';
import { GetAdminInviteSitesApiProps, PostAdminInviteApiProps, PostAdminUserRegisterApiProps, LocationSiteProps, PostAdminInviteType, PostAdminUserRegisterType } from '../types/admininvite-types'; 

export const getAdminInviteSite = async ({body, token}: {body: GetAdminInviteSitesApiProps, token: string}): Promise<LocationSiteProps[]> => {
    const res = await HttpRequest.post({
        resource: `${config.apiUrl}/registration/user/sites?includeDetails=false`, body, token
    });
    return res.status !== 200 ? [] : res.response as LocationSiteProps[];
};

export const getOrgList = async ({adopterId, token}: {adopterId: string, token: string}): Promise<LocationSiteProps[]> => {
    const res = await HttpRequest.get({
        resource: `${config.apiUrl}/registration/user/access/adopter/${adopterId}/sites?flat=false`, token
    });
    return res.status !== 200 ? [] : res.response as LocationSiteProps[];
};

export const getAccessByEmail = async ({adopterId, token, email}: {adopterId: string, token: string, email: string}): Promise<LocationSiteProps[]> => {
    const res = await HttpRequest.get({
        resource: `${config.apiUrl}/registration/user/invite/accessprofile?adopterId=${adopterId}&email=${email}`, token
    });
    return res.status !== 200 ? [] : res.response as LocationSiteProps[];
};

export const postAdminInvite = async ({body, token}: {body: any, token: string}): Promise<PostAdminInviteType> => {
    const res = await HttpRequest.post({
        resource: `${config.apiUrl}/registration/user/invite`, body, token
    });
    return res;
};

export const postAdminUserRegister = async (body: PostAdminUserRegisterApiProps): Promise<PostAdminUserRegisterType> => {
    const res = await HttpRequest.post({
        resource: `${config.apiUrl}/registration/user/invitation/process`, body
    });
    return res;
};