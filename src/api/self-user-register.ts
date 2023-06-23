import { HttpRequest } from "./http-request";
import { config } from '../app-config';
import { SelfInviteApiProps, SelfInviteRegisterApiProps } from '../types/selfinvite-types';

export const postSelfInvite = async (body: SelfInviteApiProps) => {
    const res = await HttpRequest.post({
        resource: `${config.apiUrl}/registration/user/self/invitation`, body
    });
    return await res.response;
};

export const postSelfUserRegister = async (body: SelfInviteRegisterApiProps) => {
    const res = await HttpRequest.post({
        resource: `${config.apiUrl}/registration/user/self/invitation/process`, body
    });
    return res;
};