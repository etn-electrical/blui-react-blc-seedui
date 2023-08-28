import { HttpRequest } from './http-request';
import { API_URL } from '../constants/ApiUrls';
import {
    SelfInviteApiProps,
    SelfInviteRegisterApiProps,
    PostSelfInviteType,
    PostSelfUserRegisterType,
} from '../types/selfinvite-types';

export const postSelfInvite = async (body: SelfInviteApiProps): Promise<PostSelfInviteType> => {
    const res = await HttpRequest.post({ resource: API_URL.postSelfInvite, body });
    return await res.response;
};

export const postSelfUserRegister = async (body: SelfInviteRegisterApiProps): Promise<PostSelfUserRegisterType> => {
    const res = await HttpRequest.post({ resource: API_URL.postSelfUserRegister, body });
    return res;
};
