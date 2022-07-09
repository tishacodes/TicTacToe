import React, { useState } from 'react';
import { IconButton, Tooltip } from "@material-ui/core";
import RefreshIcon from '@mui/icons-material/Refresh';
import FiberNewIcon from '@mui/icons-material/FiberNew';

function ResetBoard(props) {

    const [disabled, setDisabled] = useState(true);

    const refreshScoreBoard = (event) => {  
        event.preventDefault();         
        props.setPlayerScore(55);
        props.setComputerScore(0);
    }

    const refreshGameBoard = (event) => {
        event.preventDefault(); 
        props.setGridData({});
    }

    return(
        <div role="heading" aria-level="1" aria-label="tic tac toe game header with reset controls" className="reset-board-div">
            <Tooltip title="Reset Scores">
                <IconButton disabled={disabled} aria-label="reset scores" style={disabled ? { color: 'gray' } : {color: 'inherit'} } onClick={(event) => refreshScoreBoard(event)}>
                    <RefreshIcon fontSize="large" color="inherit" style={{ cursor: 'pointer', margin: 0 }}/>                
                </IconButton>
            </Tooltip>

            <Tooltip title="New Game">
                <IconButton disabled={disabled} aria-label="reset current game" style={disabled ? { color: 'gray' } : {color: 'inherit'} } onClick={(event) => refreshGameBoard(event)}>
                    <FiberNewIcon fontSize="large" color="inherit" style={{ cursor: 'pointer' }}/>
                </IconButton>
            </Tooltip>
        </div>
    );
}

export default ResetBoard;