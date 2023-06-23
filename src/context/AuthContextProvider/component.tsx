/**
 * @packageDocumentation
 * @module AuthUIContextProvider
 */

import React from 'react';
import { AuthUIContextProviderProps } from './types';
import { AuthUIContext } from './context';
export const AuthUIContextProvider: React.FC<React.PropsWithChildren<AuthUIContextProviderProps>> = (props) => {

    const memoizedProps = React.useMemo(() => {
        const propsForContext: AuthUIContextProviderProps = {
            authUIConfig: props.authUIConfig,
            showSelfRegistration: props.showSelfRegistration,
            showInviteRegistration: props.showInviteRegistration,
            authActions: props.authActions
        };

        return propsForContext;
    }, [
        props.authUIConfig
    ]);

    return <AuthUIContext.Provider value={memoizedProps}>{props.children}</AuthUIContext.Provider>;
};
