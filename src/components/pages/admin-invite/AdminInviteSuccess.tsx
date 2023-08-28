// @ts-nocheck
import React from 'react';
import { EmptyState } from '@brightlayer-ui/react-components';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';

import { useTheme } from '@mui/material/styles';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';

import { ContainerComponent } from '../../common/container/Container';
import { InviteMoreButtonStyles, SuccessActionStyles, DialogButtonStyles } from './AdminInviteStyle';

type AdminInviteSuccessProps = {
    email: string[];
    advancePage: (active: number) => void;
    setEmail: (email: string[]) => void;
};

export const AdminInviteSuccess: React.FC<React.PropsWithChildren<AdminInviteSuccessProps>> = (
    props: AdminInviteSuccessProps
) => {
    const theme = useTheme();
    const { advancePage, email, setEmail } = props;

    return (
        <>
            <ContainerComponent style={{ maxWidth: '400px', maxHeight: '487px' }}>
                <EmptyState
                    icon={<MarkEmailReadIcon fontSize={'inherit'} sx={{ color: '#727E84' }} />}
                    title={'Invitation Sent!'}
                    description={`An email invitation has been sent to ${
                        email.length > 1 ? `${email.length} users` : `${email.join(',')} user`
                    }, This link will be valid for 24 hours.`}
                    sx={{ minHeight: '75%' }}
                />

                <Divider />
                <CardActions sx={SuccessActionStyles(theme)}>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={(): void => {
                            setEmail([]);
                            advancePage(-2);
                        }}
                        sx={InviteMoreButtonStyles()}
                    >
                        {' '}
                        Invite More...
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        data-testid="nextAction"
                        disableElevation
                        sx={DialogButtonStyles()}
                    >
                        {' '}
                        Finish{' '}
                    </Button>
                </CardActions>
            </ContainerComponent>
        </>
    );
};
