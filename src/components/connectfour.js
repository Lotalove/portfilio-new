import classes from "../styles/connect.module.css"
import React, { useState } from "react"
import {Navbar} from "./navbar"

var boardMatrix =[ 
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]]

export function Gameboard (props){
    var [turn,setTurn] = useState(0)
    var [won,setWin] = useState([false,"none"])

    function whosTurn(){
        return turn %2 === 0? "red": "yellow"
    }

    var clickHandler = async(position)=>{
        var clickedColumn = document.getElementById(classes.gameboard).children[position]
        
        for(var row = 5;row >= 0 ; row-- ){
            // if the gamespace at the row is empty
            if( boardMatrix[row][position]=== 0){
                var gamespace = clickedColumn.children[row]
                boardMatrix[row][position] =  whosTurn() //change the  gameMatric
                gamespace.classList.add(classes[whosTurn()])
                setTurn(turn+=1)
                isWinner([row,position])
               break  
            }
        }
    }
    
    var isWinner = async(move)=>{
    if(turn>6){
        var inRow =1
        var currentState = boardMatrix[move[0]][move[1]] 
        //check verical win
        if(move[0]<=2){
            for(var row = 1 ; move[0]+row <6;row++){
                if(boardMatrix[move[0]+row][move[1]] === currentState){
                    inRow ++
                    if (inRow == 4){
                        setWin([true,currentState])
                        return
                    }
                }
                else{
                    inRow = 1 
                    break
                }
            }        
        }             
        //check if horizontal win
            for(var col = 1 ; move[1]+col < 7;col++){
                if(boardMatrix[move[0]][move[1]+col] === currentState){
                    inRow++
                    if(inRow == 4){
                        setWin([true,currentState])
                        return
                    }
                }
                else{break}                
            }   
            
            for(var col = 1 ; move[1]-col >= 0;col++){
                if(inRow!= 4 && boardMatrix[move[0]][move[1]-col] === currentState){
                    inRow++
                }
                else if(inRow == 4){
                    setWin([true,currentState])
                    return
                }
                else{break}
            }
            inRow = 1

            // check diagnal
            for(var c = 1 ; move[0]-c >= 0 ; c++){
               if(inRow!== 4 && [move[1]+c] <=6  && boardMatrix[move[0]-c][move[1]+c] === currentState){
                inRow++ 
                }
                else{break}
                if (inRow === 4){
                    setWin([true,currentState])
                    return
                }
            }

            for(var c = 1 ; move[0]+c <= 5 ; c++){
                if( inRow!== 4 && [move[1]-c] >=0 && boardMatrix[move[0]+c][move[1]-c] === currentState){
                    inRow++  
                    }
                    else{break}
                    if (inRow >= 4){
                        setWin([true,currentState])
                        return
                    }            
            }
            inRow = 1

            for(var c = 1 ; move[0]-c >= 0 ; c++){
                if( [move[1]-c] >=0 && boardMatrix[move[0]-c][move[1]-c] === currentState){
                    inRow++    
                    }
                    else{break}
                    if (inRow >= 4){
                        setWin([true,currentState])
                        return
                    }            
            }

            for(var c = 1 ; move[0]+c <= 5 ; c++){
                if([move[1]+c] <=6  && boardMatrix[move[0]+c][move[1]+c] === currentState){
                    inRow++
                    }
                    else{break}
                    if (inRow >= 4){
                        setWin([true,currentState])
                        return
                    }            
            }
        } 
    }
    var resetGame = ()=>{
        var gameboardElements = document.getElementsByClassName(classes.gamespace)
        for(var space = 0 ; space < gameboardElements.length ; space++){
                gameboardElements[space].classList= [classes.gamespace]
            }
            
            for(var columns = 0; columns < 6;columns++){
                for(var row=0 ; row <=6;row ++){
                    boardMatrix[columns][row] = 0
                }
            }
            
        
        setWin([false,"none"])
    }

    return(
        <div style={{overflowY :"hidden", height:"90vh"}}>
            <Navbar></Navbar> 
            <TurnView turn={turn}></TurnView>
            <div id={classes.board_container}>
                <div id={classes.gameboard}> 
                {won[0] === true ? <WinScreen resetFunction ={resetGame} winner={won[1]}></WinScreen>:null} 
                    <Column clickHandler={clickHandler} num={0}/>
                    <Column clickHandler={clickHandler} num={1}/>
                    <Column clickHandler={clickHandler} num={2}/>
                    <Column clickHandler={clickHandler} num={3}/>
                    <Column clickHandler={clickHandler} num={4}/>
                    <Column clickHandler={clickHandler} num ={5}/>
                    <Column clickHandler={clickHandler} num={6}/>
                </div>
            </div>
        </div>
    )
}

function Gamespace (props){
    var gamespace = <div className={classes.gamespace} id={"gamespace" + "row" + props.row + "column" + props.column }></div>
    return(
        gamespace
    )
    
}
function Column (props){  
    
    return(
        <div className= {classes.column} onClick={()=>{props.clickHandler(props.num)}}>
            
            <Gamespace row ={0} column= {props.num} />
            <Gamespace row ={1} column= {props.num} />
            <Gamespace row ={2} column= {props.num} />
            <Gamespace row ={3} column= {props.num} />
            <Gamespace row ={4} column= {props.num} />
            <Gamespace row ={5} column= {props.num} />
        </div>
    )
}

function TurnView(props){
    var color = props.turn %2 == 0 ? "red":"yellow"
    return(
        <div id={classes.turn_viewer}>
            <div class={classes.gamespace + " " + classes.red} style={{border:color === "red"? "5px solid white":"none", backgroundColor:"red"}}></div>
            <div class={classes.gamespace + " " + classes.yellow} style={{border:color === "yellow"? "5px solid white":"none", backgroundColor:"yellow"}}></div>
        </div>
    )
}

function WinScreen (props){
    var [visible,setVisibility] = useState(true)
    return(
        
        <div id = {classes.win_screen} style={{display:visible=== true? "flex":"none"}}>
            <p><span style={{color:props.winner=="red"? "red":"yellow"}}>{props.winner=="red"? "Red":"Yellow"}</span> is the winner !</p>
            <div id={classes.menu_buttons}>
            <button className={classes.menu_button} onClick={props.resetFunction}>Restart</button>
            <button className={classes.menu_button} onClick={()=>{setVisibility(false)}}>View Board</button>
            </div>
        </div>
    )
}