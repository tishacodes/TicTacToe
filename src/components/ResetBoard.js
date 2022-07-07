import React from 'react';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FiberNewIcon from '@mui/icons-material/FiberNew';
//import Grid3x3Icon from '@mui/icons-material/Grid3x3';
function ResetBoard() {

    return(
        <div className="reset-board-div">
            <div style={{ cursor: 'pointer' }}>
                <RestartAltIcon fontSize='large'/>                
            </div>

            <div style={{ cursor: 'pointer' }}>
                <FiberNewIcon fontSize='large'/>
            </div>
        </div>
    );
}

export default ResetBoard;