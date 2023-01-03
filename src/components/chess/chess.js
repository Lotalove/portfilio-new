import classes from  "./chess.module.css"
import { Menu } from "../dropdown"
import React, { cloneElement, useEffect, useState, createRef } from "react"
import {Piece} from "./pieces"
import whitePawn from "./pieces/whitePawn.png"
import blackPawn from "./pieces/blackPawn.png"

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
var wBishop2 = new Piece("Bishop", "white", [7, 5], "B")
var wKnight1 = new Piece("Knight", "white", [7, 1], "Kn")
var wKnight2 = new Piece("Knight", "white", [7, 6], "Kn")

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

var boardMatrix = [
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0]
 ]
 
 for(var row = 0; row<8;row++){
    for(var col = 0; col<8;col++){
 
         var Space = <Gamespace  row={row} num={col}/>
         boardMatrix[row][col] = Space
    }}


 function toIntArray(string){
    return string = string.split("").map(Number)
 }

export function Chesspage(){
    return(
        <div id={classes.page}>
        <Menu/>
        <Chessboard></Chessboard>
        </div>
    )
}

function Chessboard(props){
    
    var [turn,setTurn] = useState(0)
    var whosTurn = "white"
    // finds all elements with class name validmove and removes event listener and class name 
    var clearMoves = ()=>{
        var moves = document.getElementsByClassName(classes.validmove)  
        moves = Array.from(moves)
        moves.forEach(move=>{
            move.classList.remove(classes.validmove)
            var clone =move.cloneNode()
            move.replaceWith(clone)
            var moveArr = toIntArray(move.id)
            boardMatrix[moveArr[0]][moveArr[1]]._owner.child.stateNode = clone 
        })
        moves = document.getElementsByClassName(classes.capturehint)
        moves = Array.from(moves)
        moves.forEach(move=>{
            var parent = move.parentNode
            move.remove()
            var clone =parent.cloneNode()
        })
        }

    var renderPieces =  ()=>{ pieces.forEach(piece=>{
        var movePiece= async (position)=>{
            clearMoves() 
            var oldSpace = document.getElementById(piece.position[0].toString() + piece.position[1].toString())
            oldSpace.classList = classes.gamespace
            var clone = oldSpace.cloneNode()
            oldSpace.replaceWith(clone) // clearing old position
            boardMatrix[piece.position[0]][piece.position[1]]._owner.child.stateNode = clone
             piece.move(position)
            var newPos = document.getElementById(piece.position[0].toString() + piece.position[1].toString() )
            var newPosClone = newPos.cloneNode()
            if(newPosClone.classList.length >1)newPosClone.classList = [classes.gamespace]
            newPosClone.classList.add(classes[piece.type],classes[piece.color])
            newPos.replaceWith(newPosClone)
            boardMatrix[piece.position[0]][piece.position[1]]._owner.child.stateNode = newPosClone
            newPosClone.addEventListener("click",clickController)
            setTurn(turn+=1)
            whosTurn = turn %2 == 0 ? "white": "black"
        }
        var clickController = ()=>{
            clearMoves()
            if(piece.color == whosTurn){
            var validMoves = piece.getValidMoves(boardMatrix)
                validMoves.forEach(move=>{
                var element =  document.getElementById(move[0].toString() + move[1].toString())
                if(element.classList.length > 1){
                    var hint = document.createElement("div")
                    hint.classList.add(classes.capturehint)
                    element.appendChild(hint)
                    hint.addEventListener("click",()=>{movePiece(move)})
                }
                 else {
                    element.classList.add(classes.validmove)
                    element.addEventListener("click",()=>{movePiece(move)})
                 }
                
                })
        }
        }
        boardMatrix[piece.position[0]][piece.position[1]] = <Gamespace clickHandler = {clickController} row= {piece.position[0]} num={piece.position[1]} piece={piece}> </Gamespace>  
    })
}
    return(
        <div id={classes.gameContainer}>
        <Turndisplay turn ={turn}></Turndisplay>
        <div id={classes.gameboard}>
            {boardMatrix}
            {renderPieces()}
        </div>
        </div>
    )
}

export function Gamespace(props){
    var num = props.row+props.num
    var color = num % 2 === 0 ? "white": "darkgreen"
    var classList = [classes.gamespace]
    if(props.piece) classList.push(classes[props.piece.type],classes[props.piece.color])
    if(props.isValidMove){
        classList.push(classes.validmove)
    }
    classList = classList.join(" ")
    var gamespace = <div id ={props.row.toString()+props.num} className={classList} style={{backgroundColor:color}} onClick={props.clickHandler?props.clickHandler:null}></div> 
    boardMatrix[props.row][props.num] = gamespace
    return(
        gamespace
    )
}

function Turndisplay(props){
var highlight = {border:"medium solid white"}
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