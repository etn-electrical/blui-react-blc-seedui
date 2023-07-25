import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { VerifyTextStyles, ReturnButtonStyles } from './SelfRegistrationStyle';

export const VerificationSent: React.FC = () => {
    const theme = useTheme();

    return (
        <>
            <Typography sx={VerifyTextStyles(theme)}>
                A verification link has been sent to the email address you provided.
            </Typography>
            <Typography sx={VerifyTextStyles(theme)}>
                Please allow up to five minutes to receive the verification email. There will be a button in the email
                to click on to continue the account registration process.
            </Typography>
            <Box sx={{ position: 'absolute', bottom: 0, width: '94%' }}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={ReturnButtonStyles()}
                    onClick={(): void => {
                        window.location.href = '/';
                    }}
                >
                    {' '}
                    Return To Login{' '}
                </Button>
            </Box>
        </>
    );
};
