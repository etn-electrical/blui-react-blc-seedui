import { HttpRequest } from './http-request';
import { config, oktaConfig } from '../app-config';
import { API_URL } from '../constants/ApiUrls';
import {
    LoginUserType,
    LoginRequestType,
    LoginOktaTokenGeneratorType,
    LoginOktaRequestType,
} from '../types/login-types';

export const loginUser = async (body: LoginRequestType): Promise<LoginUserType> => {
    const res = await HttpRequest.post({ resource: API_URL.loginUser, body });
    return res;
};

export const oktaLoginUser = async (body: LoginOktaRequestType) => {
    const res = await HttpRequest.post({ resource: `${config.oktaUrl}/api/v1/authn`, body });
    return await res;
};

export const tokenGenerator = async (data: LoginOktaTokenGeneratorType) => {
    const { grant_type } = oktaConfig;
    const { code, redirectUri, clientid, codeVerifier } = data;
    const res = await HttpRequest.post({
        resource: `${config.oktaUrl}/oauth2/aus3x5jojewaRZEnQ1d7/v1/token?grant_type=${grant_type}&code=${code}&redirect_uri=${redirectUri}&code_verifier=${codeVerifier}&client_id=${clientid}`,
        body: {},
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return await res;
};
