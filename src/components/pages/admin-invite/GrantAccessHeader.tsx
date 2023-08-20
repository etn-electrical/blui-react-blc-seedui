import React, { useState } from 'react';
import { InputAdornment, Button, Box, TextField } from '@mui/material';
import Cancel from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { SearchInputStyle, SearchCancelIconStyle, SearchIconStyle } from './AdminInviteStyle';

export const GrantAccessHeader: React.FC<React.PropsWithChildren<any>> = (props: any) => {
    const { copyUserAccess, setCopyAccessModal, setCopyAccessType, searchString, setSearchString } = props;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [isSearch, setIsSearch] = useState(false);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

    return <>
        <Box sx={{ marginBottom: '10px', display: 'flex' }}>

            {!isSearch && <>
                <Button variant="outlined" onClick={handleClick} endIcon={<ArrowDropDownIcon />} >
                    Copy From...
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => {
                        copyUserAccess(true);
                        setAnchorEl(null);
                        setCopyAccessType('My Access')
                    }}>My Access</MenuItem>
                    <MenuItem onClick={() => {
                        setCopyAccessModal(true);
                        setAnchorEl(null);
                        setCopyAccessType("Someone Else's Access")
                    }}>Someone Else's Access</MenuItem>
                </Menu>
            </>
            }
            {isSearch ?

                <TextField
                    inputProps={{ 'data-testid': 'search', maxLength: 100 }}
                    sx={SearchInputStyle()}
                    value={searchString}
                    size="small"
                    placeholder={'Search'}
                    onChange={(e): void => setSearchString(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon data-testid="search-icon" fontSize="small" />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <Cancel fontSize="small" sx={SearchCancelIconStyle()} onClick={() => { setIsSearch(false); setSearchString('') }} />
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                />
                :

                <SearchIcon sx={SearchIconStyle()} onClick={() => setIsSearch(true)} />
            }
        </Box>
    </>
}