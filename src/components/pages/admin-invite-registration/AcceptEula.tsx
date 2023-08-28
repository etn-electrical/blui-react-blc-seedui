import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { EulaContent, EulaAction } from './RegistrationStyle';
import { AcceptEulaProps } from '../../../types/registration-types';

export const AcceptEula: React.FC<React.PropsWithChildren<React.PropsWithChildren<AcceptEulaProps>>> = (props) => {
    const { eulaAccepted, eulaContent, onEulaChanged } = props;
    const [actionEnable, setActionEnabled] = useState(false);
    const eulaContentInternals = eulaContent;

    useEffect(() => {
        eulaAccepted && setActionEnabled(true);
    }, []);
    const isActionEnabled = (e: any) => {
        const reachedBottom = e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 10;
        reachedBottom && setActionEnabled(true);
    };

    return (
        <>
            <Typography data-testid="eulaElement" id="eulaElement" sx={EulaContent()} onScroll={isActionEnabled}>
                {eulaContentInternals}
            </Typography>
            <FormControlLabel
                control={
                    <Checkbox
                        data-testid="agreement"
                        color={'primary'}
                        checked={eulaAccepted}
                        disabled={!!(eulaContent && !actionEnable)}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            onEulaChanged(event.target.checked)
                        }
                    />
                }
                label={'I have read and agree to the Terms & Conditions'}
                sx={EulaAction()}
            />
        </>
    );
};
