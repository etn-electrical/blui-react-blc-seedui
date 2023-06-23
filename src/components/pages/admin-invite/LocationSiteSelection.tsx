import React from 'react';
import MuiAutocomplete from '@mui/material/Autocomplete';
import { useTheme } from '@mui/material/styles';
import MuiTextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { createFilterOptions } from "@mui/material/Autocomplete";
import { LocationSiteSelectionProps, AdminRoleSiteOptions } from '../../../types/admininvite-types';
import { GroupHeader, GroupItems } from './AdminInviteStyle';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const LocationSiteSelection: React.FC<React.PropsWithChildren<LocationSiteSelectionProps>> = (props) => {

    const { allSelected = false, isOptionEqualToValue, required = false, multiple = false, id, options, label, onValueSelect, value, optionDisabled, disabled = false } = props;
    const theme = useTheme();
    const filter = createFilterOptions();
    return (
        <MuiAutocomplete
            isOptionEqualToValue={isOptionEqualToValue}
            disabled={disabled}
            disableCloseOnSelect
            multiple={multiple}
            disableClearable={true}
            id={id}
            data-testid={id}
            options={options}
            getOptionLabel={(option: any): string => option.name}
            value={value}
            groupBy={(option) => option.parentName}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);
                return [{ id: "select-all", name: "Select All" }, ...filtered];
            }}
            renderOption={(props, option, { selected }) => (
                <li {...props} style={{
                    height: '24px',
                    padding: '22px'
                }}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={option.id === "select-all" ? value.length && options.length === value.length : selected}
                    />
                    {option.name}
                </li>
            )}
            onChange={(event, val, reason) => {
                onValueSelect(val, reason)
            }}
            getOptionDisabled={optionDisabled}
            renderInput={(params): JSX.Element => (
                <MuiTextField
                    {...params}
                    variant="filled"
                    label={label}
                />
            )}
            renderGroup={(params) => (
                <li key={params.key}>
                    <Box sx={GroupHeader(theme)}>{params.group}</Box>
                    <ul style={GroupItems()}>{params.children}</ul>
                </li>
            )}
        />
    )
}