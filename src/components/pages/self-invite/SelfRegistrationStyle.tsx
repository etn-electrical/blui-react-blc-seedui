import { SxProps, Theme } from '@mui/material/styles';

export const FullDividerStyles = (theme: Theme): SxProps<Theme> => ({
    m: `${theme.spacing(5)} -${theme.spacing(3)} ${theme.spacing(4)}`,
    [theme.breakpoints.down('sm')]: {
        m: `${theme.spacing(5)} -${theme.spacing(2)} ${theme.spacing(4)}`,
    },
});


export const DialogActionsStyles = (theme: Theme): SxProps<Theme> => ({
    p: 3,
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
        p: 2,
    },
    '& .Mui-disabled' : {
        backgroundColor: '#e0eef8 !important',
        color: '#80bde0'
    }
});


export const DialogButtonStyles = (fullWidth = false, visible = true): SxProps<Theme> => ({
    width: fullWidth ? '90%' : 90,
    visibility: visible ? 'visible' : 'hidden',
    textTransform: 'none',
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
});

export const StepperStyles = {
    background: 'transparent',
    width: '100%',
    p: 0,
};

export const StepperDotStyles = (theme: Theme) => ({
    m: `0px ${theme.spacing(0.5)}`,
});

export const TextFieldStyles = (theme: Theme, pos?: string): SxProps<Theme> => ({
    mt: pos === 'first' ? 0 : 2,
    [theme.breakpoints.down('sm')]: {
        mt: 3,
    },
    '& .MuiFormLabel-root': {
        fontFamily: 'Open Sans'
    }
});

export const VerifyTextStyles = (theme: Theme): SxProps<Theme> => ({
    fontFamily: 'Open Sans',
    letterSpacing: '0.25px',
    marginBottom: '32px'
});
export const ListDividerStyles = (theme: Theme): SxProps<Theme> => ({
    m: `4px -13px`,
    [theme.breakpoints.down('sm')]: {
        m: `4px -13px`,
    },
});

export const NewOrgDivider = (theme: Theme): SxProps<Theme> => ({
    m: `${theme.spacing(4)} -${theme.spacing(3)} ${theme.spacing(4)}`,
    [theme.breakpoints.down('sm')]: {
        m: `${theme.spacing(4)} -${theme.spacing(2)} ${theme.spacing(4)}`,
    },
});


export const StateInputField = (theme: Theme): SxProps<Theme> => ({
    width: '48%',
     margin: "24px 10px 0px 0px",
     '& .MuiFormLabel-root': {
        fontFamily: 'Open Sans'
    }
});

export const ReturnButtonStyles = (): SxProps<Theme> => ({
    width: '95%',
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