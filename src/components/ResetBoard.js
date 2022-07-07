import React from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import FiberNewIcon from '@mui/icons-material/FiberNew';

function ResetBoard(props) {

    const refreshScoreBoard = (event) => {  
        event.preventDefault();         
        props.setPlayerScore(0);
        props.setComputerScore(0);
    }

    const refreshGameBoard = (event) => {
        event.preventDefault(); 
        props.setGridData({});
    }

    return(
        <div className="reset-board-div">
            <div style={{ cursor: 'pointer' }} onClick={(event) => refreshScoreBoard(event)}>
                <RefreshIcon fontSize='large'/>                
            </div>

            <div style={{ cursor: 'pointer' }} onClick={(event) => refreshGameBoard(event)}>
                <FiberNewIcon fontSize='large'/>
            </div>
        </div>
    );
}

export default ResetBoard;