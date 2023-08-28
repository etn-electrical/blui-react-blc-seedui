import React from 'react';
import 'regenerator-runtime/runtime';
import { render, screen } from '@testing-library/react';

import { SelfRegistrationComplete } from '../../components/pages/self-invite-registration/SelfRegistrationComplete';
import { AuthContextMap as AuthUIContextProvider } from '../../utils/AuthContextMap';

const mockResponse = {
    name: 'xyz',
    emailId: 'xyz@eaton.com',
    siteName: 'New Site',
    roleName: ['Admin'],
};
describe('Registration Complete', () => {
    it('to test registration complete Component Load', () => {
        render(
            <AuthUIContextProvider>
                <SelfRegistrationComplete responseData={mockResponse} />
            </AuthUIContextProvider>
        );
    });

    it('to test account registration complete', () => {
        render(
            <AuthUIContextProvider>
                <SelfRegistrationComplete responseData={mockResponse} />
            </AuthUIContextProvider>
        );

        expect(
            screen.getByText('You can now Login using your email address and password associated with your account.')
        ).toBeInTheDocument();
    });
});
