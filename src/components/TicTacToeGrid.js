import React, { useState } from 'react';
import ResetBoard from './ResetBoard';
import ScoreBoard from './ScoreBoard';
import GameStatusModal from './GameStatusModal';
import { motion } from "framer-motion";

function TicTacToeGrid(props) {
    const [isAnimationActive, setIsAnimationActive] = useState(false);
    let [gameOverMsg, setGameOverMsg] = useState('');
    let [gameStatusModalOpen, setGameStatusModalOpen] = useState(false);
    const [playerScore, setPlayerScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);
    let [gameOver, setGameOver] = useState(false);
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

    const computerMoves = () => {

    }

    const gameStatsUpdate = () => {               
        for(let i = 0; i < answerArr.length; i++) {
            let containsGridCell = answerArr[i].every(element => {               
                return Object.keys(gridData).includes(element.toString());
            });           

            if(containsGridCell) {      
                //debugger;         
                let xCount = 0, oCount = 0;

                for(let j = 0; j < answerArr[i].length; j++) {
                    if(gridData[answerArr[i][j]] === 'X'){
                        xCount++;
                    }

                    if(gridData[answerArr[i][j]] === 'O'){
                        oCount++;
                    }
                }

                if(xCount === 3) {
                    //debugger;
                    setPlayerScore(playerScore + 1);
                    setGameOverMsg('YOU WIN!!!'); 
                    gameOver = true;
                    setGameOver(true);                    
                    break;
                }else if(oCount === 3) {
                    //debugger;
                    setComputerScore(computerScore + 1);
                    setGameOverMsg('COMPUTER WINS!!!');
                    gameOver = true;
                    setGameOver(true);
                    break;
                }
            }                            
        }

        if(!gameOver && Object.keys(gridData).length === 9) {
            //debugger;
            setGameOverMsg("IT'S A TIE!!!");
            gameOver = true;
            setGameOver(true);            
        }
    }
    
    const gridCellOnClick = (event) => {        
        console.log('on click', event);
        let elementId = event && event.target && event.target.id ? event.target.id : null;
        let takenGrids = [];
        let randomNumber = null;

        setIsAnimationActive(!isAnimationActive)

        if(gameOver){
            //debugger;
            return;
        }
       
        if(elementId){
            let playerElement = document.getElementById(elementId);
            let regX = new RegExp('X','gi');
            let regO = new RegExp('O', 'gi'); 
            
            if(playerElement) {                
                playerElement.firstChild.innerHTML = 'X';               
                gridData[elementId] = playerElement.firstChild.innerHTML;      
                setGridData({ ...gridData });      
                takenGrids = Object.keys(gridData);                

                do{
                    randomNumber = Math.floor(Math.random() * 9) + 1;

                }while(takenGrids.includes(randomNumber.toString()) && takenGrids.length < 9);               
                
                let computerElement = document.getElementById(randomNumber);               
                
                setTimeout(function(){     

                    if(computerElement.innerHTML === ''){                
                        //setTimeout(function(){                        
                            //computerElement.classList.toggle('grid-cell-animation');                   
                            computerElement.innerHTML = 'O';
                            gridData[randomNumber] = computerElement.innerHTML;      
                            setGridData({ ...gridData });                                             
                        //}, 300);                               
                    }     
                    
                    if( Object.values(gridData) && 
                    ( (Object.values(gridData).join('').match(regX) && Object.values(gridData).join('').match(regX).length >= 3) || 
                    ( Object.values(gridData).join('').match(regO) && Object.values(gridData).join('').match(regO).length) >= 3) ){
                        //debugger;
                        gameStatsUpdate();
                    }  
                
                    if(gameOver){       
                        //debugger;    
                        gameStatusModalOpen = true;
                        setGameStatusModalOpen(true);            
                    }else{
                        //debugger;
                        gameStatusModalOpen = false;
                        setGameStatusModalOpen(false);
                    }

                }, 300);
            }       
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
                <motion.div key = {1} id = {1} onClick={(event)=> gridCellOnClick(event)} 
                     className = "tic-tac-toe-grid-cell grid-cell-no-top grid-cell-no-left"                    
                     animate={{
                        scale: isAnimationActive ? [1, 1.1, 1.1, 1, 1] : 1,
                        //rotate: isAnimationActive ? [0, 0, 270, 270, 0] : 0,
                        //borderRadius: isAnimationActive ? ["20%", "20%", "50%", "50%", "20%"] : 0,
                      }}
                > 
                        {gridData['1']}
                </motion.div>
                <motion.div key = {2} id = {2} onClick={(event)=> gridCellOnClick(event)} 
                     className = "tic-tac-toe-grid-cell grid-cell-no-top"
                     animate={{
                        //rotate: isAnimationActive ? 360 : 0
                        //scale: isAnimationActive ? [1, 1.1, 1.1, 1, 1] : 1,
                     }}
                > 
                        {gridData['2']}
                </motion.div>
                <motion.div key = {3} id = {3} onClick={(event)=> gridCellOnClick(event)} 
                     className = "tic-tac-toe-grid-cell grid-cell-no-top grid-cell-no-right"
                     animate={{
                        //rotate: isAnimationActive ? 360 : 0
                        //scale: isAnimationActive ? [1, 1.1, 1.1, 1, 1] : 1,
                     }}
                > 
                        {gridData['3']}
                </motion.div>
                <motion.div key = {4} id = {4} onClick={(event)=> gridCellOnClick(event)} 
                     className = "tic-tac-toe-grid-cell grid-cell-no-left"
                     animate={{
                        //rotate: isAnimationActive ? 360 : 0
                     }}
                > 
                        {gridData['4']}
                </motion.div>
                <motion.div key = {5} id = {5} onClick={(event)=> gridCellOnClick(event)} 
                     className = "tic-tac-toe-grid-cell"
                     animate={{
                        //scale: isAnimationActive ? [1, 1.1, 1.1, 1, 1] : 1,
                        //scale: isAnimationActive ? [1, 2, 2, 1, 1] : 1,
                        //rotate: isAnimationActive ? [0, 0, 270, 270, 0] : 0,
                        //borderRadius: isAnimationActive ? ["20%", "20%", "50%", "50%", "20%"] : 0,
                      }}
                > 
                        {gridData['5']}
                </motion.div>
                <motion.div key = {6} id = {6} onClick={(event)=> gridCellOnClick(event)} 
                     className = "tic-tac-toe-grid-cell grid-cell-no-right"
                     animate={{
                        //rotate: isAnimationActive ? 360 : 0
                        //scale: isAnimationActive ? [1, 1.1, 1.1, 1, 1] : 1,
                     }}
                > 
                        {gridData['6']}
                </motion.div>
                <motion.div key = {7} id = {7} onClick={(event)=> gridCellOnClick(event)} 
                     className = "tic-tac-toe-grid-cell grid-cell-no-bottom grid-cell-no-left"
                     animate={{
                        //rotate: isAnimationActive ? 360 : 0                        
                     }}
                > 
                        {gridData['7']}
                </motion.div>
                <motion.div key = {8} id = {8} onClick={(event)=> gridCellOnClick(event)} 
                     className = "tic-tac-toe-grid-cell grid-cell-no-bottom"
                     animate={{
                        //rotate: isAnimationActive ? 360 : 0
                        //scale: isAnimationActive ? [1, 1.1, 1.1, 1, 1] : 1,
                     }}
                > 
                        {gridData['8']}
                </motion.div>
                <div key = {9} id = {9} onClick={(event)=> gridCellOnClick(event)} 
                     className = "tic-tac-toe-grid-cell grid-cell-no-bottom grid-cell-no-right">
                    <motion.div 
                        animate={{
                            scale: isAnimationActive ? [1, 1.5, 1.5, 1, 1] : 1,
                            //scale: isAnimationActive ? [1, 2, 2, 1, 1] : 1,
                            rotate: isAnimationActive ? [0, 0, 270, 270, 0] : 0,
                            //borderRadius: isAnimationActive ? ["20%", "20%", "50%", "50%", "20%"] : 0,
                        }}
                    > 
                        {gridData['9']}
                    </motion.div>
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