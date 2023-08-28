import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Spinner } from '../../common/spinner/Spinner';

import { useInjectedUIContext } from '../../../index';
import { tokenGenerator } from '../../../api/login';
import { LocalStorage } from '../../../utils/local-storage';

export const OktaLogin: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = () => {
    const [loading, setLoading] = useState(false);
    const injectedContext = useInjectedUIContext();
    const { authUIConfig, authActions } = injectedContext;
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code') || '';

    useEffect(() => {
        if (code) {
            getToken();
        }
    }, [code]);

    const getToken = async () => {
        const { codeVerifier } = LocalStorage.getCodeVerifier();
        const { clientid, redirectUri } = authUIConfig;
        setLoading(true);
        const response: any = await tokenGenerator({ code, clientid, redirectUri, codeVerifier });
        if (response.status === 200) {
            processResponse(response);
        }
        setLoading(false);
    };

    const processResponse = (response: any) => {
        const { access_token, id_token } = response.response;
        LocalStorage.setAuthTocken(access_token, '3d42846d-84df-4f7b-8b92-6cb46876bbfd', id_token);
        authActions().logIn(response.response);
    };

    return (
        <>
            <Spinner visible={loading} />
            <Typography></Typography>
        </>
    );
};
