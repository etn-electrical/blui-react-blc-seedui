import React from 'react';
import 'regenerator-runtime/runtime';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AdminInvite } from '../../components/pages/admin-invite/AdminInvite';
import { AuthContextMap as AuthUIContextProvider } from '../../utils/AuthContextMap';

export const SiteList = [
    {
        id: 'c568a9c1-9039-4cc6-8a19-167de8c47c83',
        name: 'DermsOrg',
        entityType: 'organization',
        parentId: '',
        canInviteUser: true,
        roleName: 'Admin',
        Sites: [
            {
                id: '30df6144-e48e-4e27-806a-440fead1f984',
                name: 'DermsLoc',
                entityType: 'location',
                parentId: 'c568a9c1-9039-4cc6-8a19-167de8c47c83',
                canInviteUser: true,
                roleName: 'Admin',
                Sites: [
                    {
                        id: '4e723ced-ef0d-441d-a4c9-e43be0b071f0',
                        name: 'DermsSite',
                        entityType: 'site',
                        parentId: '30df6144-e48e-4e27-806a-440fead1f984',
                        canInviteUser: true,
                        roleName: 'Admin',
                        Sites: [] as any,
                    },
                ],
            },
        ],
    },
];

const setLocalStorage = (roleId: string) => {
    window.localStorage.setItem('user_data', JSON.stringify({ roleId }));
};

jest.mock('../../api/admin-invite-register', () => ({
    postAdminInvite: jest.fn((req) => ''),
    getAdminInviteSite: jest.fn((req) => Promise.resolve([])),
    getOrgList: jest.fn((req) => Promise.resolve([])),
}));

describe('Admin Invite', () => {
    it('invalid email input validation', () => {
        jest.spyOn(require('../../api/admin-invite-register'), 'getOrgList').mockImplementation(({ body }: any) =>
            Promise.resolve([])
        );
        setLocalStorage('');
        render(
            <AuthUIContextProvider>
                <AdminInvite />
            </AuthUIContextProvider>
        );
        const emailInput = screen.getByTestId('email').querySelector('textarea');
        fireEvent.change(emailInput, { target: { value: 'xyz' } });
        const errorText = screen.getByText('Please enter legit email address???');
        expect(errorText).toBeInTheDocument();
    });

    it('pass valid email to test email input field', () => {
        jest.spyOn(require('../../api/admin-invite-register'), 'getOrgList').mockImplementation(({ body }: any) =>
            Promise.resolve([])
        );
        render(
            <AuthUIContextProvider>
                <AdminInvite />
            </AuthUIContextProvider>
        );
        const email = screen.getByTestId('email').querySelector('textarea');
        fireEvent.change(email, { target: { value: 'test@gmail.com;test1@gmail.com' } });
        expect(email).toHaveValue('');
        const nextAction = screen.getByTestId('nextAction');
        fireEvent.click(nextAction);
    });

    it('to test grant access screen', async () => {
        jest.spyOn(require('../../api/admin-invite-register'), 'getOrgList').mockImplementation(({ body }: any) =>
            Promise.resolve(SiteList)
        );
        jest.spyOn(require('../../api/admin-invite-register'), 'postAdminInvite').mockImplementation(({ body }: any) =>
            Promise.resolve({ status: 200 })
        );
        render(
            <AuthUIContextProvider>
                <AdminInvite />
            </AuthUIContextProvider>
        );
        const email = screen.getByTestId('email').querySelector('textarea');
        fireEvent.change(email, { target: { value: 'test@gmail.com' } });
        const nextAction = screen.getByTestId('nextAction');
        fireEvent.click(nextAction);
        const errorText = screen.getByText('Grant Access');
        expect(errorText).toBeInTheDocument();
        await waitFor(() => {
            const toggleAction = screen.getByTestId('DermsOrg_Admin');
            fireEvent.click(toggleAction);
        });
        const inviteAction = screen.getByTestId('nextActionInvite');
        fireEvent.click(inviteAction);
        await waitFor(() => {
            const inviteMoreAction = screen.getByTestId('nextActionInviteMore');
            fireEvent.click(inviteMoreAction);
        });
    });

    //     it('to test site input field', () => {
    //         jest.spyOn(require('../../api/admin-invite-register'), 'getAdminInviteSite').mockImplementation(
    //             ({ body }: any) =>
    //                 body.entityType === 'location' ? Promise.resolve(LocationList) : Promise.resolve(SiteList)
    //         );
    //         setLocalStorage('a50a604f-5a66-4a82-8e9a-669917e39a84');
    //         render(
    //             <AuthUIContextProvider>
    //                 <AdminInvite />
    //             </AuthUIContextProvider>
    //         );

    //         const role = screen.getByRole('combobox');
    //         role.focus();
    //         fireEvent.change(document.activeElement, { target: { value: 'Site Admin' } });
    //         fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
    //         fireEvent.keyDown(document.activeElement, { key: 'Enter' });
    //         const site = screen.getAllByRole('combobox')[1];
    //         site.focus();
    //         fireEvent.change(document.activeElement, { target: { value: 'Test Site 1' } });
    //         fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
    //         fireEvent.keyDown(document.activeElement, { key: 'Enter' });
    //         const nextAction = screen.getByTestId('addRole');
    //         fireEvent.click(nextAction);

    //         fireEvent.change(document.activeElement, { target: { value: 'Location Admin' } });
    //         fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
    //         fireEvent.keyDown(document.activeElement, { key: 'Enter' });

    //         const comboBox = screen.getAllByRole('combobox');
    //         expect(comboBox).toHaveLength(3);
    //         const deleteAction = screen.getByTestId('removeRole');
    //         fireEvent.click(deleteAction);
    //         const comboBoxItems = screen.getAllByRole('combobox');
    //         expect(comboBoxItems).toHaveLength(2);
    //     });

    //     it('validate Invite User', () => {
    //         jest.spyOn(require('../../api/admin-invite-register'), 'getAdminInviteSite').mockImplementation(
    //             ({ body }: any) =>
    //                 body.entityType === 'location' ? Promise.resolve(LocationList) : Promise.resolve(SiteList)
    //         );
    //         jest.spyOn(require('../../api/admin-invite-register'), 'postAdminInvite').mockImplementation(({ body }: any) =>
    //             Promise.resolve({ status: 200 })
    //         );
    //         setLocalStorage('a50a604f-5a66-4a82-8e9a-669917e39a84');
    //         render(
    //             <AuthUIContextProvider>
    //                 <AdminInvite />
    //             </AuthUIContextProvider>
    //         );
    //         const email = screen.getByTestId('email').querySelector('input');
    //         fireEvent.change(email, { target: { value: 'test@gmail.com' } });

    //         const role = screen.getByRole('combobox');
    //         role.focus();
    //         fireEvent.change(document.activeElement, { target: { value: 'Site Admin' } });
    //         fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
    //         fireEvent.keyDown(document.activeElement, { key: 'Enter' });
    //         const site = screen.getAllByRole('combobox')[1];
    //         site.focus();
    //         fireEvent.change(document.activeElement, { target: { value: 'Test Site 1' } });
    //         fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
    //         fireEvent.keyDown(document.activeElement, { key: 'Enter' });
    //         const nextAction = screen.getByTestId('addRole');
    //         fireEvent.click(nextAction);

    //         const inite = screen.getByTestId('invite');
    //         fireEvent.click(inite);
    //     });

    //     it('to test invite button', () => {
    //         jest.spyOn(require('../../api/admin-invite-register'), 'getAdminInviteSite').mockImplementation(
    //             ({ body }: any) =>
    //                 body.entityType === 'location' ? Promise.resolve(LocationList) : Promise.resolve(SiteList)
    //         );
    //         setLocalStorage('a50a604f-5a66-4a82-8e9a-669917e39a84');

    //         render(
    //             <AuthUIContextProvider>
    //                 <AdminInvite />
    //             </AuthUIContextProvider>
    //         );
    //         expect(screen.getByTestId('invite')).toBeDisabled();

    //         const email = screen.getByTestId('email').querySelector('input');
    //         fireEvent.change(email, { target: { value: 'test@gmail.com' } });

    //         const role = screen.getByRole('combobox');
    //         role.focus();
    //         fireEvent.change(document.activeElement, { target: { value: 'Organization Admin' } });
    //         fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
    //         fireEvent.keyDown(document.activeElement, { key: 'Enter' });
    //         const invite = screen.getByTestId('invite');
    //         expect(invite).not.toBeDisabled();
    //     });
});
