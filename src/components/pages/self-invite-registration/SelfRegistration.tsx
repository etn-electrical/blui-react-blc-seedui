import React, { useState, useMemo, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MobileStepper from '@mui/material/MobileStepper';
import Card from '@mui/material/Card';

import { useTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { isBefore } from 'date-fns';

import { CreatePassword } from '../admin-invite-registration/CreatePassword';
import { AccountDetails } from '../admin-invite-registration/AccountDetails';
import { AcceptEula } from '../admin-invite-registration/AcceptEula';
import { SiteDetails } from './SiteDetails';
import { SiteOptions } from './SiteOptions';
import { NewOrganization } from './NewOrganization';
import { SelfRegistrationComplete } from './SelfRegistrationComplete';
import {
    DialogActionsStyles,
    DialogButtonStyles,
    StepperStyles,
    StepperDotStyles,
} from '../self-invite/SelfRegistrationStyle';
import { BackIconStyles } from './SelfRegistrationStyle';
import {
    RegContainerStyles,
    DialogTitleStyles,
    DialogContentStyles,
    RegistrationContainerStyle,
} from '../../../styles/RegistrationStyle';

import { SAMPLE_EULA } from '../admin-invite-registration/sampleEula';
import { postSelfUserRegister } from '../../../api/self-user-register';
import { useInjectedUIContext } from '../../../context/AuthContextProvider';
import { RegistrationPage, PostSelfUserRegisterType, SelfInviteSuccessProps } from '../../../types/selfinvite-types';
import { AccountDetails as AccountDetailsTypes } from '../../../types/registration-types';
import { Spinner } from '../../common/spinner/Spinner';
import { RegistrationExpired } from './SelfRegistrationExpired';
import { UserAccountFound } from './UserAccountFound';

export const SelfRegistration: React.FC = () => {
    const { authUIConfig, authActions } = useInjectedUIContext();

    const [password, setPassword] = useState('');
    const [accountDetails, setAccountDetails] = useState<AccountDetailsTypes>({
        firstName: '',
        lastName: '',
        phoneNumber: '',
    });
    const [orgDetails, setOrgDetails] = useState<any>({
        address: '',
        address2: '',
        city: '',
        state: {},
        postalCode: '',
        country: { name: 'United States', id: 'US' },
    });
    const [loading, setLoading] = useState(false);
    const [eulaAccepted, setEulaAccepted] = useState(false);
    const [orgName, setOrgName] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [responseData, setResponseData] = useState<SelfInviteSuccessProps>();
    const url = new URL(window.location.href);
    const existingUser = url.searchParams.get('isExistingUser') || '';
    const expiryTime = url.searchParams.get('expiryTime') || '';
    const theme = useTheme();

    const eulaContent = useMemo(() => authActions().loadEula(), [authActions]);

    useEffect(() => {
        if (expiryTime && !isBefore(new Date(), Number(expiryTime) * 1000)) {
            setCurrentPage(existingUser.toLowerCase() === 'true' ? 6 : 7);
        }
    }, []);

    const RegistrationScreens: RegistrationPage[] = [
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
                    onSubmit={
                        accountDetails.firstName && accountDetails.lastName ? (): void => advancePage(1) : undefined
                    }
                />
            ),
            canGoForward: accountDetails.firstName.length > 0 && accountDetails.lastName.length > 0,
            canGoBack: true,
        },
        {
            name: 'AccountFound',
            pageTitle: 'Account Found',
            pageBody: <UserAccountFound />,
            canGoForward: true,
            canGoBack: true,
        },
        {
            name: 'Site Options',
            pageTitle: 'Join an Organization',
            pageBody: <SiteOptions onSubmit={(): void => advancePage(1)} />,
            canGoForward: true,
            canGoBack: true,
            actionDisable: true,
        },
        {
            name: 'New Organization',
            pageTitle: 'Create an Organization',
            pageBody: <NewOrganization setOrgName={setOrgName} orgName={orgName} />,
            canGoForward: orgName.length >= 3,
            canGoBack: true,
        },
        {
            name: 'Organization Details',
            pageTitle: 'Organization Details',
            pageBody: <SiteDetails orgDetails={orgDetails} setOrgDetails={setOrgDetails} />,
            canGoForward: true,
            canGoBack: true,
            lastScreen: true,
        },
        {
            name: 'Registration Completion',
            pageTitle: 'Account & Organization Created',
            pageBody: <SelfRegistrationComplete responseData={responseData} />,
            canGoForward: false,
            canGoBack: false,
            actionDisable: true,
        },
        {
            name: 'Expired',
            pageTitle: 'Registration Link Expired',
            pageBody: <RegistrationExpired />,
            canGoForward: true,
            canGoBack: false,
            actionDisable: true,
        },
    ];

    const RegistrationPages = useMemo(() => {
        if (existingUser.toLowerCase() === 'true') {
            RegistrationScreens.splice(1, 2);
            return RegistrationScreens;
        } else {
            RegistrationScreens.splice(3, 1);
            return RegistrationScreens;
        }
    }, [url.searchParams]);

    const userRegistration = async () => {
        const { adopterId } = authUIConfig;
        const request = {
            adopterId,
            invitationKey: url.searchParams.get('invitationkey'),
            password: password,
            userDetails: {
                firstName: accountDetails.firstName,
                lastName: accountDetails.lastName,
                phoneNumber: accountDetails.phoneNumber,
            },
            siteDetails: {
                siteName: orgName,
                siteAddress1: orgDetails.address,
                siteAddress2: orgDetails.address2,
                city: orgDetails.city,
                country: orgDetails.country?.name,
                state: orgDetails.state?.name,
                postalCode: orgDetails.postalCode,
            },
        };
        setLoading(true);
        const response: PostSelfUserRegisterType = await postSelfUserRegister(request);
        if (response.status === 200) {
            setCurrentPage(currentPage + 1);
            response && response.response && setResponseData(response.response.data);
        } else {
            setCurrentPage(currentPage + 2);
        }
        setLoading(false);
    };

    const advancePage = (delta = 0): void => {
        if ((currentPage !== 0 && delta === -1) || (currentPage !== RegistrationPages.length - 1 && delta === 1)) {
            if (delta !== -1 && currentPage === RegistrationPages.length - 3) {
                userRegistration();
            } else {
                setCurrentPage(currentPage + delta);
            }
        }
    };

    const isLastStep = currentPage === RegistrationPages.length - 1;
    const canProgress = (): boolean => RegistrationPages[currentPage].canGoForward ?? false;

    return (
        <Box sx={RegistrationContainerStyle(theme)}>
            <Spinner visible={loading} />
            <Card sx={RegContainerStyles(theme)}>
                <CardHeader
                    avatar={
                        RegistrationPages[currentPage].name === 'Site Options' && (
                            <ArrowBackIcon
                                color={'primary'}
                                sx={BackIconStyles()}
                                onClick={(): void => advancePage(-1)}
                            />
                        )
                    }
                    title={
                        <Typography variant={'h6'} sx={{ fontWeight: 600 }}>
                            {' '}
                            {RegistrationPages[currentPage].pageTitle || ''}{' '}
                        </Typography>
                    }
                    sx={DialogTitleStyles(theme)}
                />
                <CardContent sx={DialogContentStyles(theme)}>{RegistrationPages[currentPage].pageBody}</CardContent>
                {!RegistrationPages[currentPage].actionDisable && (
                    <>
                        <Divider />
                        <CardActions sx={DialogActionsStyles(theme)}>
                            <MobileStepper
                                variant={'dots'}
                                position={'static'}
                                steps={existingUser.toLowerCase() === 'true' ? 2 : currentPage <= 3 ? 3 : 2}
                                activeStep={
                                    existingUser.toLowerCase() === 'true'
                                        ? currentPage + (currentPage <= 2 ? 0 : -3)
                                        : currentPage + (currentPage <= 3 ? 0 : -4)
                                }
                                backButton={
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={(): void => advancePage(-1)}
                                        sx={DialogButtonStyles(false, currentPage !== 0)}
                                    >
                                        {' '}
                                        Back{' '}
                                    </Button>
                                }
                                nextButton={
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        data-testid="nextAction"
                                        disableElevation
                                        disabled={!canProgress()}
                                        onClick={(): void => advancePage(1)}
                                        sx={DialogButtonStyles(false)}
                                    >
                                        {' '}
                                        {RegistrationPages[currentPage].lastScreen ? 'Finish' : 'Next'}{' '}
                                    </Button>
                                }
                                sx={{ ...StepperStyles, '& .MuiMobileStepper-dot': StepperDotStyles(theme) }}
                            />
                        </CardActions>
                    </>
                )}
            </Card>
        </Box>
    );
};
