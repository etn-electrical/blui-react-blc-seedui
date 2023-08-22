import React, { memo } from 'react';
import { LocationActionStyle, ToggleContainerStyles } from './AdminInviteStyle';

import { ToggleButton, ToggleButtonGroup, Typography, Tooltip } from '@mui/material';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export const RoleOptions = ['', 'Viewer', 'Editor', 'Admin']
export const ToggleOptions = [{ value: '', label: 'None' }, { value: 'Viewer', label: 'Viewer' }, { value: 'Editor', label: 'Editor' }, { value: 'Admin', label: 'Admin' }]

export const ToggleActionComponent = memo((props: any) => {
    const { data, roleSelection, parentOpt, searchDataList, searchString } = props;

    const isRoleRestrict = data.entityType !== 'organization';
    const parentSelection = searchString.length < 1 ? parentOpt : searchDataList.find((sites: any) => sites.id === data.parentId)

    const toggleButton = (option: { value: string, label: string }, index: number) => {
        return <ToggleButton disabled={isRoleRestrict && RoleOptions.indexOf(parentSelection.roleAccess) > index} value={option.value} sx={LocationActionStyle(data.roleAccess === option.value)}>{isRoleRestrict && RoleOptions.indexOf(parentSelection.roleAccess) > index ? <Tooltip title={`Already a viewer in a parent group.`} placement="left" arrow><LockOutlinedIcon sx={{ width: '16px', height: '16px' }} /></Tooltip> : option.label}</ToggleButton>
    }

    return (!data.canInviteUser ?
        <Typography sx={ToggleContainerStyles()}>
            <Tooltip title={`You must be an admin of ${data.name} to invite others.`} placement="top" arrow>
                <HorizontalRuleIcon />
            </Tooltip>
        </Typography> :
        <ToggleButtonGroup
            color="primary"
            value={data.roleAccess || ''}
            exclusive
            onChange={(event, value) => roleSelection(value, data)}
            sx={{ height: 24, marginLeft: 'auto' }}
        >
            {ToggleOptions.map((option, index) => toggleButton(option, index))}
        </ToggleButtonGroup>
    )
}, (prevProps, nextProps) => {
    return prevProps.data.roleAccess === nextProps.data.roleAccess;
});

