import React from 'react';
import 'regenerator-runtime/runtime';
import { render, screen, waitFor } from '@testing-library/react';

import { RegistrationComplete } from '../../components/pages/admin-invite-registration/RegistrationComplete';
import { AuthContextMap as AuthUIContextProvider } from '../../utils/AuthContextMap';

const mockResponse = {
    userId: '41e09d7d-5f43-43a1-bac2-aa9beda3e5a5',
    emailId: 'orgadminpredemo02@yopmail.com',
    name: 'user, test',
    organizationId: 'c568a9c1-9039-4cc6-8a19-167de8c47c83',
    organizationName: 'DermsOrg',
    sites: [
        {
            siteId: '15de602e-a403-45fa-8661-4bbfd1c3dbe9',
            siteName: 'DermsLoc 2',
            roles: [{ roleName: 'LocationAdmin' }],
        },
        { siteId: '2aa0e5f8-b807-4c81-b795-c660d527f177', siteName: 'DermsSite 4', roles: [{ roleName: 'SiteAdmin' }] },
        { siteId: 'b199072c-1cee-45c0-80f9-225688116101', siteName: 'DermsSite 3', roles: [{ roleName: 'SiteAdmin' }] },
        {
            siteId: 'f0fb6069-2106-4187-a882-4877142bfb71',
            siteName: 'DermsSite 5',
            roles: [{ roleName: 'SiteViewer' }],
        },
    ],
};
describe('Registration Complete', () => {
    it('to test account registration Component Load', () => {
        render(
            <AuthUIContextProvider>
                <RegistrationComplete firstName={''} lastName={''} email={''} responseData={mockResponse} />
            </AuthUIContextProvider>
        );
    });

    it('to test account registration complete', () => {
        render(
            <AuthUIContextProvider>
                <RegistrationComplete firstName={''} lastName={''} email={''} responseData={mockResponse} />
            </AuthUIContextProvider>
        );

        expect(screen.getByText('Your account has been successfully created.')).toBeInTheDocument();
    });
});
