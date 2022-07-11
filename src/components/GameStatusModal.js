import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function GameStatusModal() {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={'xs'}        
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"        
      >
        {/* <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle> */}
        <DialogContent style={{ display: 'flex', justifyContent: 'center' }}>
          <DialogContentText id="alert-dialog-description" style={{ marginTop: '20px' }}>
            YOU WIN!!!
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" style={{ marginRight: '5%' }} onClick={handleClose}>PLAY AGAIN</Button>
          <Button variant="outlined" onClick={handleClose} autoFocus>
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}