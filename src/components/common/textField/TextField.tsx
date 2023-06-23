import React from 'react';
import MuiTextField from '@mui/material/TextField';
import { SxProps, Theme } from '@mui/material/styles';

type TextFieldProps = {
    id: string;
    label: string;
    value: string;
    name: string;
    type: string;
    required?: boolean;
    variant?: 'standard' | 'filled' | 'outlined';
    onChange: (e?: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    error?: boolean
    helperText?: string;
    sx?: SxProps<Theme>;
}

export const TextField: React.FC<React.PropsWithChildren<TextFieldProps>> = (props) => {
    const { sx, id, label, value, variant, name, type, required = false, onChange, error, helperText } = props;
    return (
        <MuiTextField
            required={required}
            id={id}
            label={label}
            data-testid={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            variant={variant}
            error={error}
            helperText={helperText}
            sx={sx}
        />
    )
}