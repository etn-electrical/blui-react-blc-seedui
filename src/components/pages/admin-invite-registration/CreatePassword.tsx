import React, { useState, useRef, useEffect, ChangeEvent, useCallback } from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { useTheme } from '@mui/material/styles';

import { SecureTextField } from '../../common/secureTextField/SecureTextField';
import { FullDividerStyles, TextFieldStyles } from './RegistrationStyle';
import { PasswordRequirements } from '../../common/passwordRequirement/PasswordRequirements';
import { defaultPasswordRequirements } from '../../../constants/registration-constants';
import { CreatePasswordProps } from '../../../types/registration-types';
import { RegSubDescriptionStyle } from '../../../styles/RegistrationStyle';

export const CreatePassword: React.FC<React.PropsWithChildren<React.PropsWithChildren<CreatePasswordProps>>> = (
    props
) => {
    const { onPasswordChanged, initialPassword = '', onSubmit } = props;
    const passwordRef = useRef(null);
    const confirmRef = useRef(null);
    const theme = useTheme();
    const [passwordInput, setPasswordInput] = useState(initialPassword);
    const [confirmInput, setConfirmInput] = useState(initialPassword);

    const passwordRequirements = defaultPasswordRequirements();
    const areValidMatchingPasswords = useCallback((): boolean => {
        for (let i = 0; i < passwordRequirements.length; i++) {
            if (!new RegExp(passwordRequirements[i].regex).test(passwordInput)) return false;
        }
        return confirmInput === passwordInput;
    }, [passwordInput, confirmInput]);

    const onPassChange = useCallback(
        (newPassword: string) => {
            setPasswordInput(newPassword);
        },
        [setPasswordInput, confirmInput]
    );

    const onConfirmChange = useCallback(
        (newConfirm: string) => {
            setConfirmInput(newConfirm);
        },
        [setConfirmInput, passwordInput]
    );

    useEffect(() => {
        onPasswordChanged(areValidMatchingPasswords() ? passwordInput : '');
    }, [onPasswordChanged, passwordInput, confirmInput]);

    return (
        <>
            <Typography sx={RegSubDescriptionStyle(theme)}>
                Enter and confirm your password below to continue with account registration. Fields marked with an (*)
                are required.
            </Typography>

            <Divider sx={FullDividerStyles(theme)} />

            <SecureTextField
                required
                id="password"
                name="password"
                inputRef={passwordRef}
                label={'New Password'}
                value={passwordInput}
                onChange={(evt: ChangeEvent<HTMLInputElement>): void => onPassChange(evt.target.value)}
                sx={TextFieldStyles(theme, true)}
            />
            <PasswordRequirements sx={{ mt: '9px' }} passwordText={passwordInput} />
            <SecureTextField
                required
                id="confirm"
                name="confirm"
                inputRef={confirmRef}
                label={'Confirm Password'}
                sx={TextFieldStyles(theme)}
                value={confirmInput}
                onChange={(evt: ChangeEvent<HTMLInputElement>): void => onConfirmChange(evt.target.value)}
                onKeyPress={(e): void => {
                    if (e.key === 'Enter' && onSubmit) onSubmit();
                }}
            />
        </>
    );
};
