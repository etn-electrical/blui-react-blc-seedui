import React from 'react';
import 'regenerator-runtime/runtime';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Login } from '../../components/pages/login/Login';
import { AuthContextMap as AuthUIContextProvider } from '../../utils/AuthContextMap';
import { LocalStorage } from '../../utils/local-storage';

jest.mock('../../api/login', () => ({
    loginUser: jest.fn((req) => Promise.resolve([])),
}));

describe('Login', () => {
    it('Login component render', () => {
        LocalStorage.setRememberMe(true, 'xyz@xyz.com')
        render(
            <BrowserRouter>
                <AuthUIContextProvider>
                    <Login />
                </AuthUIContextProvider>
            </BrowserRouter>
        );
    });

    it('Login email input validation', () => {
        render(
            <BrowserRouter>
                <AuthUIContextProvider>
                    <Login />
                </AuthUIContextProvider>
            </BrowserRouter>
        );
        const emailInput = screen.getByTestId('email').querySelector('input');
        fireEvent.change(emailInput, { target: { value: 'xyz' } })
        const errorText = screen.getByText("Please enter a valid email");
        expect(errorText).toBeInTheDocument();
        fireEvent.change(emailInput, { target: { value: 'xyz@syx.com' } })
        expect(() => screen.getByText('Please enter a valid email')).toThrow('Unable to find an element');
    });

    it('Login validation', () => {
        jest
        .spyOn(require('../../api/login'), 'loginUser')
        .mockImplementation(({ body }: any) => Promise.resolve({status: 200, response: {
            token:'asdasd9a8s7d98as7d98as7d98sa', adminRoleId: 'a0s9d0a98ds'
        }}))

        render(
            <BrowserRouter>
                <AuthUIContextProvider>
                    <Login />
                </AuthUIContextProvider>
            </BrowserRouter>
        );
        const emailInput = screen.getByTestId('email').querySelector('input');
        fireEvent.change(emailInput, { target: { value: 'xyz@syx.com' } })

        const password = screen.getByTestId('password').querySelector('input');
        fireEvent.change(password, { target: { value: 'Test@123' } });
        const nextAction = screen.getByTestId('submit');
    fireEvent.click(nextAction);
    });
});
