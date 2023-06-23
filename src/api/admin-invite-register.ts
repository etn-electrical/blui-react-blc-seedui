import { HttpRequest } from "./http-request";
import { config } from '../app-config';
import { GetAdminInviteSitesApiProps, PostAdminInviteApiProps, PostAdminUserRegisterApiProps } from '../types/admininvite-types'; 

export const getAdminInviteSite = async ({body, token}: {body: GetAdminInviteSitesApiProps, token: string}) => {
    const res = await HttpRequest.post({
        resource: `${config.apiUrl}/registration/user/sites?includeDetails=false`, body, token
    });
    return res.status !== 200 ? [] : res.response;
};

export const postAdminInvite = async ({body, token}: {body: PostAdminInviteApiProps, token: string}) => {
    const res = await HttpRequest.post({
        resource: `${config.apiUrl}/registration/user/invite`, body, token
    });
    return await res;
};

export const postAdminUserRegister = async (body: PostAdminUserRegisterApiProps) => {
    const res = await HttpRequest.post({
        resource: `${config.apiUrl}/registration/user/invitation/process`, body
    });
    return res;
};