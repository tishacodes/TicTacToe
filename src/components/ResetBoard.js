import React from 'react';

function ResetBoard() {

    return(
        <div className="reset-board-div">
            <div style={{ cursor: 'pointer' }}>
                RESET
            </div>

            <div style={{ cursor: 'pointer' }}>
                NEW
            </div>
        </div>
    );
}

export default ResetBoard;