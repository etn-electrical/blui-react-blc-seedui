import React from 'react';
import 'regenerator-runtime/runtime';
import { render, screen } from '@testing-library/react';

import { NewOrganization } from '../../components/pages/self-invite-registration/NewOrganization';
import { AuthContextMap as AuthUIContextProvider } from '../../utils/AuthContextMap';

describe('Organization Name', () => {
    it('To test Organization Creation Component Load', () => {
        render(
            <AuthUIContextProvider>
                <NewOrganization setOrgName={(email: string) => {}} orgName={'New Org'} />
            </AuthUIContextProvider>
        );
    });

    it('pass organization name', () => {
        render(
            <AuthUIContextProvider>
                <NewOrganization setOrgName={(email: string) => {}} orgName={'New Org'} />
            </AuthUIContextProvider>
        );
        const organization = screen.getByTestId('orgName').querySelector('input');
        expect(organization).toHaveValue('New Org');
    });
});
