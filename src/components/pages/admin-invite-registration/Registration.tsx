import React, { useState, useMemo, useEffect } from 'react';
import { Typography, Card, CardContent, Divider, CardHeader, MobileStepper, CardActions, Button, Box } from '@mui/material';
import { isBefore } from 'date-fns';

import { useTheme } from '@mui/material/styles';
import { postAdminUserRegister } from '../../../api/admin-invite-register';
import { CreatePassword } from './CreatePassword';
import { AccountDetails } from './AccountDetails';
import { AcceptEula } from './AcceptEula';
import { RegistrationComplete } from './RegistrationComplete';
import { RegistrationExpired } from './RegistrationExpired';
import { useInjectedUIContext } from '../../../context/AuthContextProvider';
import { RegContainerStyles, DialogTitleStyles, DialogContentStyles, RegistrationContainerStyle } from '../../../styles/RegistrationStyle';
import { ReturnToLoginStyles, DialogActionsStyles, DialogButtonStyles, StepperStyles, StepperDotStyles } from './RegistrationStyle';
import { RegistrationPage } from '../../../types/registration-types';
import { SAMPLE_EULA } from './sampleEula';
import { Spinner } from '../../common/spinner/Spinner';


export const Registration: React.FC = () => {
    const { authActions } = useInjectedUIContext();
    const url = new URL(window.location.href);
    const [password, setPassword] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [eulaAccepted, setEulaAccepted] = useState(false);
    const [accountDetails, setAccountDetails] = useState({ firstName: '', lastName: '', phoneNumber: '' });
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState('');
    const [responseData, setResponseData] = useState({});
    const existingUser = url.searchParams.get('isExistingUser') || '';
    const expiryTime = url.searchParams.get('expiryTime') || '';

    const theme = useTheme();
    const eulaContent = useMemo(() => authActions().loadEula(),[authActions])

    useEffect(() => {
        if (expiryTime && !isBefore(new Date(), Number(expiryTime) * 1000)) {
            setCurrentPage(4);
        }
    }, [])

    const RegistrationPages: RegistrationPage[] = [
        {
            name: 'Eula',
            pageTitle: 'License Agreement',
            pageBody: (
                <AcceptEula
                    eulaAccepted={eulaAccepted}
                    onEulaChanged={setEulaAccepted}
                    eulaContent={eulaContent || SAMPLE_EULA}
                />
            ),
            canGoForward: eulaAccepted,
            canGoBack: true,
        },
        {
            name: 'CreatePassword',
            pageTitle: 'Create Password',
            pageBody: (
                <CreatePassword
                    onPasswordChanged={setPassword}
                    initialPassword={password}
                    onSubmit={password.length > 0 ? (): void => advancePage(1) : undefined}
                />
            ),
            canGoForward: password.length > 0,
            canGoBack: true,
        },
        {
            name: 'AccountDetails',
            pageTitle: 'Account Details',
            pageBody: (
                <AccountDetails
                    onDetailsChanged={setAccountDetails}
                    initialDetails={accountDetails}
                    onSubmit={accountDetails.firstName.length && accountDetails.lastName.length ? (): void => advancePage(1) : undefined}
                />
            ),
            canGoForward: accountDetails.firstName.length > 0 && accountDetails.lastName.length > 0,
            canGoBack: true,
            lastScreen: true
        },
        {
            name: 'Complete',
            pageTitle: '',
            pageBody: (
                <RegistrationComplete
                    firstName={accountDetails.firstName}
                    lastName={accountDetails.lastName}
                    email={email}
                    responseData={responseData}
                />
            ),
            canGoForward: true,
            canGoBack: false
        },
        {
            name: 'Expired',
            pageTitle: 'Registration Link Expired',
            pageBody: (
                <RegistrationExpired />
            ),
            canGoForward: true,
            canGoBack: false,
        }
    ]

    
    const registrationUser = async (userType = false) => {
        const currentScreen = userType ? RegistrationPages.length - 3 : currentPage;
        const request = {
            invitationKey: url.searchParams.get('invitationkey'),
            password: password,
            userDetails: {
                firstName: accountDetails.firstName,
                lastName: accountDetails.lastName,
                phoneNumber: accountDetails.phoneNumber,

            }
        }
        setLoading(true);
        const response: any = await postAdminUserRegister(request);
        setLoading(false);
        setCurrentPage(response.status === 200 ? currentScreen + 1 : currentScreen + 2);
        response && response.response && setResponseData(response.response.data)
    }

    const advancePage = (delta = 0): void => {
        const isExistingUser = existingUser.toLowerCase() === 'true';
        if ((currentPage !== 0 && delta === -1) || (currentPage !== RegistrationPages.length - 1 && delta === 1)) {
            if ((delta !== -1 && currentPage === RegistrationPages.length - 3) || isExistingUser) {
                registrationUser(isExistingUser);
            } else {
                setCurrentPage(currentPage + delta);
            }
        }
    };
    const canProgress = (): boolean => RegistrationPages[currentPage].canGoForward ?? false;
    const isLastStep = currentPage >= RegistrationPages.length - 2;

    return (
        <Box sx={RegistrationContainerStyle(theme)}>
            <Spinner visible={loading} />
            <Card sx={RegContainerStyles(theme)}>
                <CardHeader
                    title={<Typography variant={'h6'} sx={{ fontWeight: 600 }}> {RegistrationPages[currentPage].pageTitle || ''} </Typography>}
                    sx={DialogTitleStyles(theme)}
                />
                <CardContent sx={DialogContentStyles(theme)}>{RegistrationPages[currentPage].pageBody}</CardContent>
               {!isLastStep && <Divider />}
                <CardActions sx={DialogActionsStyles(theme)}>
                    {isLastStep ?
                        <Button
                            variant={'contained'}
                            disableElevation
                            color={'primary'}
                            sx={ReturnToLoginStyles()}
                            onClick={(): void => { window.location.href="/" }}
                        >
                            Return to Login
                        </Button>
                        :
                        <MobileStepper
                            variant={'dots'}
                            position={'static'}
                            steps={existingUser === 'False' ? RegistrationPages.length - 2 : 0}
                            activeStep={currentPage}
                            backButton={
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={(): void => advancePage(-1)}
                                    sx={DialogButtonStyles(false, currentPage != 0)}
                                > Back </Button>
                            }
                            nextButton={
                                <Button
                                    variant="contained"
                                    color="primary"
                                    data-testid="nextAction"
                                    disableElevation
                                    disabled={!canProgress()}
                                    onClick={(): void => advancePage(1)}
                                    sx={DialogButtonStyles()}
                                >{RegistrationPages[currentPage].lastScreen ? 'Finish' : 'Next'}</Button>
                            }
                            sx={{ ...StepperStyles, '& .MuiMobileStepper-dot': StepperDotStyles(theme) }}
                        />
                    }
                </CardActions>
            </Card>
            </Box>
    )
}