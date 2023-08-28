import { config } from '../app-config';

export const API_URL = {
    getAdminInviteSite: `${config.apiUrl}/registration/user/sites`,
    getOrgList: `${config.apiUrl}/registration/user/access/adopter`,
    getAccessByEmail: `${config.apiUrl}/registration/user/invite/accessprofile`,
    postAdminInvite: `${config.apiUrl}/registration/user/invite`,
    postAdminUserRegister: `${config.apiUrl}/registration/user/invitation/process`,
    loginUser: `${config.apiUrl}/security/login`,
    postSelfInvite: `${config.apiUrl}/registration/user/self/invitation`,
    postSelfUserRegister: `${config.apiUrl}/registration/user/self/invitation/process`,
};
