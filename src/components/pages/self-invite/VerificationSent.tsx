import React from 'react';
import { Typography }  from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { VerifyTextStyles } from './SelfRegistrationStyle';


export const VerificationSent: React.FC = () => {
    const theme = useTheme();

    return (
        <>
            <Typography sx={VerifyTextStyles(theme)} >A verification link has been sent to the email address you provided.</Typography>
            <Typography sx={VerifyTextStyles(theme)} >Please allow up to five minutes to receive the verification email. 
                There will be a button in the email to click on to continue the account registration process.
            </Typography>            
        </>
    );
};
