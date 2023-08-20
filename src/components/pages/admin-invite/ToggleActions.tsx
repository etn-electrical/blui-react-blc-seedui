import React, { memo } from 'react';
import { LocationActionStyle } from './AdminInviteStyle';

import { ToggleButton, ToggleButtonGroup, Typography, Tooltip } from '@mui/material';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export const RoleOptions = ['', 'Viewer', 'Editor', 'Admin']
export const ToggleActionComponent = memo((props: any) => {
    const { data, index, roleSelection, parentOpt, searchDataList, searchString } = props;

    const isRoleRestrict = data.entityType !== 'organization';
    const parentSelection = searchString.length < 1 ? parentOpt : searchDataList.find((sites: any) => sites.id === data.parentId)
    return (!data.canInviteUser ?
        <Typography sx={{
            display: 'flex', marginLeft: 'auto', width: '53%', justifyContent: 'center',
        }}>  <Tooltip title={`You must be an admin of ${data.name} to invite others.`} placement="top" arrow>
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
            <ToggleButton disabled={isRoleRestrict && RoleOptions.indexOf(parentSelection.roleAccess) > 0} value="" sx={LocationActionStyle()}>{isRoleRestrict && RoleOptions.indexOf(parentSelection.roleAccess) > 0 ? <Tooltip title={`Already a viewer in a parent group.`} placement="left" arrow><LockOutlinedIcon sx={{ width: '16px', height: '16px' }} /></Tooltip> : 'None'}</ToggleButton>
            <ToggleButton disabled={isRoleRestrict && RoleOptions.indexOf(parentSelection.roleAccess) > 1} value="Viewer" sx={LocationActionStyle()}>{isRoleRestrict && RoleOptions.indexOf(parentSelection.roleAccess) > 1 ? <Tooltip title={`Already a viewer in a parent group.`} placement="left" arrow><LockOutlinedIcon sx={{ width: '16px', height: '16px' }} /></Tooltip> : 'Viewer'}</ToggleButton>
            <ToggleButton disabled={isRoleRestrict && RoleOptions.indexOf(parentSelection.roleAccess) > 2} value="Editor" sx={LocationActionStyle()}>{isRoleRestrict && RoleOptions.indexOf(parentSelection.roleAccess) > 2 ? <Tooltip title={`Already a viewer in a parent group.`} placement="left" arrow><LockOutlinedIcon sx={{ width: '16px', height: '16px' }} /></Tooltip> : 'Editor'}</ToggleButton>
            <ToggleButton disabled={isRoleRestrict && RoleOptions.indexOf(parentSelection.roleAccess) > 3} value="Admin" sx={LocationActionStyle()}>Admin</ToggleButton>
        </ToggleButtonGroup>
    )
}, (prevProps, nextProps) => {
    return prevProps.data.roleAccess === nextProps.data.roleAccess;
});

