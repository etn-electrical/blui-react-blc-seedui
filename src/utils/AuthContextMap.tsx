import React from 'react';
import { AuthUIContextProvider } from '../index';
import { authConfig } from '../assets/config';
import { SAMPLE_EULA } from '../components/pages/admin-invite-registration/sampleEula';

export const AuthContextMap = (props: { children: React.ReactNode }) => (
    <AuthUIContextProvider
        authUIConfig={authConfig}
        showSelfRegistration={true}
        showInviteRegistration={true}
        authActions={() => ({
            logIn: () => {},
            loadEula: () => SAMPLE_EULA,
        })}
    >
        {props.children}
    </AuthUIContextProvider>
);
