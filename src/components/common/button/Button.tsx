import React from 'react';
import MuiButton from '@mui/material/Button';

type ButtonProps = {
    label: string;
    disabled?: boolean;
    variant?: 'text' | 'outlined' | 'contained';
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
    buttonStyle?: object;
    onClick?: () => void;
    id?: string;
};

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = (props) => {
    const { id, variant, disabled, color, label, buttonStyle = {}, onClick } = props;
    return (
        <MuiButton
            data-testid={id}
            variant={variant}
            disabled={disabled}
            color={color}
            onClick={onClick}
            style={buttonStyle}
        >
            {label}
        </MuiButton>
    );
};
