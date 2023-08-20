// @ts-nocheck
import React from 'react';
import { EmptyState } from '@brightlayer-ui/react-components';
import { Button, CardActions, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { MarkEmailRead as MarkEmailReadIcon } from '@mui/icons-material';

import { ContainerComponent } from '../../common/container/Container';
import { InviteMoreButtonStyles, SuccessActionStyles, DialogButtonStyles } from './AdminInviteStyle';

export const AdminInviteSuccess: React.FC<React.PropsWithChildren<any>> = (props: any) => {

    const theme = useTheme();
    const { advancePage, email, setEmail } = props;

    return (
        <>
            <ContainerComponent style={{ maxWidth: '400px', maxHeight: '487px' }}>
                <EmptyState
                    icon={<MarkEmailReadIcon fontSize={'inherit'} sx={{ color: '#727E84' }} />}
                    title={'Invitation Sent!'}
                    description={
                        email.length > 1 ?
                            `An email invitation has been sent to ${email.length} users, This link will be valid for 24 hours.` :
                            `An email invitation has been sent to ${email.join(',')} user, This link will be valid for 24 hours.`
                    }
                    sx={{ minHeight: '75%' }}
                />

                <Divider />
                <CardActions sx={SuccessActionStyles(theme)}>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={(): void => {setEmail([]); advancePage(-2)}}
                        sx={InviteMoreButtonStyles()}
                    > Invite More...</Button>

                    <Button
                        variant="contained"
                        color="primary"
                        data-testid="nextAction"
                        disableElevation
                        sx={DialogButtonStyles()}
                    > Finish </Button>

                </CardActions>

            </ContainerComponent>
        </>
    )
}