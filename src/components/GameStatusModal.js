import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function GameStatusModal(props) {

  const handleNewGameClick = () => {
    props.setGridData({});
    props.setGameStatusModalOpen(false);
    props.setGameOver(false);
    props.resetAnimation();
    
    if(props.lastWinner === 'Player'){
      props.setComputerFirstMove(true);            
    }      
  };

  const handleCancelClick = () => {
    props.setGameStatusModalOpen(false);
  };

  return (
    <div>      
      <Dialog        
        open={props.gameStatusModalOpen}
        onClose={handleCancelClick}
        fullWidth={true}
        maxWidth={'xs'}        
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">       
        <DialogContent style={{ display: 'flex', justifyContent: 'center' }}>
          <DialogContentText id="alert-dialog-description" style={{ marginTop: '20px' }}>
            <span style={{ fontStyle: 'bold', fontSize: '20px', color: '#282c34' }}> {props.gameOverMsg} </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="outlined" size="small" color="success" style={{ marginRight: '5%' }} onClick={handleNewGameClick}> 
            NEW GAME 
          </Button>
          <Button variant="outlined" size="small" onClick={handleCancelClick}> DISMISS </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}