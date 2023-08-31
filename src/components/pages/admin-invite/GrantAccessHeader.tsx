import React, { useState } from 'react';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Cancel from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { RoleAccessType } from '../../../types/admininvite-types';
import { SearchInputStyle, SearchCancelIconStyle, SearchIconStyle } from './AdminInviteStyle';

export const CopyMenu = ['My Access', "Someone Else's Access"];

type GrantAccessHeaderProps = {
    copyUserAccess: (myAccess?: boolean) => void;
    searchString: string;
    setCopyAccessModal: (open: boolean) => void;
    setCopyAccessType: (accessType: string) => void;
    setSearchString: (searchstring: string) => void;
    visibleData: RoleAccessType;
};

export const GrantAccessHeader: React.FC<React.PropsWithChildren<GrantAccessHeaderProps>> = (
    props: GrantAccessHeaderProps
) => {
    const { copyUserAccess, setCopyAccessModal, setCopyAccessType, searchString, setSearchString, visibleData } = props;
    const { orgnizationData = [] } = visibleData;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [isSearch, setIsSearch] = useState(false);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

    const onMenuSelect = (option: string) => {
        option === 'My Access' ? copyUserAccess(true) : setCopyAccessModal(true);
        setAnchorEl(null);
        setCopyAccessType(option);
    };

    return (
        <>
            <Box sx={{ marginBottom: '10px', display: 'flex' }}>
                {!isSearch && (
                    <>
                        <Button
                            disabled={!orgnizationData.length}
                            variant="outlined"
                            onClick={handleClick}
                            endIcon={<ArrowDropDownIcon />}
                        >
                            Copy From...
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{ 'aria-labelledby': 'basic-button' }}
                        >
                            {CopyMenu.map((option, index) => (
                                <MenuItem onClick={() => onMenuSelect(option)} key={index}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Menu>
                    </>
                )}
                {isSearch ? (
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
                                    <Cancel
                                        fontSize="small"
                                        sx={SearchCancelIconStyle()}
                                        onClick={() => {
                                            setIsSearch(false);
                                            setSearchString('');
                                        }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                    />
                ) : (
                    <SearchIcon sx={SearchIconStyle()} onClick={() => setIsSearch(true)} />
                )}
            </Box>
        </>
    );
};
