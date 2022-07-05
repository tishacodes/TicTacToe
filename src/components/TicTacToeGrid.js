import React from 'react';
import ScoreBoard from './ScoreBoard';

function TicTacToeGrid(props){

    // const ROWS = 3;
    // const COLS = 3;
    // var grid = [];
    // for(let i = 0; i < ROWS; i++){
    //     for(let j = 0; j < COLS; j++){
    //         grid.push(<div className = "tic-tac-toe-grid-cell">cell</div>);
    //     }
    // }    

    // return(
    //     <div className = "tic-tac-toe-grid">{grid}</div>
    // );
    return(
        <>
            <div className = "tic-tac-toe-grid">
                <div key = {1} className = "tic-tac-toe-grid-cell grid-cell-no-top grid-cell-no-left">X</div>
                <div key = {2} className = "tic-tac-toe-grid-cell grid-cell-no-top">O</div>
                <div key = {3} className = "tic-tac-toe-grid-cell grid-cell-no-top grid-cell-no-right">O</div>
                <div key = {4} className = "tic-tac-toe-grid-cell grid-cell-no-left">O</div>
                <div key = {5} className = "tic-tac-toe-grid-cell">X</div>
                <div key = {6} className = "tic-tac-toe-grid-cell grid-cell-no-right">O</div>
                <div key = {7} className = "tic-tac-toe-grid-cell grid-cell-no-bottom grid-cell-no-left">O</div>
                <div key = {8} className = "tic-tac-toe-grid-cell grid-cell-no-bottom">O</div>
                <div key = {9} className = "tic-tac-toe-grid-cell grid-cell-no-bottom grid-cell-no-right">X</div>
            </div>

            <ScoreBoard /> 
        </>
    );
}

export default TicTacToeGrid;