import React from 'react';
import 'regenerator-runtime/runtime';
import { render, screen } from '@testing-library/react';

import { RegistrationExpired } from '../../components/pages/self-invite-registration/SelfRegistrationExpired';
import { AuthContextMap as AuthUIContextProvider } from '../../utils/AuthContextMap';

describe('Registration Expired', () => {

    it('to test registration link expired Component Load', () => {
        render(
            <AuthUIContextProvider> 
            <RegistrationExpired />
            </AuthUIContextProvider>
        );
    });

    it('to test registration link expired', () => {
        render(
            <AuthUIContextProvider> 
            <RegistrationExpired />
            </AuthUIContextProvider>
        );

        expect(screen.getByText("This Registration Link has expired. Registration may have already been completed or the allowable time for the link has passed.")).toBeInTheDocument()
    });
});
