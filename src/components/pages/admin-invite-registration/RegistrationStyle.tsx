import { SxProps, Theme } from '@mui/material/styles';

export const FullDividerStyles = (theme: Theme): SxProps<Theme> => ({
    m: `${theme.spacing(4)} -${theme.spacing(3)}`,
    [theme.breakpoints.down('sm')]: {
        m: `${theme.spacing(5)} -${theme.spacing(2)} ${theme.spacing(4)}`,
    },
});

export const TextFieldStyles = (theme: Theme, first?: boolean): SxProps<Theme> => ({
    mt: first ? 0 : 4,
    [theme.breakpoints.down('sm')]: {
        mt: 3,
    },
    '& .MuiFormLabel-root': {
        fontFamily: 'Open Sans',
    },
});

export const DialogActionsStyles = (theme: Theme): SxProps<Theme> => ({
    p: 3,
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
        p: 2,
    },
});

export const DialogButtonStyles = (fullWidth = false, visible = true): SxProps<Theme> => ({
    width: fullWidth ? '90%' : 90,
    visibility: visible ? 'visible' : 'hidden',
    textTransform: 'none',
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    '& .Mui-disabled': {
        backgroundColor: '#e0eef8',
        color: '#80bde0',
    },
});

export const StepperStyles = {
    background: 'transparent',
    width: '100%',
    p: 0,
};

export const StepperDotStyles = (theme: Theme) => ({
    m: `0px ${theme.spacing(0.5)}`,
});

export const EulaContent = () => ({
    flex: '1 1 0px',
    overflow: 'auto',
    fontSize: '16px',
    lineHeight: '24px',
    fontFamily: 'Open Sans',
});

export const EulaAction = () => ({
    flex: '0 0 auto',
    mr: 0,
    mt: 2,
    '& .MuiTypography-root': {
        fontSize: '15px',
        lineHeight: '18px',
        fontFamily: 'Open Sans',
    },
    '& .MuiSvgIcon-root': {
        width: '18px',
        height: '18px',
    },
});

export const DialogButtonStyle = (visible = true): SxProps<Theme> => ({
    width: '100%',
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
});

export const RegCompleteContainerStyles = (theme: Theme): SxProps<Theme> => ({
    height: '100%',
    [theme.breakpoints.down('sm')]: {
        minHeight: 'auto',
    },
    '& .MuiTypography-h6': {
        fontFamily: 'Open Sans',
        fontSize: '20px',
        fontWeight: '600',
        color: '#424E54',
    },
    '& .MuiTypography-subtitle2': {
        fontFamily: 'Open Sans',
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '24px',
        color: '#424E54',
    },
});

export const OrgTxtStyles = (theme: Theme, pos?: string): SxProps<Theme> => ({
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.25px',
    color: '#424E54',
    marginTop: pos === 'first' ? '51px' : ' 20px',
});

export const ReturnToLoginStyles = (): SxProps<Theme> => ({
    width: '402px',
    textTransform: 'none',
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
});
