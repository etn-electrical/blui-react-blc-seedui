import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { useTheme } from '@mui/material/styles';
import { RegCompleteContainerStyles, OrgTxtStyles } from './SelfRegistrationStyle';
import { RegContainerStyles } from '../../../styles/RegistrationStyle';
import { useInjectedUIContext } from '../../../context/AuthContextProvider';

export const UserAccountFound: React.FC = () => {
    const { authUIConfig } = useInjectedUIContext();
    const { adopterApplicationName } = authUIConfig;
    const theme = useTheme();

    return (
        <Box sx={RegContainerStyles(theme)}>
            <Box sx={RegCompleteContainerStyles(theme)}>
                <Typography
                    sx={OrgTxtStyles(theme)}
                    variant="subtitle2"
                    color={'textSecondary'}
                    style={{ marginTop: '0px' }}
                >
                    We found an Eaton account associated with this email address. This means you have already registered
                    this email address for another Eaton application.
                </Typography>
                <Typography sx={OrgTxtStyles(theme)} variant="subtitle2" color={'textSecondary'}>
                    You don't need to specify your password or User details and can continue with account registration
                    for {adopterApplicationName}.
                </Typography>
                <Typography sx={OrgTxtStyles(theme)} variant="subtitle2" color={'textSecondary'}>
                    If you've forgotten your password, click the Forgot Password link on the Log in page after
                    completing account registration.
                </Typography>
            </Box>
        </Box>
    );
};
