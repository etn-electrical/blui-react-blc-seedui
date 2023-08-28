import React from 'react';
import 'regenerator-runtime/runtime';
import { render, screen, fireEvent } from '@testing-library/react';

import { AccountDetails } from '../../components/pages/admin-invite-registration/AccountDetails';
import { AuthContextMap as AuthUIContextProvider } from '../../utils/AuthContextMap';

type DetailsType = {
    firstName: string;
    lastName: string;
    phoneNumber?: string | number;
};

describe('Account Details', () => {
    it('first name input validation', () => {
        render(
            <AuthUIContextProvider>
                <AccountDetails
                    onDetailsChanged={(details: DetailsType) => {
                        console.log(details);
                    }}
                />
            </AuthUIContextProvider>
        );
        const firstName = screen.getByTestId('first').querySelector('input');
        fireEvent.change(firstName, { target: { value: 'Firstname' } });
        expect(firstName).toHaveValue('Firstname');
    });

    it('last name input validation', () => {
        render(
            <AuthUIContextProvider>
                <AccountDetails
                    onDetailsChanged={function (details: DetailsType): void {
                        console.log(details);
                    }}
                />
            </AuthUIContextProvider>
        );
        const lastName = screen.getByTestId('last').querySelector('input');
        fireEvent.change(lastName, { target: { value: 'Lastname' } });
        expect(lastName).toHaveValue('Lastname');
    });

    it('phone number input validation', () => {
        render(
            <AuthUIContextProvider>
                <AccountDetails
                    onDetailsChanged={function (details: DetailsType): void {
                        console.log(details);
                    }}
                />
            </AuthUIContextProvider>
        );
        const phone = screen.getByTestId('phoneNumber').querySelector('input');
        fireEvent.change(phone, { target: { value: '7556897668' } });
        expect(phone).toHaveValue('7556897668');
    });
});
