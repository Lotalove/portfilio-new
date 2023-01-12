
    var renderPieces =  ()=>{ pieces.forEach(piece=>{
        var movePiece= (position)=>{
            clearMoves() 
            var oldSpace = document.getElementById(piece.position[0].toString() + piece.position[1].toString())
            oldSpace.classList = classes.gamespace
            var clone = oldSpace.cloneNode()
            oldSpace.replaceWith(clone) // clearing old position
            boardMatrix[piece.position[0]][piece.position[1]]._owner.child.stateNode = clone
            piece.move(position)
            var newPos = document.getElementById(piece.position[0].toString() + piece.position[1].toString() )
            var newPosClone = newPos.cloneNode()
            if(newPos.classList.length >1){
                var capturedPiece = boardMatrix[piece.position[0]][piece.position[1]].props.piece
                capturedPiece.Captured = true 
                console.log(capturedPiece)
                newPosClone.classList = classes.gamespace
            }
            
            newPosClone.classList.add(classes[piece.type],classes[piece.color])
            newPos.replaceWith(newPosClone)
            boardMatrix[piece.position[0]][piece.position[1]]._owner.child.stateNode = newPosClone
            newPosClone.addEventListener("click",clickController)
            setTurn(turn+=1)
            whosTurn = turn %2 == 0 ? "white": "black"
        }
        var clickController = ()=>{
            if (piece.color !== whosTurn || piece.Captured == true) return
            clearMoves()
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
        boardMatrix[piece.position[0]][piece.position[1]] = <Gamespace clickHandler = {clickController} row= {piece.position[0]} num={piece.position[1]} piece={piece}> </Gamespace>  
    })
}