import React from 'react';
import ResetBoard from './ResetBoard';
import ScoreBoard from './ScoreBoard';

function TicTacToeGrid(props) {
    
    return(
        <div className="tic-tac-toe-main-div">
            <ResetBoard/>

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

            <ScoreBoard playerScore={10} computerScore={20}/> 
        </div>
    );
}

export default TicTacToeGrid;