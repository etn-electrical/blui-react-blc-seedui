import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

import { useTheme } from '@mui/material/styles';

import { CreateAccount } from './CreateAccount';
import { VerificationSent } from './VerificationSent';
import {
    RegContainerStyles,
    DialogTitleStyles,
    DialogContentStyles,
    RegistrationContainerStyle,
} from '../../../styles/RegistrationStyle';
import { DialogActionsStyles, DialogButtonStyles } from './SelfRegistrationStyle';
import { postSelfInvite } from '../../../api/self-user-register';
import { Spinner } from '../../common/spinner/Spinner';
import { useInjectedUIContext } from '../../../context/AuthContextProvider';
import { RegistrationPage, PostSelfInviteType } from '../../../types/selfinvite-types';
import { ConfirmModal } from '../../common/modal/ConfirmModal';
import { appConfig } from '../../../app-config';

export const SelfInvite: React.FC = () => {
    const { authUIConfig } = useInjectedUIContext();
    const { adopterId, adopterApplicationName } = authUIConfig;

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [modalData, setModalData] = useState<{ isOpen: boolean; email: string }>({ isOpen: false, email: '' });
    const url = new URL(window.location.href);
    const theme = useTheme();

    const RegistrationPages: RegistrationPage[] = [
        {
            name: 'CreateAccount',
            pageTitle: 'Create An Account',
            pageBody: (
                <CreateAccount
                    initialEmail={email}
                    onEmailChanged={setEmail}
                    onSubmit={email.length > 0 ? (): void => advancePage(1) : undefined}
                />
            ),
            canGoForward: email.length > 0,
            canGoBack: true,
        },
        {
            name: 'VerifyEmail',
            pageTitle: 'Confirm your Email Address',
            pageBody: <VerificationSent />,
            canGoForward: email.length > 0,
            canGoBack: true,
        },
    ];

    const inviteUser = async () => {
        const request = {
            adopterId,
            emailId: email,
            adopterApplicationName,
            adopterApplicationRegistrationUrl: `${url.host}${appConfig.selfRegistrationUrl}`,
        };
        setLoading(true);
        const response: PostSelfInviteType = await postSelfInvite(request);
        response?.errorCode === 409 ? setModalData({ isOpen: true, email: email }) : setCurrentPage(currentPage + 1);
        setLoading(false);
    };

    const advancePage = (delta = 0): void => {
        if ((currentPage !== 0 && delta === -1) || (currentPage !== RegistrationPages.length - 1 && delta === 1)) {
            if (delta !== -1 && currentPage === RegistrationPages.length - 2) {
                inviteUser();
            } else {
                setCurrentPage(currentPage + delta);
            }
        }
    };

    const canProgress = (): boolean => RegistrationPages[currentPage]?.canGoForward ?? false;
    const isLastStep = currentPage === RegistrationPages.length - 1;

    return (
        <Box sx={RegistrationContainerStyle(theme)}>
            <ConfirmModal
                onClose={() => setModalData({ isOpen: false, email: '' })}
                open={modalData.isOpen}
                title={'Account already exists'}
                content={`This email address already has an account with ${adopterApplicationName}. Please contact your admin or reach out to Brightlayerappsupport@eaton.com`}
                actions={
                    <>
                        <Button onClick={() => setModalData({ isOpen: false, email: '' })}>Cancel</Button>
                        <Button onClick={() => (window.location.href = '/login')}>Log In</Button>
                    </>
                }
            />
            <Spinner visible={loading} />
            <Card sx={RegContainerStyles(theme)}>
                <CardHeader
                    title={
                        <Typography variant={'h6'} sx={{ fontWeight: 600 }}>
                            {' '}
                            {RegistrationPages[currentPage]?.pageTitle || ''}{' '}
                        </Typography>
                    }
                    sx={DialogTitleStyles(theme)}
                />
                <CardContent sx={DialogContentStyles(theme)}>{RegistrationPages[currentPage]?.pageBody}</CardContent>
                {currentPage !== 1 && <Divider />}
                <CardActions sx={DialogActionsStyles(theme)}>
                    {!isLastStep && (
                        <Button
                            variant="contained"
                            color="primary"
                            data-testid="nextAction"
                            disableElevation
                            disabled={!canProgress()}
                            onClick={(): void => advancePage(1)}
                            sx={DialogButtonStyles()}
                        >
                            {' '}
                            Next{' '}
                        </Button>
                    )}
                </CardActions>
            </Card>
        </Box>
    );
};
