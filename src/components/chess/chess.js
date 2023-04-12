import classes from  "./chess.module.css"
import { Menu } from "../dropdown"
import React, { PureComponent, useState} from "react"
import {Piece} from "./pieces"
import whitePawn from "./pieces/whitePawn.png"
import blackPawn from "./pieces/blackPawn.png"
import CheckMoveAudio from "./checkmove.wav"
import moveAudio from "./move.wav"


var Board = [
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0]
 ]

 var wPawn1 = new Piece("Pawn", "white", [6, 0], "P")
 var wPawn2 = new Piece("Pawn", "white", [6, 1], "P")
 var wPawn3 = new Piece("Pawn", "white", [6, 2], "P")
 var wPawn4 = new Piece("Pawn", "white", [6, 3], "P")
 var wPawn5 = new Piece("Pawn", "white", [6, 4], "P")
 var wPawn6 = new Piece("Pawn", "white", [6, 5], "P")
 var wPawn7 = new Piece("Pawn", "white", [6, 6], "P")
 var wPawn8 = new Piece("Pawn", "white", [6, 7], "P")
 var wRook1 = new Piece("Rook", "white", [7, 0], "R")
 var wRook2 = new Piece("Rook", "white", [7, 7], "R")
 var wQueen = new Piece("Queen", "white", [7, 3], "Q")
 var wKing = new Piece("King", "white", [7, 4], "K")
 var wBishop1 = new Piece("Bishop", "white", [7, 2], "B")
 var wBishop2 = new Piece("Bishop", "white", [7, 5], "B") //7,5
 var wKnight1 = new Piece("Knight", "white", [7, 1], "Kn")
 var wKnight2 = new Piece("Knight", "white", [7, 6], "Kn") // 7,6
 
 var bPawn1 = new Piece("Pawn", "black", [1, 0], "P")
 var bPawn2 = new Piece("Pawn", "black", [1, 1], "P")
 var bPawn3 = new Piece("Pawn", "black", [1, 2], "P")
 var bPawn4 = new Piece("Pawn", "black", [1, 3], "P")
 var bPawn5 = new Piece("Pawn", "black", [1, 4], "P")
 var bPawn6 = new Piece("Pawn", "black", [1, 5], "P")
 var bPawn7 = new Piece("Pawn", "black", [1, 6], "P")
 var bPawn8 = new Piece("Pawn", "black", [1, 7], "P")
 var bRook1 = new Piece("Rook", "black", [0, 0], "R")
 var bRook2 = new Piece("Rook", "black", [0, 7], "R")
 var bQueen = new Piece("Queen", "black", [0, 3], "Q")
 var bKing = new Piece("King", "black", [0, 4], "K")
 var bBishop1 = new Piece("Bishop", "black", [0, 2], "B")
 var bBishop2 = new Piece("Bishop", "black", [0, 5], "B")
 var bKnight1 = new Piece("Knight", "black", [0, 1], "Kn")
 var bKnight2 = new Piece("Knight", "black", [0, 6], "Kn")

 var pieces = [wPawn1,wPawn2,wPawn3,wPawn4,wPawn5,wPawn6,wPawn7,wPawn8,
    wRook1,wRook2,wQueen,wKing,wBishop1,wBishop2,wKnight1,wKnight2,
    bPawn1,bPawn2,bPawn3,bPawn4,bPawn5,bPawn6,bPawn7,bPawn8,
    bRook1,bRook2,bQueen,bKing,bBishop1,bBishop2,bKnight1,bKnight2]

    pieces.forEach(piece=>{
        Board[piece.position[0]] [piece.position[1]] = piece
    })
 
function toIntArray(string){
        return string = string.split("").map(Number)
     }

function copyArray(arr){
        var new_arr = arr.slice(0);
        for(var i = new_arr.length; i--;)
            if(new_arr[i] instanceof Array)
                new_arr[i] = copyArray(new_arr[i]);
        return new_arr;
    }

 export function Chesspage (){
    var [turn,setTurn] =  useState(0)
    var [inCheck,setCheck] = useState(false)
    return(
        <div id={classes.page}>
            <Menu></Menu>
            <Turndisplay turn={turn} Check = {inCheck}></Turndisplay>
            <Chessboard turn = {turn} setTurn={setTurn} setCheck ={setCheck}></Chessboard>
        </div>
    )
}

function Turndisplay(props){
    var highlight = props.Check === false? {border:"medium solid white"}: {border:"medium solid red"}
    return(
        <div id={classes.turnDisplay}>
            <div className={classes.leftMenu}>
                <img 
                style={props.turn % 2 == 0? highlight:null} 
                src={whitePawn}>    
                </img>
            </div>
            <div 
            className={classes.rightMenu}>
    
            <img
            style={props.turn % 2 !== 0? highlight:null} 
            src={blackPawn}>
            </img>
            </div>
        </div>
    )
}
function Chessboard (props){
    var [inCheck, setCheck]  = useState(false) 
    var [winner,setWinner] = useState([false,undefined])
    var [turn,setTurn] = useState(props.turn)
    var whosTurn = props.turn % 2 == 0 ? "white": "black"   
    const [gameboard,updateBoard] = useState(initGame())  

    function PromotePawn(piece){
        piece.type = "Queen"
    }    

    function Castle(king,side){
        if(side === "KS"){
        var rook = Board[king.position[0]][king.position[1]+3]            
        var kingMove = [king.position[0],king.position[1]+2]
        var rookMove = [king.position[0],kingMove[1]-1]
        movePiece(king,kingMove)
        movePiece(rook,rookMove)
    }
    if(side === "QS"){
        var rook = Board[king.position[0]][king.position[1]-4]            
        var kingMove = [king.position[0],king.position[1]-2]
        var rookMove = [king.position[0],kingMove[1]+1]
        movePiece(king,kingMove)
        movePiece(rook,rookMove)
    }

    }
    function canCastle (king){
       if (king.turns === 0){
        var Rooks = [[king.position[0],king.position[1]+3],[king.position[0],king.position[1]-4]]
        Rooks.forEach((rook,index)=>{
            Rooks[index] = Board[rook[0]][rook[1]]
        })
        console.log(Rooks)
    // King side Castle
        if (Rooks[0].type === "Rook" && Rooks[0].turns === 0){
            var obstruction = false
            for (var i = 1 ; i < 2 ; i++){
                if(Board[king.position[0]][king.position[1]+i] !== 0) obstruction = true        
                }
            if(!obstruction) {
                console.log("can castle to  King side" )
                var space = [king.position[0],king.position[1]+2]
                var element = document.getElementById(space[0].toString()+ space[1].toString()) 
                var hint = document.createElement("div")
                hint.className = classes.capturehint
                hint.addEventListener("click",()=>{
                Castle(king,"KS") 
            })
                element.appendChild(hint)
               console.log(element)
            }
       }
       //Queen side Castle
       if (Rooks[1].type === "Rook" && Rooks[1].turns === 0){
        var obstruction = false
        for (var i = 1 ; i < 3 ; i++){
            if(Board[king.position[0]][king.position[1]-i] !== 0) obstruction = true
        }

        if (!obstruction){ 
            console.log("can castle to Queen side")
            var space = [king.position[0],king.position[1]-2]
                var element = document.getElementById(space[0].toString()+ space[1].toString()) 
                var hint = document.createElement("div")
                hint.className = classes.capturehint
                hint.addEventListener("click",()=>{
                Castle(king,"QS") 
            })
                element.appendChild(hint)
               console.log(element)
        }
            
    }
        
    }
}
    function isCheck(color,gameBoard){
        var inCheck = false
        var validMoves 
        pieces.forEach(piece =>{
            if(color === "black"){
                if(piece.color === "white" && piece.captured === false){
                    var validmoves = piece.getValidMoves(gameBoard)
               //     console.log("valid moves for " + piece.type + " are " + validmoves)
                    for(var i = 0 ; i < validmoves.length ; i++ ){
                        if(validmoves[i][0] === bKing.position[0] && validmoves[i][1] === bKing.position[1]  ) {
                            inCheck = true
                            return inCheck           
                        } 
                    }
                }        
            }

            else if(color === "white"){
                if(piece.color === "black" && piece.captured === false){
                    var validmoves = piece.getValidMoves(gameBoard)
                for(var i = 0 ; i < validmoves.length ; i++ ){
                    if(validmoves[i][0] === wKing.position[0] && validmoves[i][1] === wKing.position[1]) {
                        inCheck = true
                        return inCheck
                    }
                }
            }
            }
        })
        return inCheck
    }

    function isMate(color){
        var availablemoves= []
        pieces.forEach(piece=>{
            if (piece.color === color){
                if (availablemoves.length >0) return false
                else{
                    var validMoves = piece.getValidMoves(Board)
                    validMoves = filterMoves(piece,validMoves)
                    validMoves.forEach(move=>{
                        availablemoves.push(move)
                    })
            }
            }
        })

        if (availablemoves.length >0) return false
        else {
            var winnerColor = color === "black" ? "white":"black"
            setWinner([true,winnerColor])
            return true}
    
    }

    function filterMoves (piece,moves){
        var filteredMoves = []
        for (var i = 0; i < moves.length;i++){
            var tempBoard = copyArray(Board)
            var originalPos = piece.position
            var move = moves[i]
            var ogSpace = Board[move[0]][move[1]] 
            tempBoard[piece.position[0]][piece.position[1]] = 0
            piece.position = move
            if (ogSpace.type) ogSpace.captured = true
            tempBoard[move[0]][move[1]] = piece
            var causesCheck = isCheck(piece.color,tempBoard)
            if(!causesCheck) filteredMoves.push(move) 
            piece.position = originalPos
            tempBoard[originalPos[0]][originalPos[1]] = piece
            if (ogSpace.type) ogSpace.captured = false
            tempBoard[move[0]][move[1]] = ogSpace
        }
    
        return filteredMoves
    }


    function clearMoves (){
        var moves = document.getElementsByClassName(classes.capturehint)
        moves = Array.from(moves)
        moves.forEach(move=>{
            move.remove()
        })
    }

  function movePiece (piece,newPos){ 
        var moveaudio = new Audio(moveAudio)
        moveaudio.play()
        Board[piece.position[0]][piece.position[1]] = 0
        if(Board[newPos[0]][newPos[1]] !== 0 ) Board[newPos[0]][newPos[1]].captured = true 
        piece.move(newPos)
        Board[newPos[0]][newPos[1]] = piece
        props.setTurn(turn+1)
        setTurn(turn+1)
        clearMoves()
        if (piece.type === "Pawn" && newPos[0] === 0 || piece.type === "Pawn" && newPos[0] === 7) PromotePawn(piece)
        var color = piece.color === "black" ? "white" : "black"
        var inCheck = isCheck(color,Board)
        props.setCheck(inCheck)
        if (inCheck) isMate(color)
    }
    function clickHandler (event){
        clearMoves()
        var PiecePos = toIntArray(event.target.id) 
        var piece = Board[PiecePos[0]][PiecePos[1]]
        var validMoves = piece.getValidMoves(Board)

        validMoves = filterMoves(piece,validMoves)
        validMoves.forEach(move=>{
        var element = document.getElementById(move[0].toString() + move[1].toString())
            var hint = document.createElement("div")
            hint.className = classes.capturehint
            hint.addEventListener("click",()=>{
                var newPos = move
                var Pos = toIntArray(event.target.id) 
                var movedPiece = Board[Pos[0]][Pos[1]]
                movePiece(movedPiece,newPos) 
            })
            element.appendChild(hint)
        })  
        if (piece.type === "King") canCastle(piece)
    }    
    
    function initGame(){
    var rows = []       
    for(var r = 0; r<8;r++){
        var row = []   
        for(var col = 0; col<8;col++){
            var space = Board[r][col]
            if( space == 0) {
                row.push(<Gamespace row = {r} col={col} ></Gamespace>)
            }
            else if (space.color == whosTurn) {
                row.push(<Gamespace onClick={clickHandler} row = {r} col={col} piece = {space}></Gamespace>)
           }
           else if (space.color !== whosTurn){
            row.push(<Gamespace  row = {r} col={col} piece = {space}></Gamespace>)
           }
        }
           rows.push(row)
        }
        return rows 
    }

    return(
        <div id={classes.gameboard}>
            {winner[0] === true ? <WinScreen isMate = {winner}></WinScreen>:null}
             {initGame()} 
             </div>
    )
}


function Gamespace (props){
    var Piece = props.piece
    var color = props.row + props.col
    color = color % 2 === 0 ? "#FFFFFF": "darkgreen"
    var classList = [classes.gamespace]
    if(props.piece) classList.push(classes[props.piece.type],classes[props.piece.color])
    if(props.isValidMove){
        classList.push(classes.validmove)
    }
    classList = classList.join(" ") 
    return (
        <div
        id = {props.row.toString() + props.col.toString()}
        className={classList}
        style={{backgroundColor:color}}
        onClick ={props.onClick}
        ></div>
    )
}


function WinScreen (props){
    var [visible,setVisibility] = useState(true)

    return(
        
        <div id = {classes.win_screen} style={{display:visible === true ? "flex":"none"}}>
            <p> {props.isMate[1].toUpperCase()} is the winner !</p>
            <div id={classes.menu_buttons}>
            <button className={classes.menu_button} onClick={props.resetFunction}>Restart</button>
            <button className={classes.menu_button} onClick={()=>{setVisibility(false)}}>View Board</button>
            </div>
        </div>
    )
}