import React from 'react';
import 'regenerator-runtime/runtime';
import { render, screen, fireEvent } from '@testing-library/react';

import { SiteDetails } from '../../components/pages/self-invite-registration/SiteDetails';
import { AuthContextMap as AuthUIContextProvider } from '../../utils/AuthContextMap';

describe('Organization details', () => {

    it('test Organization Details Component Load ', () => {
        render(
            <AuthUIContextProvider>
                <SiteDetails
                    setOrgDetails={() => { }}
                    orgDetails={{ address: 'xyz', address2: '', city: '', state: '', postal: '', code: '', country: { id: 'usa' } }} />
            </AuthUIContextProvider>
        );
    });

    it('pass address', () => {
        render(
            <AuthUIContextProvider>
                <SiteDetails
                    setOrgDetails={() => { }}
                    orgDetails={{ address: 'xyz', address2: '', city: '', state: '', postal: '', code: '', country: { id: 'usa' } }} />
            </AuthUIContextProvider>
        );
        const address = screen.getByTestId('address').querySelector('input');
        fireEvent.change(address, { target: { value: 'street 1' } });
        expect(address).toHaveValue('street 1');
        const address2 = screen.getByTestId('address2').querySelector('input');
        fireEvent.change(address2, { target: { value: 'cross street' } });
        expect(address2).toHaveValue('cross street');
    });

});
