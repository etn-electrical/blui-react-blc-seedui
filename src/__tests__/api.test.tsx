import React from 'react';
import 'regenerator-runtime/runtime';
import { getAdminInviteSite, postAdminInvite, postAdminUserRegister } from '../api/admin-invite-register';
import { postSelfInvite, postSelfUserRegister } from '../api/self-user-register';
import { loginUser } from '../api/login';

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
});
