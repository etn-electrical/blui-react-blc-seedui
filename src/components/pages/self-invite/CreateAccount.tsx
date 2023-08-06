import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';

import { FullDividerStyles, TextFieldStyles } from './SelfRegistrationStyle';
import { isValidEmail } from '../../../utils/common';
import { CreateAccountProps } from '../../../types/selfinvite-types';
import { RegSubDescriptionStyle } from '../../../styles/RegistrationStyle';


export const CreateAccount: React.FC<React.PropsWithChildren<React.PropsWithChildren<CreateAccountProps>>> = (props) => {
    const { initialEmail, onEmailChanged, onSubmit } = props;
    const theme = useTheme();

    const [emailInput, setEmailInput] = useState(initialEmail ?? '');
    const showEmailError = emailInput.length !== 0 && !isValidEmail(emailInput);


    return (
        <>
            <Typography sx={RegSubDescriptionStyle(theme)}>To register a new account, we first need to verify your email address. Fields marked with an (*) are required.</Typography>
            <Divider sx={FullDividerStyles(theme)} />
            <TextField
             required
                id="email"
                label='Email Address'
                data-testid="email"
                fullWidth
                value={emailInput}
                onChange={(evt): void => {
                    setEmailInput(evt.target.value);
                    const validEmailOrEmpty = isValidEmail(evt.target.value) ? evt.target.value : '';
                    onEmailChanged(validEmailOrEmpty);
                }}
                onKeyPress={(e): void => {
                    if (e.key === 'Enter' && onSubmit) onSubmit();
                }}
                variant="filled"
                error={showEmailError}
                helperText={showEmailError ? 'Please enter a valid email' : ''}
                sx={TextFieldStyles(theme, 'first')}
            />
        </>
    );
};
