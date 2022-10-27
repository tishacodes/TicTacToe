import React, { useState, useEffect } from 'react';
import ResetBoard from './ResetBoard';
import ScoreBoard from './ScoreBoard';
import GameStatusModal from './GameStatusModal';
import { motion } from "framer-motion";

function TicTacToeGrid(props) {      
    const NUM_OF_CELLS = 9;
    const [playerScore, setPlayerScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);
    let [lastWinner, setLastWinner] = useState('');
    let [computerFirstMove, setComputerFirstMove] = useState(false);
    let [gameOver, setGameOver] = useState(false);
    let [gameOverMsg, setGameOverMsg] = useState('');
    let [gameStatusModalOpen, setGameStatusModalOpen] = useState(false);
    //stores the user and computer selections on the grid, {key -> elementID, value -> X or O}
    const [gridData, setGridData] = useState({});
    //stores all possible player play combinations
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

    useEffect( () => {       
        if(computerFirstMove){           
            computerMoves();
        }              
    }, [gameOver, computerFirstMove]);

    const resetAnimation = () => {
        for(let i = 1; i <= NUM_OF_CELLS; i++){
            let resetAnimation = `setIsAnimationActiveCell${i}(false)`;  
            eval(resetAnimation);            
        }       
    }

    const setAnimationActiveCells = (winningCellsArr) => {      
        for(let i = 0; i < winningCellsArr.length; i++){
            let setAnimation = `setIsAnimationActiveCell${winningCellsArr[i]}(true)`;           
            eval(setAnimation);      
        }
    }

    const addToRandomCell = () => {             
        let randomNumber = null; 
        let takenGrids = [];
        //array of grid elementIds that are already selected
        takenGrids = Object.keys(gridData);

        do{
            //returns a random integer from 1 to 9
            randomNumber = Math.floor(Math.random() * 9) + 1;
        //find a randomNumber that does not correspond to a grid elementId that is already selected
        }while(takenGrids.includes(randomNumber.toString()) && takenGrids.length < 9);               
                
        let computerElement = document.getElementById(randomNumber);  
        
        //add O to the randomly selected grid cell and update gridData
        if(computerElement.firstChild.innerHTML === ''){               
            computerElement.firstChild.innerHTML = 'O';
            gridData[randomNumber] = computerElement.firstChild.innerHTML;      
            setGridData({ ...gridData });                                                      
        }        
    }

    const computerMoves = () => {
        //if gameOver (with a win) and the computer didn't make the first move, this prevents the computer from adding
        //a O to a grid cell before the game status modal is displayed       
        if(gameOver && !computerFirstMove){                  
            return;
        }
       
        let regX = new RegExp('X','gi');
        let regO = new RegExp('O', 'gi');         
        let twoOsNoXIndex = null, twoXsNoOIndex = null;
        let computerElement = null;

        //if there are no Os added to the grid, add a O to a random cell
        if( Object.values(gridData) && !Object.values(gridData).join('').match(regO) ){                    
            addToRandomCell();
            return;
        }

        //iterate over each inner array in answerArr
        for(let i = 0; i < answerArr.length; i++){
            let xCount = 0, oCount = 0, nullIndex = null;

            //count the number of Xs, Os, and empty cells in each inner array in answerArr
            for(let j = 0; j < answerArr[i].length; j++){
                if(gridData[answerArr[i][j]] === 'X'){
                    xCount++;
                }

                if(gridData[answerArr[i][j]] === 'O'){
                    oCount++;
                }

                if(!gridData[answerArr[i][j]]){                  
                    nullIndex = answerArr[i][j];
                }
            }

            //Math.floor(Math.random() * 8) returns a random integer from 0 to 7
            let randomIndex = Math.floor(Math.random() * 8);           

            //answerArr's index goes from 0 to 7
            //if there are 2 Os in a row and no X, indicate the index where a O should be added by the computer to win
            //added (i !== randomIndex) to randomize the index assignment and reduce the game's difficulty level
            if( (i !== randomIndex) && oCount === 2 && xCount === 0 && nullIndex ){
                twoOsNoXIndex = nullIndex;    
            //if there are 2 Xs in a row and no O, indicate the index where a O should be added by the computer to block                       
            }else if( (i !== randomIndex) && xCount === 2 && oCount === 0 && nullIndex ){
                twoXsNoOIndex = nullIndex;              
            }

            //computerFirstMove should always be false after computerMoves()
            setComputerFirstMove(false);
        }
        
        //if there are 2 Os in a row and no X, assign a O to gridData[twoOsNoXIndex] for the computer to win
        if(twoOsNoXIndex){          
            computerElement = document.getElementById(twoOsNoXIndex);  
    
            if(computerElement.firstChild.innerHTML === ''){               
                computerElement.firstChild.innerHTML = 'O';
                gridData[twoOsNoXIndex] = computerElement.firstChild.innerHTML;      
                setGridData({ ...gridData });                                                      
            }            
        //if there are 2 Xs in a row and no O, assign a O to gridData[twoOsNoXIndex] for the computer to block
        }else if(twoXsNoOIndex){          
            computerElement = document.getElementById(twoXsNoOIndex);  
    
            if(computerElement.firstChild.innerHTML === ''){               
                computerElement.firstChild.innerHTML = 'O';
                gridData[twoXsNoOIndex] = computerElement.firstChild.innerHTML;      
                setGridData({ ...gridData });                                                      
            }  
        //assign an O to a random cell if there aren't 2 Os in a row or 2 Xs in a row      
        }else {
            addToRandomCell();
        }    

        //if there are more than 3 Xs or more than 3 Os, call gameStatusUpdate()
        if( Object.values(gridData) && 
        ( (Object.values(gridData).join('').match(regX) && Object.values(gridData).join('').match(regX).length >= 3) || 
        ( Object.values(gridData).join('').match(regO) && Object.values(gridData).join('').match(regO).length) >= 3) ){                        
            gameStatsUpdate();
        }   
    }

    //check if game is over (win or tie) and update game status states
    const gameStatsUpdate = () => {       

        for(let i = 0; i < answerArr.length; i++) {
            //checks if every element in AnswerArr's i-th inner array is found in Object.keys(gridData)
            let containsGridCell = answerArr[i].every(element => {               
                return Object.keys(gridData).includes(element.toString());
            });           

            //if every element in AnswerArr's i-th inner array is found in Object.keys(gridData)
            //count the number of Xs and the number of Os found at the specified indexes 
            if(containsGridCell) {                            
                let xCount = 0, oCount = 0;

                for(let j = 0; j < answerArr[i].length; j++) {
                    if(gridData[answerArr[i][j]] === 'X'){
                        xCount++;
                    }

                    if(gridData[answerArr[i][j]] === 'O'){
                        oCount++;
                    }
                }

                //if X count === 3, update Player win stats
                if(xCount === 3) {                    
                    setAnimationActiveCells(answerArr[i]);
                    setPlayerScore(playerScore + 1);
                    setGameOverMsg('YOU WIN!!!'); 
                    lastWinner = 'Player';
                    setLastWinner('Player');
                    gameOver = true;
                    setGameOver(true);                    
                    break;
                //if O count === 3, update Computer win stats
                }else if(oCount === 3) {                   
                    setAnimationActiveCells(answerArr[i]);
                    setComputerScore(computerScore + 1);
                    setGameOverMsg('COMPUTER WINS!!!');
                    lastWinner = 'Computer';
                    setLastWinner('Computer');
                    gameOver = true;
                    setGameOver(true);
                    break;
                }
            }                            
        }

        //update Tie stats if 9 cells are selected and the game is not yet won     
        if(!gameOver && Object.keys(gridData).length === 9) {            
            setGameOverMsg("IT'S A TIE!!!");
            lastWinner = '';
            setLastWinner('');
            gameOver = true;
            setGameOver(true);            
        }
    }
    
    const gridCellOnClick = (event) => {       
        let elementId = event && event.target && event.target.id ? event.target.id : null;              

        if(gameOver){            
            return;
        }
       
        if(elementId){
            let playerElement = document.getElementById(elementId);
            let regX = new RegExp('X','gi');
            let regO = new RegExp('O', 'gi'); 
            
            if(playerElement.firstChild.innerHTML === '') {    
                //add an X to an empty clicked cell            
                playerElement.firstChild.innerHTML = 'X';  
                //store the user and computer selections on the grid, key -> elementID, value -> X or O                                 
                gridData[elementId] = playerElement.firstChild.innerHTML;      
                setGridData({ ...gridData });             
                
                //delay before the computer move is recorderd on the screen
                setTimeout(function(){ 
                    //call gameStatsUpdate() if there are 3 or more Xs or 3 or more Os in gridData
                    if( Object.values(gridData) && 
                    ( (Object.values(gridData).join('').match(regX) && Object.values(gridData).join('').match(regX).length >= 3) || 
                    ( Object.values(gridData).join('').match(regO) && Object.values(gridData).join('').match(regO).length) >= 3) ){                        
                        gameStatsUpdate();
                    }   

                    computerMoves();                                  
                    
                    //delay before the game status modal is displayed on the screen
                    setTimeout(function(){                
                        if(gameOver){                                     
                            gameStatusModalOpen = true;
                            setGameStatusModalOpen(true);            
                        }else{                            
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
                        gameOver={gameOver}
                        setGameOver={setGameOver}
                        resetAnimation={resetAnimation}
                        lastWinner={lastWinner}
                        computerMoves={computerMoves}                        
                        setComputerFirstMove={setComputerFirstMove}
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
                             lastWinner={lastWinner}
                             computerMoves={computerMoves}
                             setComputerFirstMove={setComputerFirstMove}
            />
        </div>
    );
}

export default TicTacToeGrid;