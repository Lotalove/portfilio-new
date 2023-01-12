import { cloneElement } from "react"
import classes from  "./chess.module.css"
import WhitePawn from "./pieces/whitePawn.png"
import BlackPawn from "./pieces/blackPawn.png"
import { Gamespace } from "./chess"
function onBoard (x,y){
    if(x<8 && x>=0 && y>=0 && y < 8){return true}
    else return false
}

function isOccupied(gameboard,space){
    var classList = document.getElementById(space[0].toString() + space[1].toString()).classList
    if(classList.length > 1){
        return [true ,classList[classList.length-1]]
       
    }
    else{
        return [false,undefined]
    }   
}

function causeCheck (gameboard,move,piece){
console.log(piece)
var pieces = []
var color = piece.color
var king 
console.log(pieces)
for(var r = 0 ; r < gameboard.length;r++){
    for(var c = 0 ; c <gameboard.length;c++){
        if(gameboard[r][c] !== 0 && gameboard[r][c].color !== color ) pieces.push(gameboard[r][c]) // find all pieces on the board 
        if (gameboard[r][c].type === "King" && gameboard[r][c].color === color ) king = gameboard[r][c] //find the king in the gameboard
    }   
}  
    gameboard[piece.position[0]][piece.position[1]] = 0
    piece.position = move
    gameboard[piece.position[0]][piece.position[1]] = piece

    var results = []
    pieces.forEach(piece=>{
        var validMoves = piece.getValidMoves(gameboard)
        validMoves.forEach(move=>{
            move.push(results)
        })
    })

}

function getMoveInfo(gameboard,move,piece){
var results = {isValid:undefined, occupied:undefined , occupiedBy:undefined}
results.isValid = onBoard(move[0],move[1]) 
 if (results.isValid === true) causeCheck(gameboard,move,piece) 
if(results.isValid == false) return results
var spaceOccupied = isOccupied(gameboard,move)
results.occupied = spaceOccupied[0]
results.occupiedBy = spaceOccupied[1]
return results
}

export class Piece {
constructor(type,color,position,isCapturable,id){
this.type = type
this.color = color
this.position = position
this.captured = false 
this.isCapturable = false
this.id = color+type+position[1]
this.turns = 0  

}
move(position){
   this.position = position 
   this.turns++  
}

filterMove(gameboard,move){
    var pieces = []
    var color = this.color
    var king 
    for(var r = 0 ; r < gameboard.length;r++){
        for(var c = 0 ; c < gameboard.length;c++){
            if(gameboard[r][c] !== 0 && gameboard[r][c].color !== this.color ) pieces.push(gameboard[r][c]) // find all pieces on the board 
            if (gameboard[r][c].type === "King" && gameboard[r][c].color === color ) king = gameboard[r][c] //find the king in the gameboard
        }   
    }
    console.log(pieces)
    var originalPos = this.position
    this.position = move
    var responses = [] 
    pieces.forEach(piece =>{
        var validMoves =  piece.getValidMoves(gameboard)
        validMoves.forEach(move=>{
            move.push(responses)
        })
    })

    responses.forEach(move=>{
            if (move[0] == king.position[0] && move[1] == king.position[1] ) return false  
    })

    this.position = originalPos 
    return true
}



getValidMoves(gameboard){
if(this.Captured == true) return []
switch(this.type){
    case "Pawn":
         var moves = this.getPawnMoves(gameboard)            
        break
    case "Rook":
        var moves = this.getRookMoves(gameboard)
        break
    case "Bishop":
        var moves = this.getBishiopMoves(gameboard)
        break
    case "Knight":
        var moves = this.getKnightMoves(gameboard)
        break
    case"Queen":
        var moves = this.getQueenMoves(gameboard)
        break      
    case"King":
        var moves = this.getKingMoves(gameboard)
        break
}
    return moves
}

getPawnMoves(gameboard){
    
    var moves = []
    if(this.color === "white"){
    var Potentialmoves = [[this.position[0]-1,this.position[1]],[this.position[0]-2,this.position[1]],[this.position[0]-1,this.position[1]-1],[this.position[0]-1,this.position[1]+1]]
    Potentialmoves.forEach((move,index)=>{Potentialmoves[index] = getMoveInfo(gameboard,move,this)})
    if(Potentialmoves[0].isValid && Potentialmoves[0].occupied == false ) moves.push([this.position[0]-1,this.position[1]])
    if(this.turns == 0 && Potentialmoves[0].occupied == false && Potentialmoves[1].isValid && Potentialmoves[1].occupied == false  ) moves.push([this.position[0]-2,this.position[1]])
    if(Potentialmoves[2].isValid && Potentialmoves[2].occupied && Potentialmoves[2].occupiedBy !== classes[this.color]) moves.push([this.position[0]-1,this.position[1]-1])
    if(Potentialmoves[3].isValid && Potentialmoves[3].occupied && Potentialmoves[3].occupiedBy !== classes[this.color])  moves.push([this.position[0]-1,this.position[1]+1])
}
if(this.color === "black"){
    var Potentialmoves = [[this.position[0]+1,this.position[1]],[this.position[0]+2,this.position[1]],[this.position[0]+1,this.position[1]+1],[this.position[0]+1,this.position[1]-1]]
    Potentialmoves.forEach((move,index)=>{Potentialmoves[index] = getMoveInfo(gameboard,move,this)})
    if(Potentialmoves[0].isValid && Potentialmoves[0].occupied == false )moves.push([this.position[0]+1,this.position[1]])
    if(this.turns == 0 && Potentialmoves[0].occupied == false && Potentialmoves[1].isValid && Potentialmoves[1].occupied == false )moves.push([this.position[0]+2,this.position[1]])
    if(Potentialmoves[2].isValid && Potentialmoves[2].occupied && Potentialmoves[2].occupiedBy !== classes[this.color])moves.push([this.position[0]+1,this.position[1]+1])
    if(Potentialmoves[3].isValid && Potentialmoves[3].occupied && Potentialmoves[3].occupiedBy !== classes[this.color])  moves.push([this.position[0]+1,this.position[1]-1])
    }
        return moves    
    }
getRookMoves(gameboard){
    var moves = []
    
    for(var i = 1 ; i<8 ; i++){
        var moveInfo = getMoveInfo(gameboard,[this.position[0]+i,this.position[1]],this)
        if(moveInfo.isValid == false) break
        
        if (moveInfo.occupiedBy == classes[this.color])break
        
        if(moveInfo.occupiedBy !== classes[this.color]){
            moves.push([this.position[0]+i,this.position[1]])
            if(moveInfo.occupiedBy !== undefined){
            break
            }
        }
    }
    
    for(var i = 1 ; i<8 ; i++){
        var moveInfo = getMoveInfo(gameboard,[this.position[0]-i,this.position[1]],this)
        if(moveInfo.isValid == false) break
        if (moveInfo.occupiedBy == classes[this.color]) break
    
        if(moveInfo.occupiedBy !== classes[this.color]){
            moves.push([this.position[0]-i,this.position[1]])
            if(moveInfo.occupiedBy !== undefined){
                break
                }
        }
        
        }
        for(var i = 1 ; i<8 ; i++){
            var moveInfo = getMoveInfo(gameboard,[this.position[0],this.position[1]+i],this)
        
            if(moveInfo.isValid == false) break

            if (moveInfo.occupiedBy == classes[this.color]) break
        
            if(moveInfo.occupiedBy !== classes[this.color]){
                moves.push([this.position[0],this.position[1]+i])
                if(moveInfo.occupiedBy !== undefined){
                    break
                    }
            }
            }
            for(var i = 1 ; i<8 ; i++){
                var moveInfo = getMoveInfo(gameboard,[this.position[0],this.position[1]-i],this)
                if(moveInfo.isValid == false) break
                
                if (moveInfo.occupiedBy == classes[this.color]) {
                    break
                }
                    if(moveInfo.occupiedBy !== classes[this.color]){
                    moves.push([this.position[0],this.position[1]-i])
                    if(moveInfo.occupiedBy !== undefined){
                        break
                        }
                }
        }
                return moves
            }
getBishiopMoves(gameboard){
    var moves = []
    
    for(var i = 1 ; i<8 ; i++){
        var moveInfo = getMoveInfo(gameboard,[this.position[0]+i,this.position[1]+i],this)
        if(moveInfo.isValid == false) break
        
        if (moveInfo.occupiedBy == classes[this.color])break
        
        if(moveInfo.occupiedBy !== classes[this.color]){
            moves.push([this.position[0]+i,this.position[1]+i])
            if(moveInfo.occupiedBy !== undefined){
            break
            }
        }
    }
    
    for(var i = 1 ; i<8 ; i++){
        var moveInfo = getMoveInfo(gameboard,[this.position[0]-i,this.position[1]-i],this)
        if(moveInfo.isValid == false) break
        if (moveInfo.occupiedBy == classes[this.color]) break
    
        if(moveInfo.occupiedBy !== classes[this.color]){
            moves.push([this.position[0]-i,this.position[1]-i])
            if(moveInfo.occupiedBy !== undefined){
                break
                }
        }
        
        }
        for(var i = 1 ; i<8 ; i++){
            var moveInfo = getMoveInfo(gameboard,[this.position[0]-i,this.position[1]+i],this)
        
            if(moveInfo.isValid == false) break

            if (moveInfo.occupiedBy == classes[this.color]) break
        
            if(moveInfo.occupiedBy !== classes[this.color]){
                moves.push([this.position[0]-i,this.position[1]+i])
                if(moveInfo.occupiedBy !== undefined){
                    break
                    }
            }
            }
            for(var i = 1 ; i<8 ; i++){
                var moveInfo = getMoveInfo(gameboard,[this.position[0]+i,this.position[1]-i],this)
                if(moveInfo.isValid == false) break
                
                if (moveInfo.occupiedBy == classes[this.color]) {
                    break
                }
                    if(moveInfo.occupiedBy !== classes[this.color]){
                    moves.push([this.position[0]+i,this.position[1]-i])
                    if(moveInfo.occupiedBy !== undefined){
                        break
                    }
                }
            }
             return moves
}

getKnightMoves(gameboard){
    var moves = []
    var Potentialmoves=[[this.position[0]+1,this.position[1]-2],[this.position[0]+2,this.position[1]+1],[this.position[0]+2,this.position[1]-1],[this.position[0]+1,this.position[1]+2],[this.position[0]-2,this.position[1]+1],[this.position[0]-2,this.position[1]-1],[this.position[0]-1,this.position[1]+2],[this.position[0]-1,this.position[1]-2]]
    Potentialmoves.forEach((move,index)=>{Potentialmoves[index].push(getMoveInfo(gameboard,move,this))})
    Potentialmoves.forEach((move,index)=>{
        if(move[2].isValid && move[2].occupiedBy !== classes[this.color]) {
            moves.push([move[0],move[1]])
}  
        })
    return moves
}
getQueenMoves(gameboard){
    var moves = []
    var series1 =  this.getBishiopMoves(gameboard)
    var series2 =  this.getRookMoves(gameboard)
    series1.forEach(move=>{moves.push(move)})
    series2.forEach(move=>{moves.push(move)})
    return moves
}
getKingMoves(gameboard){
    var moves = []
    var Potentialmoves = [[this.position[0]+1,this.position[1]],[this.position[0]-1,this.position[1]],[this.position[0]+1,this.position[1]+1],[this.position[0]+1,this.position[1]-1],[this.position[0]-1,this.position[1]+1],[this.position[0],this.position[1]+1],[this.position[0],this.position[1]-1],[this.position[0]-1,this.position[1]-1]]
    Potentialmoves.forEach((move,index)=>{
        Potentialmoves[index].push(getMoveInfo(gameboard,[move[0],move[1]],this))
    })

    Potentialmoves.forEach((move,index)=>{
        if(move[2].isValid && move[2].occupiedBy !== classes[this.color]) moves.push([move[0],move[1]])
    })

    return moves
}
}

