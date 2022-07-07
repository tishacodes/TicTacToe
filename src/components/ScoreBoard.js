import React from 'react';

function ScoreBoard(props){

    return (
        <div className="score-board-div">
            <div className="player-score-div">
                <p style={{ margin: 0}}>PLAYER <span style={{fontFamily: "cursive"}}>(X)</span></p>
                <p style = {{ margin: 0}}> {props.playerScore} </p>
            </div>

            <div className="computer-score-div">
                <p style={{ margin: 0}}>COMPUTER <span style={{fontFamily: "cursive"}}>(O)</span></p>
                <p style={{ margin: 0}}> {props.computerScore} </p>
            </div>
        </div>
    )
}

export default ScoreBoard;