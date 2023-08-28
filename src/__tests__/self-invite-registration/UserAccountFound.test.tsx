import React from 'react';
import 'regenerator-runtime/runtime';
import { render, screen } from '@testing-library/react';

import { UserAccountFound } from '../../components/pages/self-invite-registration/UserAccountFound';
import { AuthContextMap as AuthUIContextProvider } from '../../utils/AuthContextMap';

describe('Self Registrationn User Account Found', () => {
    it('to test Accoun Found Component Load', () => {
        render(
            <AuthUIContextProvider>
                <UserAccountFound />
            </AuthUIContextProvider>
        );
    });

    it('to test Accoun Found Component Load', () => {
        render(
            <AuthUIContextProvider>
                <UserAccountFound />
            </AuthUIContextProvider>
        );

        expect(
            screen.getByText(
                'We found an Eaton account associated with this email address. This means you have already registered this email address for another Eaton application.'
            )
        ).toBeInTheDocument();
    });
});
