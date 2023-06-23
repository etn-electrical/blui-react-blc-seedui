import React, { HTMLAttributes } from 'react';
import { defaultPasswordRequirements } from '../../../constants/registration-constants';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Check from '@mui/icons-material/Check';
import { SxProps, Theme } from '@mui/material/styles';

export const PasswordStyle = (): SxProps<Theme> => ({
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '16px',
    fontFamily: 'Open Sans',
    letterSpacing: '0'
});

export type PasswordRequirementsProps = HTMLAttributes<HTMLDivElement> & {
    passwordText: string;
    sx?: SxProps<Theme>;
};

export const PasswordRequirements: React.FC<
    React.PropsWithChildren<React.PropsWithChildren<PasswordRequirementsProps>>
> = (props) => {
    const { passwordText, ...otherProps } = props;
    const passwordRequirements = defaultPasswordRequirements();

    return (
        <Box {...otherProps}>
            {passwordRequirements.map((req, ind) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }} key={`password_requirement_${ind}`}>
                    <Check color={new RegExp(req.regex).test(passwordText) ? 'primary' : 'disabled'} sx={{ mr: '10px' }} />
                    <Typography
                        variant={'subtitle2'}
                        sx={PasswordStyle()}
                    >
                        {req.description}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
};
