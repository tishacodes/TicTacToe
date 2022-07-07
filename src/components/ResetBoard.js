import React from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import FiberNewIcon from '@mui/icons-material/FiberNew';
//import Grid3x3Icon from '@mui/icons-material/Grid3x3';
function ResetBoard() {

    return(
        <div className="reset-board-div">
            <div style={{ cursor: 'pointer' }}>
                <RefreshIcon fontSize='large'/>                
            </div>

            <div style={{ cursor: 'pointer' }}>
                <FiberNewIcon fontSize='large'/>
            </div>
        </div>
    );
}

export default ResetBoard;