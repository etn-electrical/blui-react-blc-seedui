import { SxProps, Theme } from '@mui/material/styles';

export const LinkStyles = (theme: Theme): SxProps<Theme> => ({
    fontFamily: 'Open Sans',
    fontSize: '14px',
    fontWeight: 600,
    marginTop: '10px',
    textTransform: 'none',
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:visited': {
        color: 'inherit',
    },
});

export const LinksWrapperStyles = (theme: Theme): SxProps<Theme> => ({
    textAlign: 'center',
    fontFamily: 'Open Sans',
});

export const LoginContainerStyles = (theme: Theme): SxProps<Theme> => ({
    p: `${theme.spacing(4)} ${theme.spacing(8)} ${theme.spacing(1)} ${theme.spacing(8)}`,
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
        p: `${theme.spacing(4)} ${theme.spacing(4)}`,
    },
});

export const EmailFieldStyles = (theme: Theme): SxProps<Theme> => ({
    mb: `36px`,
});

export const ActionStyles = (theme: Theme): SxProps<Theme> => ({
    mb: 5,
    flexWrap: 'nowrap',
    [theme.breakpoints.down('sm')]: {
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'center',
    },
});

export const SupportStyles = (): SxProps<Theme> => ({
    fontFamily: 'Open Sans',
    color: '#727E84',
    margin: '10px 0px',
});
