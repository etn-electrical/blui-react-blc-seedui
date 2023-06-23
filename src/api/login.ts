import { HttpRequest } from "./http-request";
import { config } from '../app-config';

export const loginUser = async (body: any = {}) => {
    const res = await HttpRequest.post({
        resource: `${config.apiUrl}/security/login`, body
    });
    return await res;
};