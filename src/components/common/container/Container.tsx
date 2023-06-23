import React from 'react';

import Box from '@mui/material/Box';
import { Spinner } from '../spinner/Spinner';

export type CardContainerProps = {
    loading?: boolean;
};

export const ContainerComponent: React.FC<React.PropsWithChildren<CardContainerProps>> = (props) => (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                maxWidth: '450px',
                maxHeight: '630px',
                backgroundColor: '#ffff',
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                borderRadius: '4px'
            }}
        >
             <Spinner visible={props.loading} />
            {props.children}
        </Box>
    )