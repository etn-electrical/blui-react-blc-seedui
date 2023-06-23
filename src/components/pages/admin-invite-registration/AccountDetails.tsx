import React, { useEffect, useRef } from 'react';
import { TextField, Box, Typography, Divider } from '@mui/material';

import { useTheme } from '@mui/material/styles';
import { FullDividerStyles, TextFieldStyles } from './RegistrationStyle';
import { AccountDetailsProps } from '../../../types/registration-types';
import { RegSubDescriptionStyle } from '../../../styles/RegistrationStyle';



export const AccountDetails: React.FC<React.PropsWithChildren<React.PropsWithChildren<AccountDetailsProps>>> = (
    props
) => {
    const { onDetailsChanged, initialDetails, onSubmit } = props;
    const theme = useTheme();

    const firstRef = useRef<any>(null);
    const lastRef = useRef<any>(null);
    const phoneRef = useRef<any>(null);

    const [firstNameInput, setFirstNameInput] = React.useState(initialDetails ? initialDetails.firstName : '');
    const [lastNameInput, setLastNameInput] = React.useState(initialDetails ? initialDetails.lastName : '');
    const [phoneNumber, setPhoneNumber] = React.useState(initialDetails ? initialDetails.phoneNumber : '');


    useEffect((): void => {
        const valid = firstNameInput !== '' && lastNameInput !== '';
        onDetailsChanged({ firstName: firstNameInput, lastName: lastNameInput, valid, phoneNumber });
    }, [onDetailsChanged, firstNameInput, lastNameInput, phoneNumber]);

    const onChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const numregex = /^\d*$/;
        if (e.target.value === '' || numregex.test(e.target.value)) {
            setPhoneNumber(e.target.value);
        }
    };

    return (
        <>
            <Typography sx={RegSubDescriptionStyle(theme)}>Enter your details below to continue with account creation. Fields marked with an (*) are required.</Typography>
            <Divider sx={FullDividerStyles(theme)} />
            <TextField
                required
                inputRef={firstRef}
                id="first"
                data-testid="first"
                label="First Name"
                fullWidth
                value={firstNameInput}
                onChange={(evt): void => {
                    setFirstNameInput(evt.target.value);
                }}
                onKeyPress={(e): void => {
                    if (e.key === 'Enter' && lastRef.current) lastRef.current.focus();
                }}
                variant="filled"
                sx={TextFieldStyles(theme, true)}
                inputProps={{ maxLength: 15 }}
            />
            <TextField
                inputRef={lastRef}
                required
                id="last"
                data-testid="last"
                label="Last Name"
                fullWidth
                value={lastNameInput}
                onChange={(evt): void => {
                    setLastNameInput(evt.target.value);
                }}
                variant="filled"
                sx={TextFieldStyles(theme)}
                inputProps={{ maxLength: 15 }}
            />
            <Box>
                <TextField
                    style={{ marginTop: 24, width: '28%', marginRight: 22 }}
                    variant="filled"
                    id="code"
                    data-testid="code"
                    label="Area Code"
                    value={'+1'}
                    sx={TextFieldStyles(theme)}
                    disabled
                />
                <TextField
                    inputRef={phoneRef}
                    style={{ marginTop: 24, width: '66%' }}
                    id="phoneNumber"
                    data-testid="phoneNumber"
                    label="Phone Number"
                    fullWidth
                    value={phoneNumber}
                    onChange={(e): void => onChangePhoneNumber(e)}
                    onKeyPress={(e): void => {
                        if (e.key === 'Enter' && onSubmit) onSubmit();
                    }}
                    variant="filled"
                    sx={TextFieldStyles(theme)}
                    inputProps={{ maxLength: 10 }}
                />
            </Box>
        </>
    );
};
