import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { SxProps, Theme } from '@mui/material/styles';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  title: string | JSX.Element;
  content: string | JSX.Element;
  actions?: JSX.Element;
  customStyle?: any;
}

export const ConfirmModalContainer = (theme: Theme): SxProps<Theme> => ({
  '& .MuiPaper-root': { maxWidth: '280px', height: '267px' },
  '& .MuiDialogContent-root': { overflow: 'hidden'},
  '& .MuiDialogContentText-root': {
    fontFamily: 'Open Sans',
    overflowWrap: 'break-word',
    lineHeight: '22px',
    color: '#424E54'
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

export const ConfirmModal: React.FC<React.PropsWithChildren<SimpleDialogProps>> = (props) => {

  const { onClose, open, title, content, actions, customStyle } = props;
  const theme = useTheme();

  return (
    <Dialog onClose={onClose} open={open} sx={customStyle ? customStyle(theme) : ConfirmModalContainer(theme)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {actions}
      </DialogActions>
    </Dialog>
  );
}

