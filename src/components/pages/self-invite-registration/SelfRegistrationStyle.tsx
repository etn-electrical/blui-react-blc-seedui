import { SxProps, Theme } from '@mui/material/styles';


export const RegCompleteContainerStyles = (theme: Theme): SxProps<Theme> => ({
    height: '100%',
    [theme.breakpoints.down('sm')]: {
        minHeight: 'auto',
    }
});

export const IconHolderStyles = (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    justifyContent: 'center',
    mb: '31px'
});


export const IconContainerStyles = (theme: Theme, first = false): SxProps<Theme> => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '96px',
    height: '96px',
    background: '#E0EEF8',
    borderRadius: '48px',
    mr: first ? '24px' : '0px'
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


export const DialogButtonStyles = (visible = true, visibleFull = false): SxProps<Theme> => ({
    width: visibleFull ? '100%' : '90%',
    visibility: visible ? 'visible' : 'hidden',
    margin: '20px 0px',
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    display: 'flex',
    textTransform: 'none',
    flex: 'none',
    order: 0,
    flexGrow: 0,
    '& .Mui-disabled': {
        backgroundColor: '#e0eef8',
        color: '#80bde0'
    },
    height: '36px'
});

export const DialogExtButtonStyles = (): SxProps<Theme> => ({
    width: '100%',
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    display: 'flex',
    textTransform: 'capitalize',
    color: '#424e544d',
    flex: 'none',
    order: 0,
    flexGrow: 0,
    borderColor: '#424e544d',
    height: '36px'
});


export const BackIconStyles = (): SxProps<Theme> => ({
    fontSize: '25px',
    color: '#727E84',
    cursor: 'pointer'
});

export const FullDividerStyles = (theme: Theme): SxProps<Theme> => ({
    m: `32px -15px 32px`,
    [theme.breakpoints.down('sm')]: {
        m: `${theme.spacing(5)} -${theme.spacing(2)} ${theme.spacing(4)}`,
    },
});

export const ExpiredBtn = (): SxProps<Theme> => ({
    width: '100%',
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    display: 'flex',
    textTransform: 'none',
    flex: 'none',
    order: 0,
    flexGrow: 0,
    height: '36px',
   mb: 0
});

export const OrgTxtTitleStyles = (theme: Theme, pos?: string): SxProps<Theme> => ({
    fontFamily: 'Open Sans',
    fontWeight: '600',
    fontSize: '20px',
    lineHeight: '27px',
    letterSpacing: '0.15px',
    color: '#2B353A',
    marginTop: '34px'
});

export const AccDividerStyles = (theme: Theme): SxProps<Theme> => ({
    m: `32px -22px 15px -22px`,
});