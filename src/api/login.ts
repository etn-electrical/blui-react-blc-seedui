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

export const oktaLoginUser = async (body: LoginOktaRequestType): Promise<LoginUserType> => {
    const res = await HttpRequest.post({ resource: `${config.oktaUrl}/api/v1/authn`, body });
    return res;
};

export const tokenGenerator = async (data: LoginOktaTokenGeneratorType): Promise<LoginUserType> => {
    const { code, redirectUri, clientid, codeVerifier } = data;
    const res = await HttpRequest.post({
        resource: `${config.oktaUrl}/oauth2/aus3x5jojewaRZEnQ1d7/v1/token?grant_type=${oktaConfig.grant_type}&code=${code}&redirect_uri=${redirectUri}&code_verifier=${codeVerifier}&client_id=${clientid}`,
        body: {},
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return res;
};
