import { SxProps, Theme } from '@mui/material/styles';


export const AdminInviteStyles = (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '25px 22px',
    textTransform: 'none',
    '& .MuiButtonBase-root': { textTransform: 'none' }
});

export const FullDividerStyles = (theme: Theme): SxProps<Theme> => ({
    m: `${theme.spacing(4)} -${theme.spacing(3)} ${theme.spacing(2)}`,
    [theme.breakpoints.down('sm')]: {
        m: `${theme.spacing(4)} -${theme.spacing(2)} ${theme.spacing(2)}`,
    },
});


export const RoleLocationContainer = (theme: Theme): SxProps<Theme> => ({
    '& .MuiAutocomplete-root': {},
    '& .MuiTextField-root': { width: '100%' },
    marginTop: '32px'
});

export const EmailInputField = (count: number) => ({
    '& .MuiInputBase-input': {marginTop: count >= 1 ? '10px' : '0px'},
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

export const DialogButtonStyles = (): SxProps<Theme> => ({
    width: 90,
    textTransform: 'none',
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
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
    marginBottom: first && '4px',
    wordWrap: 'break-word'
});

export const ToolTipStyles = () => ({
    margin: '0px'
});
export const ToolTipIconStyles = () => ({
    mb: '-6px',
    color: '#727E84',
    marginLeft: '7px'
});


export const LocationTextStyle = () => ({
    fontFamily: 'Open Sans',
    color: '#424E54',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '21px'
})

export const LocationActionStyle = (selected = false) => ({
    fontFamily: 'Open Sans',
    color: '#727E84',
    fontWeight: 400,
    fontSize: 12,
    height: '24px',
    width: '60px',
    pointerEvents: selected && 'none'
})

export const SelectionContentStyles = (theme: Theme): SxProps<Theme> => ({
    background: '#F7F8F8',
    flex: '1 1 0px',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    p: `${theme.spacing(4)} ${theme.spacing(2)} ${theme.spacing(2)} ${theme.spacing(2)}`,
    [theme.breakpoints.down('sm')]: {
        p: `${theme.spacing(2)} ${theme.spacing(2)} ${theme.spacing(3)} ${theme.spacing(2)}`,
    },
    
});

export const SearchIconStyle = () => ({
    color: '#727E84', 
    float: 'right', 
    marginLeft: 'auto',
    cursor: 'pointer'
}) 

export const SearchCancelIconStyle = () => ({
    color: '#727E84', 
    cursor: 'pointer'
}) 

export const SearchInputStyle = () => ({
    width: '100%', 
    borderRadius: 8
})

export const CopyAccessModalStyle = (theme: Theme): SxProps<Theme> => ({
    '& .MuiPaper-root': { width: '400px', height: '147px' },
    '& .MuiDialogContent-root': { overflow: 'hidden'},
    '& .MuiDialogContentText-root': {
      fontFamily: 'Open Sans',
      overflowWrap: 'break-word',
      lineHeight: '22px',
      color: '#424E54',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex'
  
    },
    '& .MuiDialogTitle-root': {
      fontFamily: 'Open Sans',
      fontSize: '20px',
      fontWeight: '600',
      lineHeight: '27px',
      color: '#424E54'
    },
    '& .MuiButtonBase-root': {
      fontFamily: 'Open Sans',
      fontSize: '14px',
      lineHeight: '19px',
      fontWeight: '600',
      textTransform: 'none'
    }
  });

  export const SuccessContainerStyles = (theme: Theme): SxProps<Theme> => ({
    alignItems: 'center',
    justifyContent: 'center',
    color: '#727E84',
  flex: '1 1 0px',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  p: `${theme.spacing(4)} ${theme.spacing(3)} ${theme.spacing(2)} ${theme.spacing(3)}`
});

export const SuccessActionStyles = (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    justifyContent: 'end',
    padding: '25px 22px',
    textTransform: 'none',
    '& .MuiButtonBase-root': { textTransform: 'none' }
});


export const DiscardModal = (theme: Theme): SxProps<Theme> => ({
    '& .MuiPaper-root': { width: '400px', height: '157px' },
    '& .MuiDialogContentText-root': {
      fontFamily: 'Open Sans',
      overflowWrap: 'break-word',
      lineHeight: '22px',
      color: '#424E54',
         },
    '& .MuiDialogTitle-root': {
      fontFamily: 'Open Sans',
      fontSize: '20px',
      fontWeight: '600',
      lineHeight: '27px',
      color: '#424E54'
    },
    '& .MuiButtonBase-root': {
      fontFamily: 'Open Sans',
      fontSize: '14px',
      lineHeight: '19px',
      fontWeight: '600',
      textTransform: 'none'
    }
  });

  export const InviteMoreButtonStyles = (): SxProps<Theme> => ({
    width: '128px',
    height: '36px',
    textTransform: 'none',
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
});

export const CopyTextFieldStyles = (theme: Theme): SxProps<Theme> => ({
    width: '285px',
        "& .MuiInputBase-root": {
            height: '56px',
            //paddingLeft: '10px'
        },
    [theme.breakpoints.down('sm')]: {
        mt: 3,
    },
    '& .MuiFormLabel-root': {
        fontFamily: 'Open Sans'
    },
    '& .MuiInputBase-input': {
        //marginLeft: '10px'
    }
});

export const RoleContainerStyles = () => ({
    display: 'flex', 
    height: 24, 
    alignItems: 'center', 
    marginBottom: '8px'
})

export const ToggleContainerStyles = () => ({
    display: 'flex', 
    marginLeft: 'auto', 
    width: '53%', 
    justifyContent: 'center'
})