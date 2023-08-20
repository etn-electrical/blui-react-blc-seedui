import React, { useCallback, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import { BrandedCardContainer } from '../../common/cardContainer/BrandedCardContainer';
import { TextField } from '../../common/textField/TextField';
import cyberBadge from '../../../assets/cybersecurity_certified.png';
import projectImage from '../../../assets/login-logo.png';
import { useInjectedUIContext } from '../../../index';
import { loginUser } from '../../../api/login';
import { EMAIL_REGEX, ERROR_MSG } from '../../../constants/registration-constants';
import { LocationSiteProps } from '../../../types/admininvite-types';
import { getAdminInviteSite } from '../../../api/admin-invite-register';
import { SupportStyles, LinkStyles, LinksWrapperStyles, LoginContainerStyles, EmailFieldStyles, ActionStyles } from './loginStyle';
import { LocalStorage } from '../../../utils/local-storage';
import CustomizedSnackbar from '../../common/snackbar/Snackbar';

export const Login: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = () => {
    const injectedContext = useInjectedUIContext();
    const theme = useTheme();
    const [passwordInput, setPasswordInput] = React.useState('');
    const [emailInput, setEmailInput] = React.useState('');
    const [rememberMe, setRememberMe] = React.useState(false);
    const [isValidEmail, setIsValidEmail] = React.useState(false);
    const [isInValidCredential, setIsInValidCredential] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [loginSuccess, setLoginSuccess] = React.useState<{ message: string }>({ message: '' })

    const { authActions, showSelfRegistration, authUIConfig } = injectedContext;

    useEffect(() => {
        const { rememberMe = false, email } = LocalStorage.getRememberMe();
        if (rememberMe) {
            setRememberMe(true);
            setEmailInput(email);
            setIsValidEmail(EMAIL_REGEX.test(email));
        }
    }, [])

    const hasEmailError = useCallback(
        (): boolean => emailInput.length !== 0 && !isValidEmail,
        [emailInput, isValidEmail]
    );

    const getEmailHelperText = (): string => {
        if (isInValidCredential) {
            return 'Invalid Credentials'
        } else if (hasEmailError()) {
            return 'Please enter a valid email'
        }
        return ''
    };

    const loginTapped = async () => {
        setLoading(true);
        const response: any = await loginUser({
            user: emailInput,
            password: passwordInput,
            applicationId: authUIConfig.applicationId,
            adopterId: authUIConfig.adopterId
        })
        if (response.status === 200) {
            processResponse(response);
        } else if (response.status === 404 || response.status === 0) {
            setIsInValidCredential(true)
        } else {
            setLoginSuccess({ message: ERROR_MSG });
        }
        setLoading(false);

    }

    const processResponse = (response: any) => {
        const { token, adminRoleId } = response.response;
        LocalStorage.setAuthTocken(token, adminRoleId);
        LocalStorage.setRememberMe(rememberMe, emailInput);
        authActions().logIn(response.response);
    }

    return (
        <BrandedCardContainer loading={loading}>
            <CustomizedSnackbar
                open={!!loginSuccess.message.length}
                message={loginSuccess.message}
                removeToast={(event: Event) => setLoginSuccess({ message: '' })} />
            <form onSubmit={(evt): void => { evt.preventDefault(); loginTapped() }}>
                <Box sx={LoginContainerStyles(theme)} >

                    <Box sx={{ mb: 6 }}>
                        <Box
                            component="img"
                            sx={{ maxWidth: '100%', maxHeight: 80 }}
                            src={projectImage}
                            alt="logo"
                        />
                    </Box>

                    <TextField
                        label={'Email Address'}
                        id="email"
                        name={'email'}
                        type={'email'}
                        sx={EmailFieldStyles(theme)}
                        value={emailInput}
                        onChange={(evt: any) => {
                            const { value } = evt.target;
                            setIsValidEmail(EMAIL_REGEX.test(value));
                            setEmailInput(value);
                            setIsInValidCredential(false);
                        }}
                        variant="filled"
                        error={hasEmailError() || isInValidCredential}
                        helperText={getEmailHelperText()}
                    />
                    <TextField
                        id="password"
                        name="password"
                        label={'Password'}
                        sx={{
                            mb: `${(parseInt(theme.spacing(3)) + 16).toString()}px`,
                        }}
                        type={'password'}
                        value={passwordInput}
                        onChange={(evt: any) => {
                            setPasswordInput(evt.target.value);
                            setIsInValidCredential(false);
                        }}
                        variant="filled"
                        error={isInValidCredential}
                        helperText={isInValidCredential && 'Invalid Credentials'}
                    />

                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={ActionStyles(theme)}
                    >

                        <FormControlLabel
                            sx={{ [theme.breakpoints.down('sm')]: { mr: 0 } }}
                            control={
                                <Checkbox
                                    color="primary"
                                    checked={rememberMe}
                                    onChange={(evt): void => setRememberMe(evt.target.checked)}
                                />
                            }
                            label={'Remember Me'}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            data-testid="submit"
                            disableElevation
                            disabled={!EMAIL_REGEX.test(emailInput) || !passwordInput}
                            color="primary"
                            sx={{ width: 150 }}
                        >
                            {'Log In'}
                        </Button>
                    </Grid>

                    <Box sx={LinksWrapperStyles(theme)}>
                        <Typography variant="body2" sx={{ mt: 0 }}>
                            Need an account?
                        </Typography>
                        {showSelfRegistration ?
                            <Typography variant="body2" color={'primary'} sx={{ mb: 4, mt: 1 }}>
                                <Box
                                    component={Link}
                                    sx={LinkStyles(theme)}
                                    to={'/selfinvite'}>
                                    Self Registration
                                </Box>
                            </Typography> :
                            <Typography variant="body2" sx={SupportStyles()}>
                                Contact an Eaton Support Representative
                            </Typography>
                        }
                    </Box>
                    <Box
                        component="img"
                        src={cyberBadge}
                        sx={{ alignSelf: 'center', maxWidth: '30%' }}
                        alt="CyberSecurity Certification Badge"
                    />
                </Box>
            </form>
        </BrandedCardContainer>
    );
};
