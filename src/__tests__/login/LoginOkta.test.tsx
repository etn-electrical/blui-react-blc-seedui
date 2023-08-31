import React from 'react';
import 'regenerator-runtime/runtime';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { OktaLogin } from '../../components/pages/okta/Okta';
import { AuthContextMap as AuthUIContextProvider } from '../../utils/AuthContextMap';

describe('Okta Login', () => {
    it('Okta Login component render', () => {
        render(
            <BrowserRouter>
                <AuthUIContextProvider>
                    <OktaLogin />
                </AuthUIContextProvider>
            </BrowserRouter>
        );
    });

    it('Okta TokenGenerator', () => {
        Object.defineProperty(window, 'location', {
            get() {
                return { href: 'https://www.test.com/callback/authcode?code=sdfsdlfjsdfmnsdkfhsdjkfh' };
            },
        });
        jest.spyOn(require('../../api/login'), 'tokenGenerator').mockImplementation(({ body }: any) =>
            Promise.resolve({
                status: 200,
                response: { access_token: 'asdasoiasd98asdkjsad', id_token: 'sasdadasdlkjasd' },
            })
        );
        render(
            <BrowserRouter>
                <AuthUIContextProvider>
                    <OktaLogin />
                </AuthUIContextProvider>
            </BrowserRouter>
        );
    });
});
