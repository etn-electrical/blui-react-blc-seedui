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
import { loginUser, oktaLoginUser } from '../../../api/login';
import { EMAIL_REGEX, ERROR_MSG } from '../../../constants/registration-constants';
import { LoginUserType } from '../../../types/login-types';
import { LocationSiteProps } from '../../../types/admininvite-types';
import { getAdminInviteSite } from '../../../api/admin-invite-register';
import {
    SupportStyles,
    LinkStyles,
    LinksWrapperStyles,
    LoginContainerStyles,
    EmailFieldStyles,
    ActionStyles,
} from './loginStyle';
import { LocalStorage } from '../../../utils/local-storage';
import { codeChallenge, codeVerifier } from '../../../utils/common';
import CustomizedSnackbar from '../../common/snackbar/Snackbar';
import { config, oktaConfig } from '../../../app-config';

export const Login: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = () => {
    const injectedContext = useInjectedUIContext();
    const theme = useTheme();
    const [password, setPassword] = React.useState('');
    const [emailInput, setEmailInput] = React.useState('');
    const [rememberMe, setRememberMe] = React.useState(false);
    const [isValidEmail, setIsValidEmail] = React.useState(false);
    const [isInValidCredential, setIsInValidCredential] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [loginSuccess, setLoginSuccess] = React.useState<{ message: string }>({ message: '' });

    const { authActions, showSelfRegistration, authUIConfig } = injectedContext;
    const { applicationId, adopterId, clientid, redirectUri } = authUIConfig;

    useEffect(() => {
        const { rememberMe = false, email } = LocalStorage.getRememberMe();
        if (rememberMe) {
            setRememberMe(true);
            setEmailInput(email);
            setIsValidEmail(EMAIL_REGEX.test(email));
        }
    }, []);

    const hasEmailError = useCallback(
        (): boolean => emailInput.length !== 0 && !isValidEmail,
        [emailInput, isValidEmail]
    );

    const getEmailHelperText = (): string => {
        if (isInValidCredential) {
            return 'Invalid Credentials';
        } else if (hasEmailError()) {
            return 'Please enter a valid email';
        }
        return '';
    };

    const loginTapped = async () => {
        setLoading(true);
        const response: LoginUserType = await loginUser({ user: emailInput, password, applicationId, adopterId });
        if (response.status === 200) {
            processResponse(response);
        } else {
            response.status === 404 || response.status === 0
                ? setIsInValidCredential(true)
                : setLoginSuccess({ message: ERROR_MSG });
        }
        setLoading(false);
    };

    // const loginTapped = async () => {
    //     setLoading(true);
    //     const response: any = await oktaLoginUser({
    //         username: emailInput,
    //         password: password,
    //         options: {
    //             multiOptionalFactorEnroll: true,
    //             warnBeforePasswordExpired: true,
    //         },
    //     });
    //     if (response.status === 200) {
    //         processOktaToken(response);
    //     } else {
    //         response.status === 404 || response.status === 0 ? setIsInValidCredential(true) : setLoginSuccess({ message: ERROR_MSG });
    //     }
    //     setLoading(false);
    // };

    // const getOktaConfig = async () => {
    //     const { scope, state, response_type, code_challenge_method } = oktaConfig;
    //     const code_verifier = codeVerifier();
    //     const code_challenge: any = await codeChallenge(code_verifier);
    //     return {
    //         scope, state, response_type, code_challenge_method, code_verifier, code_challenge
    //     }
    // }

    // const processOktaToken = async (response: any) => {
    //     const { sessionToken } = response.response;
    //     const { scope, state, response_type, code_challenge_method, code_verifier, code_challenge } = await getOktaConfig();
    //     LocalStorage.setCodeVerifier(code_verifier, code_challenge);
    //     LocalStorage.setRememberMe(rememberMe, emailInput);
    //     window.location.href = `${config.oktaUrl}/oauth2/aus3x5jojewaRZEnQ1d7/v1/authorize?client_id=${clientid}&response_type=${response_type}&scope=${scope}&redirect_uri=${redirectUri}&state=${state}&sessionToken=${sessionToken}&code_challenge_method=${code_challenge_method}&code_challenge=${code_challenge}`;
    // }

    const processResponse = (response: LoginUserType) => {
        const { token, adminRoleId, id_token } = response.response;
        LocalStorage.setAuthTocken(token, adminRoleId, id_token);
        LocalStorage.setRememberMe(rememberMe, emailInput);
        authActions().logIn(response.response);
    };

    return (
        <BrandedCardContainer loading={loading}>
            <CustomizedSnackbar
                open={!!loginSuccess.message.length}
                message={loginSuccess.message}
                removeToast={(event: Event) => setLoginSuccess({ message: '' })}
            />
            <form
                onSubmit={(evt): void => {
                    evt.preventDefault();
                    loginTapped();
                }}
            >
                <Box sx={LoginContainerStyles(theme)}>
                    <Box sx={{ mb: 6 }}>
                        <Box component="img" sx={{ maxWidth: '100%', maxHeight: 80 }} src={projectImage} alt="logo" />
                    </Box>

                    <TextField
                        label={'Email Address'}
                        id="email"
                        name={'email'}
                        type={'email'}
                        sx={EmailFieldStyles(theme)}
                        value={emailInput}
                        onChange={(evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
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
                        value={password}
                        onChange={(evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                            setPassword(evt.target.value);
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
                            disabled={!EMAIL_REGEX.test(emailInput) || !password}
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
                        {showSelfRegistration ? (
                            <Typography variant="body2" color={'primary'} sx={{ mb: 4, mt: 1 }}>
                                <Box component={Link} sx={LinkStyles(theme)} to={'/selfinvite'}>
                                    Self Registration
                                </Box>
                            </Typography>
                        ) : (
                            <Typography variant="body2" sx={SupportStyles()}>
                                Contact an Eaton Support Representative
                            </Typography>
                        )}
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
