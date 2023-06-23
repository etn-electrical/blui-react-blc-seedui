import { SxProps, Theme } from '@mui/material/styles';
import backgroundImage from '../assets/background.svg';

export const RegContainerStyles = (theme: Theme): SxProps<Theme> => ({
    width: '100%',
    height: '100%',
    maxWidth: '450px',
    maxHeight: '621px',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
        maxWidth: 'none',
        maxHeight: 'none',
        borderRadius: 0,
    },
});

export const RegSubDescriptionStyle = (theme: Theme): SxProps<Theme> => ({
    fontSize: '16px',
    fontFamily: 'Open Sans',
    lineHeight: '24px'
});

export const DialogTitleStyles = (theme: Theme): SxProps<Theme> => ({
    p: `${theme.spacing(4)} ${theme.spacing(3)} 0 ${theme.spacing(3)}`,
    [theme.breakpoints.down('sm')]: {
        p: `${theme.spacing(2)} ${theme.spacing(2)} 0 ${theme.spacing(2)}`,
    },
    '& .MuiTypography-root': {
        fontFamily: 'Open Sans',
        fontSize: '20px',
    }
});

export const DialogContentStyles = (theme: Theme): SxProps<Theme> => ({
    flex: '1 1 0px',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    p: `${theme.spacing(4)} ${theme.spacing(3)} ${theme.spacing(2)} ${theme.spacing(3)}`,
    [theme.breakpoints.down('sm')]: {
        p: `${theme.spacing(2)} ${theme.spacing(2)} ${theme.spacing(3)} ${theme.spacing(2)}`,
    },
});

export const RegistrationContainerStyle = (theme: Theme): SxProps<Theme> => ({
    backgroundImage: `url(${backgroundImage})`,

    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:
        theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.primary.dark
})
