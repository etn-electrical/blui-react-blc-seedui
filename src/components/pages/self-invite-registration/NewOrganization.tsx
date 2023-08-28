import React from 'react';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { useTheme } from '@mui/material/styles';
import { NewOrgDivider, TextFieldStyles } from '../self-invite/SelfRegistrationStyle';
import { RegSubDescriptionStyle } from '../../../styles/RegistrationStyle';

type NewOrganizationProps = {
    setOrgName: (email: string) => void;
    orgName: string;
};

export const NewOrganization: React.FC<React.PropsWithChildren<NewOrganizationProps>> = (props) => {
    const theme = useTheme();
    const { orgName, setOrgName } = props;
    return (
        <>
            <Typography sx={RegSubDescriptionStyle(theme)}>
                Enter your organization name to continue with account creation. Fields marked with an (*) are required.
            </Typography>
            <Divider sx={NewOrgDivider(theme)} />
            <>
                <TextField
                    required
                    id="orgName"
                    label="Organization Name"
                    data-testid="orgName"
                    fullWidth
                    value={orgName}
                    onChange={(evt): void => {
                        setOrgName(evt.target.value);
                    }}
                    variant="filled"
                    sx={TextFieldStyles(theme)}
                    inputProps={{ maxLength: 50 }}
                />
            </>
        </>
    );
};
