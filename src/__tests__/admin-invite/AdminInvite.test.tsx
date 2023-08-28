import React from 'react';
import 'regenerator-runtime/runtime';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AdminInvite } from '../../components/pages/admin-invite/AdminInvite';
import { AuthContextMap as AuthUIContextProvider } from '../../utils/AuthContextMap';

export const SiteList = [
    {
        id: '304b89f0-7786-4a65-b858-66bb6e67ac5d',
        name: 'Test Site 1',
        custom_attributes: { entityType: 'site' },
        parentId: '15de602e-a403-45fa-8661-4bbfd1c3dbe9',
        parentName: 'DermsLoc 2',
        canInviteUser: true,
    },
    {
        id: '755010f7-de9b-47d3-9139-ee6f5e43f563',
        name: 'DermsSite 8',
        custom_attributes: { entityType: 'site' },
        parentId: '15de602e-a403-45fa-8661-4bbfd1c3dbe9',
        parentName: 'DermsLoc 2',
        canInviteUser: true,
    },
    {
        id: 'b831752a-2a59-41a4-8410-ea757b394344',
        name: 'DermsSite 6',
        custom_attributes: { entityType: 'site' },
        parentId: '15de602e-a403-45fa-8661-4bbfd1c3dbe9',
        parentName: 'DermsLoc 2',
        canInviteUser: true,
    },
    {
        id: 'f5a8dc37-7575-4638-b42c-f1e8f4faa8a2',
        name: 'DermsSite 7',
        custom_attributes: { entityType: 'site' },
        parentId: '15de602e-a403-45fa-8661-4bbfd1c3dbe9',
        parentName: 'DermsLoc 2',
        canInviteUser: true,
    },
    {
        id: '2aa0e5f8-b807-4c81-b795-c660d527f177',
        name: 'DermsSite 4',
        custom_attributes: { entityType: 'site' },
        parentId: '24cf0288-9af5-49a6-9f3d-007dda1e5289',
        parentName: 'DermsLoc 1',
        canInviteUser: true,
    },
    {
        id: 'b199072c-1cee-45c0-80f9-225688116101',
        name: 'DermsSite 3',
        custom_attributes: { entityType: 'site' },
        parentId: '24cf0288-9af5-49a6-9f3d-007dda1e5289',
        parentName: 'DermsLoc 1',
        canInviteUser: true,
    },
    {
        id: 'f0fb6069-2106-4187-a882-4877142bfb71',
        name: 'DermsSite 5',
        custom_attributes: { entityType: 'site' },
        parentId: '24cf0288-9af5-49a6-9f3d-007dda1e5289',
        parentName: 'DermsLoc 1',
        canInviteUser: true,
    },
    {
        id: '12d3628c-90e9-49e2-8ad2-6c3aedb42331',
        name: 'DermsSite 1',
        custom_attributes: { entityType: 'site' },
        parentId: '30df6144-e48e-4e27-806a-440fead1f984',
        parentName: 'DermsLoc',
        canInviteUser: true,
    },
    {
        id: '4e723ced-ef0d-441d-a4c9-e43be0b071f0',
        name: 'DermsSite',
        custom_attributes: { entityType: 'site' },
        parentId: '30df6144-e48e-4e27-806a-440fead1f984',
        parentName: 'DermsLoc',
        canInviteUser: true,
    },
    {
        id: 'c9e402c3-aad6-4bd1-9c3f-d95a484768a6',
        name: 'DermsSite 2',
        custom_attributes: { entityType: 'site' },
        parentId: '30df6144-e48e-4e27-806a-440fead1f984',
        parentName: 'DermsLoc',
        canInviteUser: true,
    },
];
export const LocationList = [
    {
        id: '15de602e-a403-45fa-8661-4bbfd1c3dbe9',
        name: 'DermsLoc 2',
        custom_attributes: { entityType: 'location' },
        parentId: 'c568a9c1-9039-4cc6-8a19-167de8c47c83',
        parentName: 'DermsOrg',
        canInviteUser: true,
    },
    {
        id: '24cf0288-9af5-49a6-9f3d-007dda1e5289',
        name: 'DermsLoc 1',
        custom_attributes: { entityType: 'location' },
        parentId: 'c568a9c1-9039-4cc6-8a19-167de8c47c83',
        parentName: 'DermsOrg',
        canInviteUser: true,
    },
    {
        id: '30df6144-e48e-4e27-806a-440fead1f984',
        name: 'DermsLoc',
        custom_attributes: { entityType: 'location' },
        parentId: 'c568a9c1-9039-4cc6-8a19-167de8c47c83',
        parentName: 'DermsOrg',
        canInviteUser: true,
    },
];

const setLocalStorage = (roleId: string) => {
    window.localStorage.setItem('user_data', JSON.stringify({ roleId }));
};

jest.mock('../../api/admin-invite-register', () => ({
    postAdminInvite: jest.fn((req) => ''),
    getAdminInviteSite: jest.fn((req) => Promise.resolve([])),
}));

describe('Admin Invite', () => {
    it('invalid email input validation', () => {
        setLocalStorage('');
        render(
            <AuthUIContextProvider>
                <AdminInvite />
            </AuthUIContextProvider>
        );
        const emailInput = screen.getByTestId('email').querySelector('input');
        fireEvent.change(emailInput, { target: { value: 'xyz' } });
        const errorText = screen.getByText('Please enter a valid email');
        expect(errorText).toBeInTheDocument();
    });

    it('pass valid email to test email input field', () => {
        setLocalStorage('3d42846d-84df-4f7b-8b92-6cb46876bbfd');
        render(
            <AuthUIContextProvider>
                <AdminInvite />
            </AuthUIContextProvider>
        );
        const email = screen.getByTestId('email').querySelector('input');
        fireEvent.change(email, { target: { value: 'test@gmail.com' } });
        expect(email).toHaveValue('test@gmail.com');
    });

    it('to test role input field', () => {
        setLocalStorage('a50a604f-5a66-4a82-8e9a-669917e39a84');
        render(
            <AuthUIContextProvider>
                <AdminInvite />
            </AuthUIContextProvider>
        );
        const role = screen.getByRole('combobox');
        userEvent.type(role, 'OrgAdmin');
        expect(role).toHaveValue('OrgAdmin');
    });

    it('to test site input field', () => {
        jest.spyOn(require('../../api/admin-invite-register'), 'getAdminInviteSite').mockImplementation(
            ({ body }: any) =>
                body.entityType === 'location' ? Promise.resolve(LocationList) : Promise.resolve(SiteList)
        );
        setLocalStorage('a50a604f-5a66-4a82-8e9a-669917e39a84');
        render(
            <AuthUIContextProvider>
                <AdminInvite />
            </AuthUIContextProvider>
        );

        const role = screen.getByRole('combobox');
        role.focus();
        fireEvent.change(document.activeElement, { target: { value: 'Site Admin' } });
        fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
        fireEvent.keyDown(document.activeElement, { key: 'Enter' });
        const site = screen.getAllByRole('combobox')[1];
        site.focus();
        fireEvent.change(document.activeElement, { target: { value: 'Test Site 1' } });
        fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
        fireEvent.keyDown(document.activeElement, { key: 'Enter' });
        const nextAction = screen.getByTestId('addRole');
        fireEvent.click(nextAction);

        fireEvent.change(document.activeElement, { target: { value: 'Location Admin' } });
        fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
        fireEvent.keyDown(document.activeElement, { key: 'Enter' });

        const comboBox = screen.getAllByRole('combobox');
        expect(comboBox).toHaveLength(3);
        const deleteAction = screen.getByTestId('removeRole');
        fireEvent.click(deleteAction);
        const comboBoxItems = screen.getAllByRole('combobox');
        expect(comboBoxItems).toHaveLength(2);
    });

    it('validate Invite User', () => {
        jest.spyOn(require('../../api/admin-invite-register'), 'getAdminInviteSite').mockImplementation(
            ({ body }: any) =>
                body.entityType === 'location' ? Promise.resolve(LocationList) : Promise.resolve(SiteList)
        );
        jest.spyOn(require('../../api/admin-invite-register'), 'postAdminInvite').mockImplementation(({ body }: any) =>
            Promise.resolve({ status: 200 })
        );
        setLocalStorage('a50a604f-5a66-4a82-8e9a-669917e39a84');
        render(
            <AuthUIContextProvider>
                <AdminInvite />
            </AuthUIContextProvider>
        );
        const email = screen.getByTestId('email').querySelector('input');
        fireEvent.change(email, { target: { value: 'test@gmail.com' } });

        const role = screen.getByRole('combobox');
        role.focus();
        fireEvent.change(document.activeElement, { target: { value: 'Site Admin' } });
        fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
        fireEvent.keyDown(document.activeElement, { key: 'Enter' });
        const site = screen.getAllByRole('combobox')[1];
        site.focus();
        fireEvent.change(document.activeElement, { target: { value: 'Test Site 1' } });
        fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
        fireEvent.keyDown(document.activeElement, { key: 'Enter' });
        const nextAction = screen.getByTestId('addRole');
        fireEvent.click(nextAction);

        const inite = screen.getByTestId('invite');
        fireEvent.click(inite);
    });

    it('to test invite button', () => {
        jest.spyOn(require('../../api/admin-invite-register'), 'getAdminInviteSite').mockImplementation(
            ({ body }: any) =>
                body.entityType === 'location' ? Promise.resolve(LocationList) : Promise.resolve(SiteList)
        );
        setLocalStorage('a50a604f-5a66-4a82-8e9a-669917e39a84');

        render(
            <AuthUIContextProvider>
                <AdminInvite />
            </AuthUIContextProvider>
        );
        expect(screen.getByTestId('invite')).toBeDisabled();

        const email = screen.getByTestId('email').querySelector('input');
        fireEvent.change(email, { target: { value: 'test@gmail.com' } });

        const role = screen.getByRole('combobox');
        role.focus();
        fireEvent.change(document.activeElement, { target: { value: 'Organization Admin' } });
        fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
        fireEvent.keyDown(document.activeElement, { key: 'Enter' });
        const invite = screen.getByTestId('invite');
        expect(invite).not.toBeDisabled();
    });
});
