import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';

const CustomizedSnackbar: React.FC<React.PropsWithChildren<any>> = (props) => {
    const { open = false, message = '', removeToast } = props;

    return (
        <>
                <Snackbar
                    data-testid="customSnackbar"
                    open={open}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    autoHideDuration={5000}
                    onClose={removeToast}
                    action={
                        <Button color="primary" size="small" onClick={removeToast}>
                            OK
                        </Button>
                    }
                    message={message}
                />
        </>
    );
};

export default CustomizedSnackbar;
