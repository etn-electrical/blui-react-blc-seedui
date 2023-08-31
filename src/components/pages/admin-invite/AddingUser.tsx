import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { useTheme } from '@mui/material/styles';
import { useInjectedUIContext } from '../../../context/AuthContextProvider';
import { ContainerComponent } from '../../common/container/Container';
import { DialogTitleStyles, DialogContentStyles } from '../../../styles/RegistrationStyle';
import {
    DialogButtonStyles,
    AdminInviteStyles,
    FullDividerStyles,
    SubTitleStyles,
    EmailInputField,
} from './AdminInviteStyle';
import { isValidEmail } from '../../../utils/common';

type AddingUserPropsType = {
    email: string[];
    advancePage: (active: number) => void;
    setEmail: (email: string[]) => void;
};

export const AddingUser: React.FC<React.PropsWithChildren<AddingUserPropsType>> = (props: AddingUserPropsType) => {
    const { advancePage, email, setEmail } = props;
    const [emailInput, setEmailInput] = React.useState('');
    const { authUIConfig } = useInjectedUIContext();
    const { inviteCount = 0 } = authUIConfig;
    const theme = useTheme();

    const handleEmailInput = (value: string, blur?: boolean) => {
        const newEmail = value
            .trim()
            .split(';')
            .filter((email) => email);
        const validateEmail = newEmail.filter((email) => !isValidEmail(email));
        if (
            ((newEmail.length === 1 && value.indexOf(';') != -1) || newEmail.length > 1 || blur) &&
            !validateEmail.length
        ) {
            inviteCount <= 0 || email.length < inviteCount
                ? setEmail([...[...email, ...newEmail].slice(0, inviteCount)])
                : setEmail([...email, ...newEmail]);
            setEmailInput('');
        } else {
            setEmailInput(value.trim());
        }
    };

    const removeSelected = (index: number) => {
        email.splice(index, 1);
        setEmail([...email]);
    };

    const showEmailError = emailInput.length !== 0 && !isValidEmail(emailInput);

    return (
        <>
            <ContainerComponent>
                <CardHeader
                    title={
                        <Typography variant={'h6'} sx={{ fontWeight: 600 }}>
                            {' '}
                            Invite Users
                        </Typography>
                    }
                    sx={DialogTitleStyles(theme)}
                />
                <CardContent sx={DialogContentStyles(theme)}>
                    <Typography sx={SubTitleStyles(true)}>Please enter the email address. Seperate</Typography>
                    <Typography sx={SubTitleStyles()}>multiple accounts with semicolons (;).</Typography>

                    <Divider sx={FullDividerStyles(theme)} />
                    <div className="App">
                        <Autocomplete
                            inputValue={emailInput}
                            multiple
                            id="email"
                            value={email}
                            disableClearable
                            options={[]}
                            freeSolo
                            renderTags={(value, getTagProps) => {
                                return value.map((option, index) => (
                                    <Chip
                                        key={index}
                                        sx={{ margin: '10px 8px 0px 0px' }}
                                        label={option}
                                        onDelete={() => removeSelected(index)}
                                        // {...getTagProps({ index })}
                                    />
                                ));
                            }}
                            renderInput={(params) => {
                                return (
                                    <TextField
                                        {...params}
                                        inputProps={{
                                            ...params.inputProps,
                                            onKeyDown: (e) => {
                                                if (e.key === 'Enter') {
                                                    e.stopPropagation();
                                                }
                                            },
                                        }}
                                        value={emailInput}
                                        data-testid="email"
                                        variant="filled"
                                        label="Email Address"
                                        onBlur={() => {
                                            handleEmailInput(emailInput, true);
                                        }}
                                        onChange={(event) => {
                                            (inviteCount <= 0 || email.length < inviteCount) &&
                                                handleEmailInput(event.target.value);
                                        }}
                                        sx={EmailInputField(email.length)}
                                        multiline={true}
                                        error={showEmailError}
                                        helperText={
                                            showEmailError
                                                ? 'Please enter legit email address???'
                                                : inviteCount <= 0
                                                ? ''
                                                : `You can invite at most ${inviteCount} people at once.`
                                        }
                                    />
                                );
                            }}
                        />
                    </div>
                </CardContent>
                <Divider />
                <CardActions sx={AdminInviteStyles(theme)}>
                    <Button
                        variant="outlined"
                        color="primary"
                        sx={DialogButtonStyles()}
                        onClick={() => (window.location.href = '/dashboard')}
                    >
                        {' '}
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        data-testid="nextAction"
                        disableElevation
                        disabled={!((email.length > 0 || emailInput.length) && !showEmailError)}
                        onClick={(): void => {
                            const emailList = emailInput ? [...email, emailInput] : email;
                            setEmail(emailList.filter((email, index) => emailList.indexOf(email) === index));
                            setEmailInput('');
                            advancePage(1);
                        }}
                        sx={DialogButtonStyles()}
                    >
                        {' '}
                        Next{' '}
                    </Button>
                </CardActions>
            </ContainerComponent>
        </>
    );
};
