import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import DomainIcon from '@mui/icons-material/Domain';

import { useTheme } from '@mui/material/styles';
import { IconHolderStyles, DialogExtButtonStyles, RegCompleteContainerStyles, IconContainerStyles, OrgTxtStyles, DialogButtonStyles } from './SelfRegistrationStyle';
import { RegContainerStyles } from '../../../styles/RegistrationStyle';

export type RegistrationProps = {
  onSubmit?: () => void;
};

export const SiteOptions: React.FC<React.PropsWithChildren<RegistrationProps>> = (props) => {

  const { onSubmit } = props;
  const theme = useTheme();

  return (
    <Box sx={RegContainerStyles(theme)}>
      <Box sx={RegCompleteContainerStyles(theme)} >
        <Box sx={IconHolderStyles(theme)}>
          <Typography sx={IconContainerStyles(theme)}>
            <DomainIcon color={'primary'} sx={{ fontSize: 54 }} />
          </Typography>
        </Box>

        <Typography sx={OrgTxtStyles(theme, 'first')} variant="subtitle2" color={'textSecondary'}>
          Now that you've specified your account details, you need to add your Organization details.
        </Typography>
        <Typography sx={OrgTxtStyles(theme)} variant="subtitle2" color={'textSecondary'}>
          If you want to create a new Organization, choose Create a New Organization below.
        </Typography>
        <Typography sx={OrgTxtStyles(theme)} variant="subtitle2" color={'textSecondary'}>
          If your Organization already exists, ask your administrator to provide you with the
          Registration Code and choose Join Existing Organization below.
        </Typography>


      </Box>
      <Divider />
      <Box>
        <Button
          variant="outlined"
          color="primary"
          onClick={(): void => onSubmit()}
          sx={DialogButtonStyles(true, true)}
        > Create a New Organization </Button>
        <Button
          variant="outlined"
          color="primary"
          disabled={true}
          sx={DialogExtButtonStyles()}
        > Join Existing Organization </Button>
      </Box>
    </Box>
  );
};
