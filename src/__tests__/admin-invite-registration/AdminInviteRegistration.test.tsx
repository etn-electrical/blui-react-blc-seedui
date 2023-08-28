import React from 'react';
import 'regenerator-runtime/runtime';
import { render, fireEvent, screen } from '@testing-library/react';

import { Registration } from '../../components/pages/admin-invite-registration/Registration';
import { AuthContextMap as AuthUIContextProvider } from '../../utils/AuthContextMap';

describe('Self Registration Process', () => {
    it('to test join an organization page', () => {
        Object.defineProperty(window, 'location', {
            get() {
                return { href: 'https://www.test.com/inviteregistration?invitationkey=1925&isExistingUser=False' };
            },
        });

        render(
            <AuthUIContextProvider>
                <Registration />
            </AuthUIContextProvider>
        );
    });

    it('check Eula Page', () => {
        render(
            <AuthUIContextProvider>
                <Registration />
            </AuthUIContextProvider>
        );
        const eula = screen.getByTestId('eulaElement');
        fireEvent.scroll(eula, { target: { scrollTop: 1 } });
        const eulaAction = screen.getByTestId('agreement');
        fireEvent.click(eulaAction, { target: { checked: true } });
        const nextAction = screen.getByTestId('nextAction');
        fireEvent.click(nextAction);
    });
});
