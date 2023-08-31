import React from 'react';
import 'regenerator-runtime/runtime';
import {
    getAdminInviteSite,
    postAdminInvite,
    postAdminUserRegister,
    getOrgList,
    getAccessByEmail,
} from '../api/admin-invite-register';
import { postSelfInvite, postSelfUserRegister } from '../api/self-user-register';
import { loginUser, oktaLoginUser, tokenGenerator } from '../api/login';

describe('Admin Invite Api', () => {
    it('validate Site Api', async () => {
        const res = await getAdminInviteSite({ body: {} as any, token: 'adasd879' });
        expect(res).toStrictEqual([]);
    });
    it('validate Post Admin Invite Api', async () => {
        const res = await postAdminInvite({ body: {} as any, token: 'adasd879' });
        expect(res).toMatchObject({ status: 400 });
    });
    it('validate Admin Register Api', async () => {
        const res = await postAdminUserRegister({} as any);
        expect(res).toMatchObject({ status: 400 });
    });
    it('validate OrgList Api', async () => {
        const res = await getOrgList({ adopterId: 'adsdadads', token: 'adasd879' });
        expect(res).toMatchObject([]);
    });
    it('validate getAccessByAdmin Api', async () => {
        const res = await getAccessByEmail({ adopterId: 'sasdadads', token: 'adasd879', email: 'test@gmail.com' });
        expect(res).toMatchObject({ ErrorCode: 400 });
    });
});

describe('Self Invite Api', () => {
    it('validate Self invite Api', async () => {
        const res = await postSelfInvite({} as any);
        expect(res).toMatchObject({ ErrorCode: 400, Message: 'The adopterId field is required' });
    });
    it('validate self invite register Api', async () => {
        const res = await postSelfUserRegister({} as any);
        expect(res).toMatchObject({ status: 400 });
    });
});

describe('Login Api', () => {
    jest.setTimeout(30000);
    it('validate Login Api', async () => {
        const res = await loginUser({
            userName: 'xyz@xyz.com',
            password: 'Xyz@123',
            adopterId: '2451fe0b-fcef-4293-aaa1-8a8706ac4506',
            applicationId: '0oa6c6ymssh6xpgS81d7',
        } as any);
        expect(res).toMatchObject({ status: 400 });
    });
    it('validate OktaLogin Api', async () => {
        const res = await oktaLoginUser({
            username: 'test@gmail.com',
            password: 'test@123',
            options: {
                multiOptionalFactorEnroll: true,
                warnBeforePasswordExpired: true,
            },
        } as any);
        expect(res).toMatchObject({ status: 0 });
    });
    it('validate Generator Api', async () => {
        const res = await tokenGenerator({
            code: 'asdasda8d6asds',
            redirectUri: 'http://test.com',
            clientid: 'aasd9a87sd98as79d',
            codeVerifier: 'asdas8d7a98sd79',
        } as any);
        expect(res).toMatchObject({ status: 0 });
    });
});
