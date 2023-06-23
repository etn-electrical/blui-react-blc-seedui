import React from 'react';
import { Typography, Box, Button, Divider } from '@mui/material';
import DomainIcon from '@mui/icons-material/Domain';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useTheme } from '@mui/material/styles';
import { OrgTxtTitleStyles, DialogExtButtonStyles, RegCompleteContainerStyles, IconContainerStyles, OrgTxtStyles, DialogButtonStyles } from './SelfRegistrationStyle';
import { RegContainerStyles } from '../../../styles/RegistrationStyle';

export type SelfRegistrationCompleteProps = {
  responseData: any;
};

export const SelfRegistrationComplete: React.FC<React.PropsWithChildren<SelfRegistrationCompleteProps>> = (props) => {

  const { responseData } = props;
  const { name, emailId, siteName, roleName } = responseData;
  const theme = useTheme();


  return (
    <Box sx={RegContainerStyles(theme)}>
      <Box sx={RegCompleteContainerStyles(theme)} >
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: '31px' }}>
        <Typography sx={IconContainerStyles(theme, true)}>
            <AccountCircle color={'primary'} sx={{ fontSize: 54 }} />
          </Typography>
          <Typography sx={IconContainerStyles(theme)}>
            <DomainIcon color={'primary'} sx={{ fontSize: 54 }} />
          </Typography>
        </Box>
        <Typography sx={OrgTxtTitleStyles(theme)} variant="h6" color="inherit">Welcome {name}!</Typography>
        <Typography sx={OrgTxtStyles(theme)} variant="subtitle2" color={'textSecondary'}>
          Your account has been successfully created with the email {emailId}.
        </Typography>
        <Typography sx={OrgTxtStyles(theme)} variant="subtitle2" color={'textSecondary'}>
          Your Organization {siteName} has also been successfully created and you are now the {roleName && roleName.join(", ")}.
        </Typography>
        <Typography sx={OrgTxtStyles(theme)} variant="subtitle2" color={'textSecondary'}>
          You can now Login using your email address and password associated with your account.
        </Typography>
       

      </Box>
      <Box>
        <Button
          variant="contained"
          color="primary"
          sx={DialogButtonStyles(true, true)}
          onClick={(): void => { window.location.href="/" }}
        > Return To Login </Button>
        <Button
          variant="outlined"
          color="primary"
          disabled={true}
          sx={DialogExtButtonStyles()}
        > Invite Others </Button>
      </Box>
      </Box>
  );
};
