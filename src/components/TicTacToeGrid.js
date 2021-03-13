import React from 'react';

function TicTacToeGrid(props){

    const ROWS = 3;
    const COLS = 3;
    var grid = [];
    for(let i = 0; i < ROWS; i++){
        for(let j = 0; j < COLS; j++){
            grid.push(<div className = "tic-tac-toe-grid-cell">cell</div>);
        }
    }    

    return(
        <div className = "tic-tac-toe-grid">{grid}</div>

    );

}

export default TicTacToeGrid;