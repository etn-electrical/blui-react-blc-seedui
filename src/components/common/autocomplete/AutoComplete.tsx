import React from 'react';
import MuiAutocomplete from '@mui/material/Autocomplete';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';
import MuiTextField from '@mui/material/TextField';

type Option = {
    id?: string | number;
    name?: string;
    label?: string
}
type AutoCompleteProps = {
    multiple?: boolean;
    id: string;
    options: Array<Option>;
    label: string;
    onValueSelect?: any;
    value?: any;
    optionDisabled?: any;
    disabled?: boolean;
    sx?: SxProps<Theme>;
    required?: boolean;
    readOnly?: boolean;
    disableClearable?: boolean;
    isOptionEqualToValue?: any;
}
export const AutoComplete: React.FC<React.PropsWithChildren<AutoCompleteProps>> = (props) => {

    const { disableClearable = false, readOnly = false, required = false, multiple = false, sx, id, options, label, onValueSelect, value, optionDisabled, disabled = false, isOptionEqualToValue } = props;
    return (
        <MuiAutocomplete
            disableClearable={disableClearable}
            readOnly={readOnly}
            disabled={disabled}
            multiple={multiple}
            id={id}
            data-testid={id}
            options={options}
            getOptionLabel={(option): string => option.name}
            value={value}
            onChange={(event, val) => {
                onValueSelect(val)
            }}
            sx={sx}
            getOptionDisabled={optionDisabled}
            isOptionEqualToValue={isOptionEqualToValue}
            renderInput={(params): JSX.Element => (
                <MuiTextField
                    {...params}
                    variant="filled"
                    label={label}
                    required={required}
                />
            )}
        />
    )
}