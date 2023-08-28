import React from 'react';
import 'regenerator-runtime/runtime';
import { render } from '@testing-library/react';

import { AuthNavigationContainer } from '../routing/AuthNavigationContainer';
import { AuthContextMap as AuthUIContextProvider } from '../utils/AuthContextMap';

jest.mock('../api/login', () => ({
    loginUser: jest.fn((req) => Promise.resolve([])),
}));

describe('Routing', () => {
    it('Routing component render', () => {
        render(
            <AuthUIContextProvider>
                <AuthNavigationContainer />
            </AuthUIContextProvider>
        );
    });
});
