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

function getMoveInfo(gameboard,move){
var results = {isValid:undefined, occupied:undefined , occupiedBy:undefined}
results.isValid = onBoard(move[0],move[1]) 
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
this.isCapturable = false
this.id = color+type+position[1]
this.turns = 0
}
move(position){
   this.position = position 
   this.turns++  
}
getValidMoves(gameboard){
    console.log(this.type)
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
    Potentialmoves.forEach((move,index)=>{Potentialmoves[index] = getMoveInfo(gameboard,move)})
    if(Potentialmoves[0].isValid && Potentialmoves[0].occupied == false ) moves.push([this.position[0]-1,this.position[1]])
    if(this.turns == 0 && Potentialmoves[1].isValid && Potentialmoves[1].occupied == false ){moves.push([this.position[0]-2,this.position[1]]); console.log(Potentialmoves[1].occupied)}
    if(Potentialmoves[2].isValid && Potentialmoves[2].occupied && Potentialmoves[2].occupiedBy !== classes[this.color]) moves.push([this.position[0]-1,this.position[1]-1])
    if(Potentialmoves[3].isValid && Potentialmoves[3].occupied && Potentialmoves[3].occupiedBy !== classes[this.color])  moves.push([this.position[0]-1,this.position[1]+1])
}
if(this.color === "black"){
    var Potentialmoves = [[this.position[0]+1,this.position[1]],[this.position[0]+2,this.position[1]],[this.position[0]+1,this.position[1]+1],[this.position[0]+1,this.position[1]-1]]
    Potentialmoves.forEach((move,index)=>{Potentialmoves[index] = getMoveInfo(gameboard,move)})
    if(Potentialmoves[0].isValid && Potentialmoves[0].occupied == false )moves.push([this.position[0]+1,this.position[1]])
    if(this.turns == 0 && Potentialmoves[1].isValid && Potentialmoves[1].occupied == false )moves.push([this.position[0]+2,this.position[1]])
    if(Potentialmoves[2].isValid && Potentialmoves[2].occupied && Potentialmoves[2].occupiedBy !== classes[this.color])moves.push([this.position[0]+1,this.position[1]+1])
    if(Potentialmoves[3].isValid && Potentialmoves[3].occupied && Potentialmoves[3].occupiedBy !== classes[this.color])  moves.push([this.position[0]+1,this.position[1]-1])
    }
        return moves    
    }
getRookMoves(gameboard){
    var moves = []
    
    for(var i = 1 ; i<8 ; i++){
        var moveInfo = getMoveInfo(gameboard,[this.position[0]+i,this.position[1]])
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
        var moveInfo = getMoveInfo(gameboard,[this.position[0]-i,this.position[1]])
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
            var moveInfo = getMoveInfo(gameboard,[this.position[0],this.position[1]+i])
        
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
                var moveInfo = getMoveInfo(gameboard,[this.position[0],this.position[1]-i])
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
        var moveInfo = getMoveInfo(gameboard,[this.position[0]+i,this.position[1]+i])
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
        var moveInfo = getMoveInfo(gameboard,[this.position[0]-i,this.position[1]-i])
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
            var moveInfo = getMoveInfo(gameboard,[this.position[0]-i,this.position[1]+i])
        
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
                var moveInfo = getMoveInfo(gameboard,[this.position[0]+i,this.position[1]-i])
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
            console.log(moves)
                return moves
}

getKnightMoves(gameboard){
    var moves = []
    var Potentialmoves=[[this.position[0]+1,this.position[1]-2],[this.position[0]+2,this.position[1]+1],[this.position[0]+2,this.position[1]-1],[this.position[0]+1,this.position[1]+2],[this.position[0]-2,this.position[1]+1],[this.position[0]-2,this.position[1]-1],[this.position[0]-1,this.position[1]+2],[this.position[0]-1,this.position[1]-2]]
    Potentialmoves.forEach((move,index)=>{Potentialmoves[index].push(getMoveInfo(gameboard,move))})
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
        Potentialmoves[index].push(getMoveInfo(gameboard,[move[0],move[1]]))
    })

    Potentialmoves.forEach((move,index)=>{
        if(move[2].isValid && move[2].occupiedBy !== classes[this.color]) moves.push([move[0],move[1]])
    })

    return moves
}
}

