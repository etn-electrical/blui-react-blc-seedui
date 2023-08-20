import React, { useState } from 'react';
import { Button, CardActions, CardContent, Divider, CardHeader, Typography, Chip, TextField, Autocomplete } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useInjectedUIContext } from '../../../context/AuthContextProvider';

import { ContainerComponent } from '../../common/container/Container';
import { DialogTitleStyles, DialogContentStyles } from '../../../styles/RegistrationStyle';
import { DialogButtonStyles, AdminInviteStyles, FullDividerStyles, SubTitleStyles, EmailInputField } from './AdminInviteStyle';
import CustomizedSnackbar from '../../common/snackbar/Snackbar';
import { isValidEmail } from '../../../utils/common';

export const AddingUser: React.FC<React.PropsWithChildren<any>> = (props: any) => {
    const [emailInput, setEmailInput] = React.useState('');
    const { advancePage, email, setEmail } = props;

    const { authUIConfig } = useInjectedUIContext();
    const { inviteLimitation = false, inviteCount } = authUIConfig;

    const [inviteSuccess, setInviteSuccess] = useState<{ message: string }>({ message: '' })
    const [loading, setLoading] = useState<boolean>(false);
    const theme = useTheme();

    const handleEmailInput = (value: string, blur?: boolean) => {
        const newEmail = value.trim().split(';').filter(email => email)
        const validateEmail = newEmail.filter(email => !isValidEmail(email))
        if (((newEmail.length === 1 && value.indexOf(';') != -1) || newEmail.length > 1 || blur) && !validateEmail.length) {
            setEmail([...email, ...newEmail]);
            setEmailInput('');
        } else {
            setEmailInput(value.trim());
        }
    }

    const removeSelected = (index: number) => {
        email.splice(index, 1);
        setEmail([...email]);
    }

    const showEmailError = emailInput.length !== 0 && !isValidEmail(emailInput);

    return (
        <>
            <ContainerComponent loading={loading}>
                <CustomizedSnackbar
                    open={inviteSuccess.message.length}
                    message={inviteSuccess.message}
                    removeToast={(event: Event) => setInviteSuccess({ message: '' })} />
                <CardHeader
                    title={<Typography variant={'h6'} sx={{ fontWeight: 600 }}> Invite Users</Typography>}
                    sx={DialogTitleStyles(theme)}
                />
                <CardContent sx={DialogContentStyles(theme)}>
                    <Typography sx={SubTitleStyles(true)}>Please enter the email address. Seperate
                    </Typography>
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
                                ))
                            }
                            }
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
                                            }
                                        }}
                                        value={emailInput}
                                        variant="filled"
                                        label="Email Address"
                                        onBlur={() => {
                                            handleEmailInput(emailInput, true);
                                        }}
                                        onChange={(event) => {
                                            (!inviteLimitation || email.length < inviteCount) && handleEmailInput(event.target.value);
                                        }
                                        }
                                        sx={EmailInputField(email.length)}
                                        multiline={true}
                                        error={showEmailError}
                                        helperText={showEmailError ? 'Please enter a valid email' : ''}

                                    />
                                )
                            }
                            }
                        />
                    </div>

                </CardContent>
                <Divider />
                <CardActions sx={AdminInviteStyles(theme)}>
                    <Button
                        variant="outlined"
                        color="primary"
                        sx={DialogButtonStyles()}
                    > Cancel</Button>

                    <Button
                        variant="contained"
                        color="primary"
                        data-testid="nextAction"
                        disableElevation
                        disabled={!((email.length > 0 && !showEmailError) || (emailInput.length && !showEmailError))}

                        onClick={(): void => {
                            if (emailInput && isValidEmail(emailInput)) setEmail([...email, emailInput]);
                            setEmailInput('');
                            advancePage(1)
                        }
                        }
                        sx={DialogButtonStyles()}
                    > Next </Button>

                </CardActions>
            </ContainerComponent>
        </>
    )
}