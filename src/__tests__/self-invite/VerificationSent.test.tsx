import React from 'react';
import 'regenerator-runtime/runtime';
import { render, screen } from '@testing-library/react';

import { VerificationSent } from '../../components/pages/self-invite/VerificationSent';
import { AuthContextMap as AuthUIContextProvider } from '../../utils/AuthContextMap';

describe('Self Invite Verification Sent', () => {
    it('to test Verification sent load', () => {
        render(
            <AuthUIContextProvider>
                <VerificationSent />
            </AuthUIContextProvider>
        );
    });

    it('to test specific text exist', () => {
        render(
            <AuthUIContextProvider>
                <VerificationSent />
            </AuthUIContextProvider>
        );

        expect(
            screen.getByText('A verification link has been sent to the email address you provided.')
        ).toBeInTheDocument();
    });
});
