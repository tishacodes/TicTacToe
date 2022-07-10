import React, { useEffect, useState } from 'react';
import { IconButton, Tooltip } from "@material-ui/core";
import RefreshIcon from '@mui/icons-material/Refresh';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
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
            //console.log('props.gridData', props.gridData);                      
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
        <div role="heading" aria-level="1" aria-label="tic tac toe game header with game controls" className="reset-board-div">
            <Tooltip title="Reset Scores to Zero">
                <span>
                    <IconButton 
                            disabled={resetDisabled} 
                            aria-label="reset scores to zero" style={resetDisabled ? { color: 'gray' } : {color: 'inherit'} } 
                            onClick={(event) => refreshScoreBoard(event)}
                    >
                            <RefreshIcon fontSize="medium" color="inherit" style={{ cursor: 'pointer' }}/>                
                    </IconButton>
                </span>
            </Tooltip>

            <Tooltip title="Click on an empty square to play">
                <span>
                    <IconButton
                        aria-label="click on an empty square to play" 
                        style={{ color: 'inherit', cursor: 'default' }}
                    >
                        <QuestionMarkIcon fontSize="medium" color="inherit"/>
                    </IconButton>
                </span>
            </Tooltip>

            <Tooltip title="New Game / Restart Game In Progress">
                <span>
                    <IconButton disabled={newButtonDisabled} 
                        aria-label="new game / restart game in progress" 
                        style={newButtonDisabled ? { color: 'gray' } : {color: 'inherit'} } 
                        onClick={(event) => refreshGameBoard(event)}
                    >
                        <FiberNewIcon fontSize="medium" color="inherit" style={{ cursor: 'pointer' }}/>
                    </IconButton>
                </span>
            </Tooltip>
        </div>
    );
}

export default ResetBoard;