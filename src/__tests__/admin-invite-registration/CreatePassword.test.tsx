import React from 'react';
import 'regenerator-runtime/runtime';
import { render, screen, fireEvent } from '@testing-library/react';

import { CreatePassword } from '../../components/pages/admin-invite-registration/CreatePassword';
import { AuthContextMap as AuthUIContextProvider } from '../../utils/AuthContextMap';

describe('Create Password', () => {
    it('to test password input field', () => {
        render(
            <AuthUIContextProvider>
                <CreatePassword
                    onPasswordChanged={function (password: string): void {
                        console.log(password);
                    }}
                />
            </AuthUIContextProvider>
        );

        const password = screen.getByTestId('password').querySelector('input');
        fireEvent.change(password, { target: { value: 'Test@123' } });
        expect(password).toHaveValue('Test@123');
    });

    it('to test confirm password input field', () => {
        render(
            <AuthUIContextProvider>
                <CreatePassword
                    onPasswordChanged={function (password: string): void {
                        console.log(password);
                    }}
                />
            </AuthUIContextProvider>
        );

        const confirmPassword = screen.getByTestId('confirm').querySelector('input');
        fireEvent.change(confirmPassword, { target: { value: 'Test@123' } });
        expect(confirmPassword).toHaveValue('Test@123');
    });
});
