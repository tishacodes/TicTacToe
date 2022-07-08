import React from 'react';
import { IconButton } from "@material-ui/core";
import RefreshIcon from '@mui/icons-material/Refresh';
import FiberNewIcon from '@mui/icons-material/FiberNew';
//import CancelIcon from '@material-ui/icons/Cancel';


function ResetBoard(props) {

    const refreshScoreBoard = (event) => {  
        event.preventDefault();         
        props.setPlayerScore(55);
        props.setComputerScore(0);
    }

    const refreshGameBoard = (event) => {
        event.preventDefault(); 
        props.setGridData({});
    }

//     <div role="heading" aria-level="1" aria-label="tic tac toe game header with reset controls" className="reset-board-div">
//     <button disabled style={{ border: 0, padding: 0 }} onClick={(event) => refreshScoreBoard(event)}>
//         <RefreshIcon component="button" sx={{ fontSize: 40 }} />                
//     </button>

//     <button className="new-button" disabled style={{ cursor: 'pointer', border: 0, padding: 0, backgroundColor: '#282c34' }} onClick={(event) => refreshGameBoard(event)}>
//         <FiberNewIcon sx={{ fontSize: 40 }}  />
//     </button>
// </div>

    return(
        <div role="heading" aria-level="1" aria-label="tic tac toe game header with reset controls" className="reset-board-div">
            <IconButton disabled aria-label="reset scores" color="inherit" onClick={(event) => refreshScoreBoard(event)}>
                <RefreshIcon fontSize="large" color="inherit" style={{ cursor: 'pointer', margin: 0 }}/>                
            </IconButton>

            <IconButton disabled aria-label="reset current game" color="inherit" onClick={(event) => refreshGameBoard(event)}>
                <FiberNewIcon fontSize="large" color="inherit" style={{ cursor: 'pointer' }}/>
            </IconButton>
        </div>
    );
}

export default ResetBoard;