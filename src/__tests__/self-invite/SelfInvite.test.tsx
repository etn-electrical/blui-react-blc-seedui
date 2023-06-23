import React from 'react';
import 'regenerator-runtime/runtime';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SelfInvite } from '../../components/pages/self-invite/SelfInvite';
import { AuthContextMap as AuthUIContextProvider} from '../../utils/AuthContextMap';

jest.mock('../../api/self-user-register', () => ({
    postSelfInvite: jest.fn((req) => Promise.resolve({errorCode: 200})),
}));

describe('Self Invite', () => {
    it('renders without crashing', () => {
        const {getByText} =
        render(<AuthUIContextProvider> 
            <SelfInvite />
            </AuthUIContextProvider>);

    const emailInput = screen.getByTestId('email').querySelector('input');

    expect(getByText(/Next/i).closest('button')).toBeDisabled();
    userEvent.type(emailInput,'test@gmail.com');
    const nextAction = screen.getByTestId('nextAction');
    expect(nextAction).not.toBeDisabled();
    });

    it('pass invalid email to test email input field', () => {
        jest
        .spyOn(require('../../api/self-user-register'), 'postSelfInvite')
        .mockImplementation(({ body }: any) => Promise.resolve({errorCode: 200}))

        render(
            <AuthUIContextProvider> 
            <SelfInvite />
            </AuthUIContextProvider>
        );

        const emailInput = screen.getByTestId('email').querySelector('input');
        fireEvent.change(emailInput, {target: {value: 'xyz'}});

        expect(screen.getByText("Please enter a valid email")).toBeInTheDocument()
        const nextAction = screen.getByTestId('nextAction');
        fireEvent.click(nextAction);
    });

    it('to test verification link sent to email address provided', async () => {
        jest
        .spyOn(require('../../api/self-user-register'), 'postSelfInvite')
        .mockImplementation(({ body }: any) => Promise.resolve({errorCode: 200}))

        render(
            <AuthUIContextProvider> 
            <SelfInvite />
            </AuthUIContextProvider>
        );

        const emailInput = screen.getByTestId('email').querySelector('input');
        const button = screen.getByText('Next');

        userEvent.type(emailInput,'test@gmail.com'); 
        fireEvent.click(button);
        const textNode = await waitFor(() => screen.getByText("Confirm your Email Address"));

        expect(textNode).toBeInTheDocument()
    });
});
