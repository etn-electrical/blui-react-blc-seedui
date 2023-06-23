import React from 'react';
import { Typography, Box, Button } from '@mui/material';

import { useTheme } from '@mui/material/styles';
import { RegCompleteContainerStyles, OrgTxtStyles, ExpiredBtn } from './SelfRegistrationStyle';
import { RegContainerStyles } from '../../../styles/RegistrationStyle';

export const RegistrationExpired: React.FC = () => {

  const theme = useTheme();


  return (
    <Box sx={RegContainerStyles(theme)}>
      <Box sx={RegCompleteContainerStyles(theme)} >

        <Typography sx={OrgTxtStyles(theme)} variant="subtitle2" color={'textSecondary'} style={{marginTop: '0px'}}>
          This Registration Link has expired. Registration may have already been completed or the allowable time
          for the link has passed.
        </Typography>
        <Typography sx={OrgTxtStyles(theme)} variant="subtitle2" color={'textSecondary'}>
          If the link expired before you were able to Register, please contact your admin to get another email
          invitation or reach out to brightlayerappsupport@eaton.com.
        </Typography>
      </Box>
      <Box>
      <Button
          variant="contained"
          color="primary"
          sx={ExpiredBtn()}
          onClick={(): void => { window.location.href="/" }}
        > Return To Login </Button>
        </Box>
    </Box>
  );
};
