import React, { useState } from 'react';
import ResetBoard from './ResetBoard';
import ScoreBoard from './ScoreBoard';
import GameStatusModal from './GameStatusModal';

function TicTacToeGrid(props) {
    let [gameOverMsg, setGameOverMsg] = useState('');
    let [gameStatusModalOpen, setGameStatusModalOpen] = useState(false);
    const [playerScore, setPlayerScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
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

    const answerArr = [ [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7] ];
    
    const gridCellOnClick = (event) => {        
        //console.log('on click', event);
        let elementId = event && event.target && event.target.id ? event.target.id : null;
        let takenGrids = [];
        let randomNumber = null;
       
        if(elementId){
            let playerElement = document.getElementById(elementId);
            
            if(playerElement.innerHTML === ''){
                playerElement.innerHTML = 'X';
                gridData[elementId] = playerElement.innerHTML;      
                setGridData({ ...gridData });      

                takenGrids = Object.keys(gridData);
                //console.log('taken grids', takenGrids);

                do{
                    randomNumber = Math.floor(Math.random() * 9) + 1;

                }while(takenGrids.includes(randomNumber.toString()) && takenGrids.length < 9);
                
                //console.log('random number', randomNumber);

                let computerElement = document.getElementById(randomNumber);                

                if(computerElement.innerHTML === ''){
                    setTimeout(function(){
                        computerElement.innerHTML = 'O';
                        gridData[randomNumber] = computerElement.innerHTML;      
                        setGridData({ ...gridData });  
    
                        takenGrids = Object.keys(gridData);
                        //console.log('taken grids', takenGrids);
                    }, 300);
                  
                }
            }      
           
            //console.log('playerElement', playerElement);
            //console.log('computerElement', computerElement);
            //console.log('gridData in gridCellOnClick', gridData);
        }   
        
        let regX = new RegExp('X','gi');
        let regO = new RegExp('O', 'gi');        
       
        if(Object.keys(gridData).length >= 9 && Object.values(gridData).join('').match(regX).length > Object.values(gridData).join('').match(regO).length){                     
            setPlayerScore(playerScore + 1);   
            setGameOver(true); 
            setGameOverMsg('YOU WIN!!!');   
        }else if(Object.keys(gridData).length >= 9 && Object.values(gridData).join('').match(regX).length < Object.values(gridData).join('').match(regO).length){
            console.log('second if');
            setComputerScore(computerScore + 1);
            setGameOver(true);
            setGameOverMsg('COMPUTER WINS!!!');
        }
        // else{
        //     setGameOverMsg("IT'S A TIE!!!");
        // }

        if(Object.keys(gridData).length >= 9 || gameOver){           
            gameStatusModalOpen = true;
            setGameStatusModalOpen(true);            
        }else{
            gameStatusModalOpen = false;
            setGameStatusModalOpen(false);
        }
    }    
 
    return(
        <div className="tic-tac-toe-main-div">
            <ResetBoard gridData={gridData} 
                        setGridData={setGridData} 
                        playerScore={playerScore}
                        computerScore={computerScore}
                        setPlayerScore={setPlayerScore} 
                        setComputerScore={setComputerScore}
                        setGameOver={setGameOver}
            />

            <div id = "tic-tac-toe-grid" className = "tic-tac-toe-grid">
                <div key = {1} id = {1} onClick={(event)=> gridCellOnClick(event)} 
                     className = "tic-tac-toe-grid-cell grid-cell-no-top grid-cell-no-left"> 
                        {gridData['1']} 
                </div>
                <div key = {2} id = {2} onClick={(event)=> gridCellOnClick(event)} 
                     className = "tic-tac-toe-grid-cell grid-cell-no-top"> 
                        {gridData['2']} 
                </div>
                <div key = {3} id = {3} onClick={(event)=> gridCellOnClick(event)} 
                     className = "tic-tac-toe-grid-cell grid-cell-no-top grid-cell-no-right"> 
                        {gridData['3']} 
                </div>
                <div key = {4} id = {4} onClick={(event)=> gridCellOnClick(event)} 
                     className = "tic-tac-toe-grid-cell grid-cell-no-left"> 
                        {gridData['4']} 
                </div>
                <div key = {5} id = {5} onClick={(event)=> gridCellOnClick(event)} 
                     className = "tic-tac-toe-grid-cell"> 
                        {gridData['5']} 
                </div>
                <div key = {6} id = {6} onClick={(event)=> gridCellOnClick(event)} 
                     className = "tic-tac-toe-grid-cell grid-cell-no-right"> 
                        {gridData['6']} 
                </div>
                <div key = {7} id = {7} onClick={(event)=> gridCellOnClick(event)} 
                     className = "tic-tac-toe-grid-cell grid-cell-no-bottom grid-cell-no-left"> 
                        {gridData['7']} 
                </div>
                <div key = {8} id = {8} onClick={(event)=> gridCellOnClick(event)} 
                     className = "tic-tac-toe-grid-cell grid-cell-no-bottom"> 
                        {gridData['8']} 
                </div>
                <div key = {9} id = {9} onClick={(event)=> gridCellOnClick(event)} 
                     className = "tic-tac-toe-grid-cell grid-cell-no-bottom grid-cell-no-right"> 
                        {gridData['9']} 
                </div>
            </div>

            <ScoreBoard playerScore={playerScore} 
                        computerScore={computerScore} 
                        setPlayerScore={setPlayerScore} 
                        setComputerScore={setComputerScore}
            /> 

            <GameStatusModal gameStatusModalOpen={gameStatusModalOpen} 
                             setGameStatusModalOpen={setGameStatusModalOpen}
                             gameOverMsg = {gameOverMsg}
                             gridData={gridData} 
                             setGridData={setGridData} 
                             setGameOver={setGameOver}
            />
        </div>
    );
}

export default TicTacToeGrid;