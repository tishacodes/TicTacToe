import React, { useEffect, useState } from 'react';
import { IconButton, Tooltip } from "@material-ui/core";
import RefreshIcon from '@mui/icons-material/Refresh';
import FiberNewIcon from '@mui/icons-material/FiberNew';

function ResetBoard(props) {

    const [resetDisabled, setResetDisabled] = useState();
    const [newButtonDisabled, setNewButtonDisabled] = useState();

    useEffect(() => {            
        if(props.playerScore > 0 || props.computerScore > 0){            
            setResetDisabled(false);
        }else{
            setResetDisabled(true);
        }

        if(props.gridData && Object.keys(props.gridData) && Object.keys(props.gridData).length && Object.keys(props.gridData).length > 0){                        
            setNewButtonDisabled(false);
        }else{
            setNewButtonDisabled(true);
        }

    }, [props.playerScore, props.computerScore, props.gridData]);   

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
            <Tooltip title="Reset Scores to Zero(0)">
                <span>
                    <IconButton 
                            disabled={resetDisabled} 
                            aria-label="reset scores" style={resetDisabled ? { color: 'gray' } : {color: 'inherit'} } 
                            onClick={(event) => refreshScoreBoard(event)}
                        >
                            <RefreshIcon fontSize="large" color="inherit" style={{ cursor: 'pointer', margin: 0 }}/>                
                    </IconButton>
                </span>
            </Tooltip>

            <Tooltip title="New Game / Restart Game In Progress">
                <span>
                    <IconButton disabled={newButtonDisabled} 
                        aria-label="reset current game" 
                        style={newButtonDisabled ? { color: 'gray' } : {color: 'inherit'} } 
                        onClick={(event) => refreshGameBoard(event)}
                    >
                        <FiberNewIcon fontSize="large" color="inherit" style={{ cursor: 'pointer' }}/>
                    </IconButton>
                </span>
            </Tooltip>
        </div>
    );
}

export default ResetBoard;