import React from 'react';
import { Box, Typography, List, ListItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useTheme } from '@mui/material/styles';

import { RegCompleteContainerStyles } from './RegistrationStyle';
import { RegistrationCompleteProps } from '../../../types/registration-types';
import { roleSiteCollection } from '../../../utils/common';

export const RegistrationComplete: React.FC<
    React.PropsWithChildren<React.PropsWithChildren<RegistrationCompleteProps>>
> = (props) => {
    const { responseData } = props;
    const theme = useTheme();
    const roleSiteList = React.useMemo(() => roleSiteCollection(responseData.sites || []), [responseData.sites])
    return (
        <Box sx={RegCompleteContainerStyles(theme)} >
            <Box sx={{ display: 'flex', justifyContent: 'center' }}><AccountCircle color={'primary'} sx={{ fontSize: 54, height: '64px', width: '64px' }} /></Box>
            <Typography sx={{ mt: '57px', mb: '35px' }} variant="h6" color="inherit">Welcome {responseData.name}!</Typography>
            <Typography sx={{ mb: '20px' }} variant="subtitle2" color={'textSecondary'}>
                Your account has been successfully created.
            </Typography>

            <Typography variant="subtitle2" color={'textSecondary'}>
                Your account now has the roles:
            </Typography>


            <List sx={{ listStyleType: 'disc', pl: 5 }}>
                {
                    Object.keys(roleSiteList).map(key => (
                        <Typography variant="subtitle2" color={'textSecondary'}>
                            <ListItem sx={{ display: 'list-item', padding: '4px 4px' }}> {key}{roleSiteList[key].length ? ':' : ''} {roleSiteList[key].join(", ")}
                            </ListItem></Typography>
                    ))
                }
            </List>

            <Typography sx={{ mt: '20px' }} variant="subtitle2" color={'textSecondary'}>
                You can now Login using the email address and password you specified during the account registration process
            </Typography>

        </Box>
    );
};
