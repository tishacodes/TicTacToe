import React, { useState } from 'react';
import ResetBoard from './ResetBoard';
import ScoreBoard from './ScoreBoard';

function TicTacToeGrid(props) {
    const [playerScore, setPlayerScore] = useState(10);
    const [computerScore, setComputerScore] = useState(20);
    const [gridData, setGridData] = useState({
        // 1: 'X',
        // 2: 'O',
        // 3: 'X',
        // 4: '',
        // 5: '',
        // 6: '',
        // 7: '',
        // 8: '',
        // 9: ''
    });
    
    return(
        <div className="tic-tac-toe-main-div">
            <ResetBoard gridData={gridData} setGridData={setGridData} />

            <div className = "tic-tac-toe-grid">
                <div key = {1} className = "tic-tac-toe-grid-cell grid-cell-no-top grid-cell-no-left"> {gridData['1']} </div>
                <div key = {2} className = "tic-tac-toe-grid-cell grid-cell-no-top"> {gridData['2']} </div>
                <div key = {3} className = "tic-tac-toe-grid-cell grid-cell-no-top grid-cell-no-right"> {gridData['3']} </div>
                <div key = {4} className = "tic-tac-toe-grid-cell grid-cell-no-left"> {gridData['4']} </div>
                <div key = {5} className = "tic-tac-toe-grid-cell"> {gridData['5']} </div>
                <div key = {6} className = "tic-tac-toe-grid-cell grid-cell-no-right"> {gridData['6']} </div>
                <div key = {7} className = "tic-tac-toe-grid-cell grid-cell-no-bottom grid-cell-no-left"> {gridData['7']} </div>
                <div key = {8} className = "tic-tac-toe-grid-cell grid-cell-no-bottom"> {gridData['8']} </div>
                <div key = {9} className = "tic-tac-toe-grid-cell grid-cell-no-bottom grid-cell-no-right"> {gridData['9']} </div>
            </div>

            <ScoreBoard playerScore={playerScore} 
                        computerScore={computerScore} 
                        setPlayerScore={setPlayerScore} 
                        setComputerScore={setComputerScore}
            /> 
        </div>
    );
}

export default TicTacToeGrid;