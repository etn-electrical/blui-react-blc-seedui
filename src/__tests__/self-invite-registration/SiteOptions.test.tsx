import React from 'react';
import 'regenerator-runtime/runtime';
import { render, screen } from '@testing-library/react';

import { SiteOptions } from '../../components/pages/self-invite-registration/SiteOptions';
import { AuthContextMap as AuthUIContextProvider } from '../../utils/AuthContextMap';

describe('Join an Organization', () => {
    it('to test join an organization page is Loading', () => {
        render(
            <AuthUIContextProvider>
                <SiteOptions onSubmit={() => {}} />
            </AuthUIContextProvider>
        );
    });

    it('to test creation of new organization', () => {
        render(
            <AuthUIContextProvider>
                <SiteOptions onSubmit={() => {}} />
            </AuthUIContextProvider>
        );

        expect(screen.getByText('Create a New Organization')).toBeInTheDocument();
    });
});
