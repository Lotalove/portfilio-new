import { cloneElement } from "react"
import classes from  "./chess.module.css"
import WhitePawn from "./pieces/whitePawn.png"
import BlackPawn from "./pieces/blackPawn.png"


function onBoard (x,y){
    if(x<8 && x>=0 && y>=0 && y < 8){return true}
    else return false
}

function isOccupied(gameboard,space){
    var space = gameboard[space[0]][space[1]] 
    if (space === 0 ) return [false,undefined]

       
    if (space.props){
        var props = Object.values(space.props)
        if(props.length > 2){
            console.log(classes[props[props.length-1].color])
            return [true ,classes[props[props.length-1].color]]
        }
        else{
            return [false,undefined]
        }    
    }

    if(space.type){
        return [true,classes[space.color]]
    }

    
}

function getMoveInfo(gameboard,move,piece){
var results = {isValid:undefined, occupied:undefined , occupiedBy:undefined}
results.isValid = onBoard(move[0],move[1]) 
if(results.isValid == false) return results
var spaceOccupied = isOccupied(gameboard,move)
//console.log(spaceOccupied)
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


getValidMoves(gameboard){
if(this.captured === true) return []
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

