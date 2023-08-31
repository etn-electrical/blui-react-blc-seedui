import React, { memo } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

import { LocationActionStyle, ToggleContainerStyles } from './AdminInviteStyle';
import { AccessRoleTypes } from '../../../types/admininvite-types';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export const RoleOptions = ['', 'Viewer', 'Editor', 'Admin'];
export const ToggleOptions = [
    { value: '', label: 'None' },
    { value: 'Viewer', label: 'Viewer' },
    { value: 'Editor', label: 'Editor' },
    { value: 'Admin', label: 'Admin' },
];

type ToggleActionPropsType = {
    data: AccessRoleTypes;
    roleSelection: (value: string, data: AccessRoleTypes) => void;
    parentOpt?: AccessRoleTypes;
    searchDataList: AccessRoleTypes[];
    searchString: string;
};

export const ToggleActionComponent = memo(
    (props: ToggleActionPropsType) => {
        const { data, roleSelection, parentOpt, searchDataList, searchString } = props;

        const isRoleRestrict = data.entityType !== 'organization';
        const parentSelection =
            searchString.length < 1
                ? parentOpt
                : searchDataList.find((sites: AccessRoleTypes) => sites.id === data.parentId);

        const toggleButton = (option: { value: string; label: string }, index: number) => {
            return (
                <ToggleButton
                    data-testid={`${data.name}_${option.value}`}
                    key={index}
                    disabled={isRoleRestrict && RoleOptions.indexOf(parentSelection.roleAccess) > index}
                    value={option.value}
                    sx={LocationActionStyle(data.roleAccess === option.value)}
                >
                    {isRoleRestrict && RoleOptions.indexOf(parentSelection.roleAccess) > index ? (
                        <Tooltip title={`Already a viewer in a parent group.`} placement="left" arrow>
                            <LockOutlinedIcon sx={{ width: '16px', height: '16px' }} />
                        </Tooltip>
                    ) : (
                        option.label
                    )}
                </ToggleButton>
            );
        };

        return !data.canInviteUser ? (
            <Typography sx={ToggleContainerStyles()}>
                <Tooltip title={`You must be an admin of ${data.name} to invite others.`} placement="top" arrow>
                    <HorizontalRuleIcon />
                </Tooltip>
            </Typography>
        ) : (
            <ToggleButtonGroup
                color="primary"
                value={data.roleAccess || ''}
                exclusive
                onChange={(event, value) => roleSelection(value, data)}
                sx={{ height: 24, marginLeft: 'auto' }}
            >
                {ToggleOptions.map((option, index) => toggleButton(option, index))}
            </ToggleButtonGroup>
        );
    },
    (prevProps, nextProps) => {
        if (prevProps.data.roleAccess !== nextProps.data.roleAccess) {
            return false;
        } else if (nextProps.parentOpt && prevProps.parentOpt.roleAccess !== nextProps.parentOpt.roleAccess) {
            return false;
        } else if (nextProps.searchString && prevProps.data.name !== nextProps.data.name) {
            return false;
        }
        return true;
    }
);
