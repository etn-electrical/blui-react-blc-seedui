import React from 'react';
import 'regenerator-runtime/runtime';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';

import { SelfRegistration } from '../../components/pages/self-invite-registration/SelfRegistration';
import { AuthContextMap as AuthUIContextProvider } from '../../utils/AuthContextMap';

describe('Self Registration Process', () => {

    it('Self registration to test Componet render without crash', () => {
        Object.defineProperty(window, 'location', {
            get() {
                return { href: 'https://www.test.com/inviteregistration?invitationkey=1925&isExistingUser=False' };
            },
        });

        render(
            <AuthUIContextProvider>
                <SelfRegistration />
            </AuthUIContextProvider>
        );
    });

    it('check Eula Page', () => {
        render(
            <AuthUIContextProvider>
                <SelfRegistration />
            </AuthUIContextProvider>
        );
        const eula = screen.getByTestId('eulaElement');
        fireEvent.scroll(eula, { target: { scrollTop: 1 } });
        const eulaAction = screen.getByTestId('agreement');
        fireEvent.click(eulaAction, { target: { checked: true } });
        const nextAction = screen.getByTestId('nextAction');
        fireEvent.click(nextAction);

        expect(screen.getByText("Create Password")).toBeInTheDocument()
    });
});
