import React, { useState } from 'react';
import ResetBoard from './ResetBoard';
import ScoreBoard from './ScoreBoard';
import GameStatusModal from './GameStatusModal';
import { motion } from "framer-motion";

function TicTacToeGrid(props) {   
    let [gameOverMsg, setGameOverMsg] = useState('');
    let [gameStatusModalOpen, setGameStatusModalOpen] = useState(false);
    const [playerScore, setPlayerScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);
    let [gameOver, setGameOver] = useState(false);
    const [gridData, setGridData] = useState({});
    const answerArr = [ [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7] ];

    //animation
    const [isAnimationActiveCell1, setIsAnimationActiveCell1] = useState(false);
    const [isAnimationActiveCell2, setIsAnimationActiveCell2] = useState(false);
    const [isAnimationActiveCell3, setIsAnimationActiveCell3] = useState(false);
    const [isAnimationActiveCell4, setIsAnimationActiveCell4] = useState(false);
    const [isAnimationActiveCell5, setIsAnimationActiveCell5] = useState(false);
    const [isAnimationActiveCell6, setIsAnimationActiveCell6] = useState(false);
    const [isAnimationActiveCell7, setIsAnimationActiveCell7] = useState(false);
    const [isAnimationActiveCell8, setIsAnimationActiveCell8] = useState(false);
    const [isAnimationActiveCell9, setIsAnimationActiveCell9] = useState(false);   

    const resetAnimation = () => {
        setIsAnimationActiveCell1(false);
        setIsAnimationActiveCell2(false);
        setIsAnimationActiveCell3(false);
        setIsAnimationActiveCell4(false);
        setIsAnimationActiveCell5(false);
        setIsAnimationActiveCell6(false);
        setIsAnimationActiveCell7(false);
        setIsAnimationActiveCell8(false);
        setIsAnimationActiveCell9(false);
    }

    const setAnimationActiveCells = (winningCellsArr) => {
        console.log('winningCellsArr', winningCellsArr);
        for(let i = 0; i < winningCellsArr.length; i++){
            //let stateName = `setIsAnimationActiveCell${winningCellsArr[i]}`;
            //console.log('state name', stateName);           
        
            switch(winningCellsArr[i]) {
                case 1:
                    setIsAnimationActiveCell1(true);
                    break
                case 2:
                    setIsAnimationActiveCell2(true);
                    break;
                case 3:
                    setIsAnimationActiveCell3(true);
                    break;
                case 4:
                    setIsAnimationActiveCell4(true);
                    break;
                case 5:
                    setIsAnimationActiveCell5(true);
                    break;
                case 6:
                    setIsAnimationActiveCell6(true);
                    break;
                case 7:
                    setIsAnimationActiveCell7(true);
                    break;
                case 8:
                    setIsAnimationActiveCell8(true);
                    break;
                case 9:
                    setIsAnimationActiveCell9(true);
                    break;
                default:
                    //do nothing
            }
        }
    }

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
                    setAnimationActiveCells(answerArr[i]);
                    setPlayerScore(playerScore + 1);
                    setGameOverMsg('YOU WIN!!!'); 
                    gameOver = true;
                    setGameOver(true);                    
                    break;
                }else if(oCount === 3) {
                    //debugger;
                    setAnimationActiveCells(answerArr[i]);
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

        //setIsAnimationActive(!isAnimationActive)

        if(gameOver){
            //debugger;
            return;
        }
       
        if(elementId){
            let playerElement = document.getElementById(elementId);
            let regX = new RegExp('X','gi');
            let regO = new RegExp('O', 'gi'); 
            
            if(playerElement.firstChild.innerHTML === '') {                
                playerElement.firstChild.innerHTML = 'X';    

                
                //setIsAnimationActiveCell1(true);

                //playerElement.style.color = ''
                //playerElement.style.color = '#8e9095';                    
                //console.log('playerElement style', playerElement.style);    
                console.log('first child', playerElement.firstChild.innerHTML);

                gridData[elementId] = playerElement.firstChild.innerHTML;      
                setGridData({ ...gridData });      
                takenGrids = Object.keys(gridData);                

                do{
                    randomNumber = Math.floor(Math.random() * 9) + 1;

                }while(takenGrids.includes(randomNumber.toString()) && takenGrids.length < 9);               
                
                let computerElement = document.getElementById(randomNumber);               
                
                setTimeout(function(){     

                    if(computerElement.firstChild.innerHTML === ''){                
                        //setTimeout(function(){                        
                            //computerElement.classList.toggle('grid-cell-animation');                   
                            computerElement.firstChild.innerHTML = 'O';
                            gridData[randomNumber] = computerElement.firstChild.innerHTML;      
                            setGridData({ ...gridData });                                             
                        //}, 300);                               
                    }     
                    
                    if( Object.values(gridData) && 
                    ( (Object.values(gridData).join('').match(regX) && Object.values(gridData).join('').match(regX).length >= 3) || 
                    ( Object.values(gridData).join('').match(regO) && Object.values(gridData).join('').match(regO).length) >= 3) ){
                        //debugger;
                        gameStatsUpdate();
                    }  

                    setTimeout(function(){ 
                
                        if(gameOver){       
                            //debugger;    
                            gameStatusModalOpen = true;
                            setGameStatusModalOpen(true);            
                        }else{
                            //debugger;
                            gameStatusModalOpen = false;
                            setGameStatusModalOpen(false);
                        }

                    }, 800);

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
                        resetAnimation={resetAnimation}
            />

            <div id = "tic-tac-toe-grid" className = "tic-tac-toe-grid">
                <div key = {1} id = {1} onClick={(event)=> gridCellOnClick(event)} 
                     className = "tic-tac-toe-grid-cell grid-cell-no-top grid-cell-no-left"                     
                >
                    <motion.div 
                        animate={{
                            scale: isAnimationActiveCell1 ? [1, 1.1, 1.1, 1, 1] : 1,
                            rotate: isAnimationActiveCell1 ? [0, 0, 270, 270, 0] : 0                            
                          }}
                    >                    
                        {gridData['1']}
                    </motion.div>
                    
                </div>
                <div key = {2} id = {2} onClick={(event)=> gridCellOnClick(event)} 
                     className = "tic-tac-toe-grid-cell grid-cell-no-top"                     
                > 
                    <motion.div 
                        animate={{
                            scale: isAnimationActiveCell2 ? [1, 1.1, 1.1, 1, 1] : 1,
                            rotate: isAnimationActiveCell2 ? [0, 0, 270, 270, 0] : 0                            
                          }}
                    >      
                        {gridData['2']}
                    </motion.div>
                </div>
                <div key = {3} id = {3} onClick={(event)=> gridCellOnClick(event)} 
                     className = "tic-tac-toe-grid-cell grid-cell-no-top grid-cell-no-right"                     
                > 
                    <motion.div 
                        animate={{
                            scale: isAnimationActiveCell3 ? [1, 1.1, 1.1, 1, 1] : 1,
                            rotate: isAnimationActiveCell3 ? [0, 0, 270, 270, 0] : 0                            
                          }}
                    >   
                        {gridData['3']}  
                    </motion.div>            
                </div>
                <div key = {4} id = {4} onClick={(event)=> gridCellOnClick(event)} 
                     className = "tic-tac-toe-grid-cell grid-cell-no-left"
                     
                > 
                    <motion.div 
                        animate={{
                            scale: isAnimationActiveCell4 ? [1, 1.1, 1.1, 1, 1] : 1,
                            rotate: isAnimationActiveCell4 ? [0, 0, 270, 270, 0] : 0                            
                          }}
                    >   
                        {gridData['4']}  
                    </motion.div>  
                </div>
                <div key = {5} id = {5} onClick={(event)=> gridCellOnClick(event)} 
                     className = "tic-tac-toe-grid-cell"                     
                > 
                    <motion.div 
                        animate={{
                            scale: isAnimationActiveCell5 ? [1, 1.1, 1.1, 1, 1] : 1,
                            rotate: isAnimationActiveCell5 ? [0, 0, 270, 270, 0] : 0                            
                          }}
                    >   
                        {gridData['5']}  
                    </motion.div>  
                </div>
                <div key = {6} id = {6} onClick={(event)=> gridCellOnClick(event)} 
                     className = "tic-tac-toe-grid-cell grid-cell-no-right"                     
                > 
                     <motion.div 
                        animate={{
                            scale: isAnimationActiveCell6 ? [1, 1.1, 1.1, 1, 1] : 1,
                            rotate: isAnimationActiveCell6 ? [0, 0, 270, 270, 0] : 0                            
                          }}
                    >   
                        {gridData['6']}  
                    </motion.div>  
                </div>
                <div key = {7} id = {7} onClick={(event)=> gridCellOnClick(event)} 
                     className = "tic-tac-toe-grid-cell grid-cell-no-bottom grid-cell-no-left"                     
                > 
                    <motion.div 
                        animate={{
                            scale: isAnimationActiveCell7 ? [1, 1.1, 1.1, 1, 1] : 1,
                            rotate: isAnimationActiveCell7 ? [0, 0, 270, 270, 0] : 0                            
                          }}
                    >   
                        {gridData['7']}  
                    </motion.div>  
                </div>
                <div key = {8} id = {8} onClick={(event)=> gridCellOnClick(event)} 
                     className = "tic-tac-toe-grid-cell grid-cell-no-bottom"                     
                > 
                    <motion.div 
                        animate={{
                            scale: isAnimationActiveCell8 ? [1, 1.1, 1.1, 1, 1] : 1,
                            rotate: isAnimationActiveCell8 ? [0, 0, 270, 270, 0] : 0                            
                          }}
                    >   
                        {gridData['8']}  
                    </motion.div>  
                </div>
                <div key = {9} id = {9} onClick={(event)=> gridCellOnClick(event)} 
                     className = "tic-tac-toe-grid-cell grid-cell-no-bottom grid-cell-no-right"
                >                    
                    <motion.div 
                        animate={{
                            scale: isAnimationActiveCell9 ? [1, 1.1, 1.1, 1, 1] : 1,
                            rotate: isAnimationActiveCell9 ? [0, 0, 270, 270, 0] : 0                            
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
                             resetAnimation={resetAnimation}

            />
        </div>
    );
}

export default TicTacToeGrid;