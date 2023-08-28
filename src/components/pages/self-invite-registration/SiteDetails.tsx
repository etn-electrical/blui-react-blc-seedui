import React, { useEffect, useMemo } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';

import { getAllCountries, getStatesOfCountry } from '../../../utils/common';
import { TextFieldStyles, StateInputField } from '../self-invite/SelfRegistrationStyle';
import { AccDividerStyles } from './SelfRegistrationStyle';
import { AutoComplete } from '../../common/autocomplete/AutoComplete';
import { RegSubDescriptionStyle } from '../../../styles/RegistrationStyle';
import { SiteOrgDetailsType } from '../../../types/selfinvite-types';

type SiteDetailsProps = {
    setOrgDetails: (details: SiteOrgDetailsType) => void;
    orgDetails: SiteOrgDetailsType;
};
export const SiteDetails: React.FC<React.PropsWithChildren<SiteDetailsProps>> = (props) => {
    const { setOrgDetails, orgDetails } = props;
    const theme = useTheme();

    const [address, setAddress] = React.useState(orgDetails.address || '');
    const [address2, setAddress2] = React.useState(orgDetails.address2 || '');
    const [city, setCity] = React.useState(orgDetails.city || '');
    const [state, setState] = React.useState<any>(orgDetails.state);
    const [postalCode, setCode] = React.useState(orgDetails.postalCode || '');
    const [country, setCountry] = React.useState(orgDetails.country);

    useEffect((): void => {
        setOrgDetails({ address, city, postalCode, country, state, address2 });
    }, [address, city, state, postalCode, country, address2]);

    const countryList = useMemo(() => {
        const countryOption = getAllCountries();
        return countryOption.map((item) => ({ name: item.name, id: item.isoCode }));
    }, []);

    const stateList = useMemo(() => {
        const stateOption = getStatesOfCountry(country.id);
        return stateOption.map((item) => ({ name: item.name, id: item.name }));
    }, [country]);

    return (
        <>
            <Typography sx={RegSubDescriptionStyle(theme)}>
                Enter your new Organization details below to continue with account registration.
            </Typography>
            <Divider sx={AccDividerStyles(theme)} />
            <>
                <TextField
                    id="address"
                    label="Address"
                    data-testid="address"
                    fullWidth
                    value={address}
                    onChange={(evt): void => {
                        setAddress(evt.target.value);
                    }}
                    variant="filled"
                    sx={TextFieldStyles(theme, 'first')}
                    inputProps={{ maxLength: 15 }}
                />
                <TextField
                    id="address2"
                    label="Address Line 2"
                    data-testid="address2"
                    fullWidth
                    value={address2}
                    onChange={(evt): void => {
                        setAddress2(evt.target.value);
                    }}
                    variant="filled"
                    sx={TextFieldStyles(theme)}
                    inputProps={{ maxLength: 15 }}
                />
                <TextField
                    id="city"
                    label="City"
                    data-testid="city"
                    fullWidth
                    value={city}
                    onChange={(evt): void => {
                        setCity(evt.target.value);
                    }}
                    variant="filled"
                    sx={TextFieldStyles(theme)}
                    inputProps={{ maxLength: 15 }}
                />

                <Box sx={{ display: 'flex' }}>
                    <AutoComplete
                        multiple={false}
                        id={`state`}
                        label={'State'}
                        data-testid="state"
                        options={stateList}
                        value={state?.id ? state : null}
                        onValueSelect={(value: { name: string; id: string }): void => {
                            setState(value);
                        }}
                        sx={StateInputField(theme)}
                        disableClearable={true}
                    />
                    <TextField
                        style={{ marginTop: 24, width: '48%' }}
                        id="postalCode"
                        data-testid="postalCode"
                        label="Postal Code"
                        fullWidth
                        value={postalCode}
                        onChange={(evt): void => {
                            setCode(evt.target.value);
                        }}
                        variant="filled"
                        sx={TextFieldStyles(theme)}
                        inputProps={{ maxLength: 10 }}
                    />
                </Box>
                <AutoComplete
                    multiple={false}
                    id={`country`}
                    data-testid="country"
                    label={'Country/Territory'}
                    options={countryList}
                    value={country}
                    onValueSelect={(value: { name: string; id: string }): void => {
                        setCountry(value);
                        setState({});
                    }}
                    sx={TextFieldStyles(theme)}
                    disableClearable={true}
                    isOptionEqualToValue={(option: any, value: any) => option.id === value.id}
                />
            </>
        </>
    );
};
