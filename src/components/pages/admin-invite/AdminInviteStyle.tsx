import { SxProps, Theme } from '@mui/material/styles';


export const AdminInviteStyles = (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    justifyContent: 'end',
    padding: '25px 22px',
    textTransform: 'none',
    '& .MuiButtonBase-root': { textTransform: 'none' }
});

export const FullDividerStyles = (theme: Theme): SxProps<Theme> => ({
    m: `${theme.spacing(4)} -${theme.spacing(3)} ${theme.spacing(4)}`,
    [theme.breakpoints.down('sm')]: {
        m: `${theme.spacing(4)} -${theme.spacing(2)} ${theme.spacing(4)}`,
    },
});


export const RoleLocationContainer = (theme: Theme): SxProps<Theme> => ({
    '& .MuiAutocomplete-root': {},
    '& .MuiTextField-root': { width: '100%' },
    marginTop: '32px'
});

export const RoleLocationAction = (hidden = false, left = false) => ({
    boxShadow: 'none',
    fontWeight: '600',
    visibility: hidden ? 'hidden' : 'visible',
    '&:hover': { boxShadow: 'none', backgroundColor: '#007bc10d', color: '#007bc1' },
    textTransform: 'none',
    color: '#A1A7AA',
    backgroundColor: '#ffff',
    fontSize: '14px',
    fontFamily: 'Open Sans',
    float: left ? 'left' : 'right',
    padding: '6px 0px'
});

export const GroupHeader = (theme: Theme): SxProps<Theme> => ({
    top: '-8px',
    padding: '13px 33px 10px 33px',
    fontFamily: 'Open Sans',
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '22px',
    letterSpacing: '0px',
    textAlign: 'left',
    borderTop: '1px solid #f3f0f0'
});

export const GroupItems = () => ({
    fontFamily: 'Open Sans',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '22px',
    letterSpacing: '0px',
    padding: 0,
});

export const DialogButtonStyles = (visible = true): SxProps<Theme> => ({
    width: '90%',
    visibility: visible ? 'visible' : 'hidden',
    margin: '20px 0px',
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    display: 'flex',
    textTransform: 'capitalize',
    flex: 'none',
    order: 0,
    flexGrow: 0,
    '& .Mui-disabled': {
        backgroundColor: '#e0eef8',
        color: '#80bde0'
    }
});

export const RegCompleteContainerStyles = (theme: Theme): SxProps<Theme> => ({
    height: '100%',
    minHeight: 500,
    [theme.breakpoints.down('sm')]: {
        minHeight: 'auto',
    }
});

export const OrgTxtStyles = (theme: Theme, pos?: string): SxProps<Theme> => ({
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.25px',
    color: '#424E54',
    marginTop: pos === 'first' ? '51px' : ' 20px'
});

export const AlertStyles = (theme: Theme): SxProps<Theme> => ({
    position: 'absolute',
    marginLeft: '40%',
    '& .MuiPaper-root': {
        backgroundColor: '#ffff',
        padding: '0px',
        color: '#158d09',
        alignItems: 'center'
    },
    '& .MuiSvgIcon-root': { color: '#158d09', width: '20px' },
    '& .MuiAlert-action': { display: 'none' },
    '& .MuiAlert-icon': { marginRight: '10px' }
});

export const TextFieldStyles = (theme: Theme, first?: boolean): SxProps<Theme> => ({
    mt: first ? 0 : 4,
    [theme.breakpoints.down('sm')]: {
        mt: 3,
    },
    '& .MuiFormLabel-root': {
        fontFamily: 'Open Sans'
    }
});

export const SubTitleStyles = (first: boolean = false): SxProps<Theme> => ({
    fontFamily: 'Open Sans',
    fontSize: '16px',
    fontWeight: '400',
    marginBottom: first && '4px'
});

export const ToolTipStyles = () => ({
    margin: '0px'
});
export const ToolTipIconStyles = () => ({
    mb: '-6px',
    color: '#727E84',
    marginLeft: '7px'
});