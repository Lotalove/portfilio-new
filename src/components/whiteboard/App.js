import classes from './whiteboard.module.css'
import {useState } from 'react'
import { FontDropdown } from './fonts'
import { FontSize } from './fonts'
import {ReactComponent as Bold} from './icons/bold.svg'
import {ReactComponent as Italic} from './icons/italic.svg'
import {ReactComponent as Bin} from './icons/bin.svg'
import { Navigate, useNavigate } from 'react-router-dom'

import { Menu } from './menus'
import { eventWrapper } from '@testing-library/user-event/dist/utils'

var OperationManager = {
  CurrentTool :"pencil" ,
  strokeWidth:5 ,
  CurentPosition:{x:null,y:null},
  CurrentColor:"Black",
  FontFamily: "Helvetica",
  FontSize: "16px"
}

function Dropdown(props){
  return(
    <div>
      <props.icon onClick={()=>{
        var DP = document.getElementById(classes[props.name])
        DP.classList.toggle(classes.open)
        if(props.clickBehavior) props.clickBehavior()
        }} />
      <div className={classes.dropdownContent} id={classes[props.name]}>
        <div className={classes.dropdown}>
        {props.content}
        </div>
      </div>
    </div>
    
  )
  }
  
var InsertDrop = <div className={classes.dropdown}>
<p>Add Picture</p>
</div> 

function TextBox(props){  

  var xpos = props.position.x > window.innerWidth -128 ?window.innerWidth-200:props.position.x 

    return(
      <div >
        <div  id={classes.textSettings}>
          <FontDropdown changeHandler={(event)=>{OperationManager.FontFamily = event.target.value}}/>
          <FontSize changeHandler={(event)=>{OperationManager.FontSize = event.target.value +"px"}}/>
          <div style={{alignSelf:"center"}}>
          <Bold />
          <Italic/>
          <Bin onClick={()=>{
            props.textFunctions.updateOverlay(null)
          }}/>
          </div>
      </div>
      <input id={classes.textBox}  style={{top:props.position.y,left:xpos}}  type='text' 
      onKeyDown={(e)=>{
      if (e.keyCode === 13) {
        var ctx = document.getElementById(classes.board)
        ctx= ctx.getContext("2d")
        var yComponent= props.position.y
        var xComponent = props.position.x
        ctx.font =  OperationManager.FontSize+ " " + OperationManager.FontFamily;
        ctx.fillStyle = OperationManager.CurrentColor
        ctx.fillText(e.target.value, xComponent,yComponent);
        props.textFunctions.save()    
        props.textFunctions.setActivityS(false)
        props.textFunctions.updateOverlay(null)

      }
    }}></input>
    </div>
    
  )
}

function Canvas(props){
  var [overlayedElements,updateOverlay] = useState(null)
  var [isTextboxActive,setTextboxActive] = useState(true)
  
  function drawUploaded(image,cordinates){
    var canvas = document.getElementById(classes.board)
      canvas = canvas.getContext("2d")
      var imageX = cordinates.x - (image.width/2) 
      var imageY = cordinates.y - (image.height/2) 
      canvas.drawImage(image,imageX,imageY)
      saveCanvas()
  }
  
  function saveCanvas(){
    var canvas = document.getElementById(classes.board)
    canvas = canvas.toDataURL("image/png",1.0)
    props.updateFunction(canvas)
  }

  function OperationHandler(event){ 
    function finishDrawing(){
      clearInterval(drawing)
      document.removeEventListener("pointerup",finishDrawing)
      saveCanvas()
    } 
    
    switch (OperationManager.CurrentTool){
      case "pencil":
        var p1 = OperationManager.CurentPosition
        var ctx = document.getElementById(classes.board) 
        ctx = ctx.getContext("2d") 
        var drawing = setInterval(()=>{ 
        ctx.beginPath()
        ctx.moveTo(p1.x,p1.y)
        ctx.lineCap = "round"
         ctx.lineJoin = 'round'
        ctx.lineTo(OperationManager.CurentPosition.x ,OperationManager.CurentPosition.y )
        ctx.lineWidth = OperationManager.strokeWidth 
        ctx.strokeStyle = OperationManager.CurrentColor
        ctx.stroke()
        p1 = OperationManager.CurentPosition
         
        },0)   
        document.addEventListener("pointerup", finishDrawing)
        break ;
      case "eraser": 
      var p1 = OperationManager.CurentPosition
      var ctx = document.getElementById(classes.board) 
      ctx = ctx.getContext("2d") 
      var drawing = setInterval(()=>{ 
      ctx.beginPath()
      ctx.moveTo(p1.x,p1.y)
      ctx.lineCap = "round"
       ctx.lineJoin = 'round'
      ctx.lineTo(OperationManager.CurentPosition.x ,OperationManager.CurentPosition.y )
      ctx.lineWidth = OperationManager.strokeWidth 
      ctx.strokeStyle = "#FFFFFF"
      ctx.stroke()
      p1 = OperationManager.CurentPosition
       
        },0)

        document.addEventListener("pointerup",finishDrawing)
        
        break;
      case "text":
          
      var boxPosition = {
          x:OperationManager.CurentPosition.x,
          y: OperationManager.CurentPosition.y
        }
        var textFunctions={
          updateOverlay:updateOverlay,
          save: saveCanvas,
          activityState:
          isTextboxActive,
          setActivityS:setTextboxActive
        }
        
        var newBox = <TextBox position={boxPosition} textFunctions={textFunctions} ></TextBox>
        updateOverlay(newBox)
        setTextboxActive(true)
        break
      case "shapes":
        console.log("drawing shape")
        
        break
      }
  } 

  var [canvasDimension,setDimensions] = useState({width:window.innerWidth,height:window.innerHeight})
  return(
    <div >
      {isTextboxActive? overlayedElements: null}
    <canvas id={classes.board} width ={canvasDimension.width} height={canvasDimension.height} onPointerDown={(event)=>{
      OperationManager.CurentPosition = {x:event.nativeEvent.layerX,y:event.nativeEvent.layerY}
      OperationHandler(event)
    }} 
    onPointerMove={(event)=>{
      OperationManager.CurentPosition = {x:event.nativeEvent.layerX,y:event.nativeEvent.layerY}
    }}

    onDrop={(e)=>{
      e.preventDefault()
      
      const reader = new FileReader()
      reader.addEventListener("load",()=>{
        var imageData = reader.result 
        var image = new Image()
        image.src = imageData  
        drawUploaded(image,{x:e.clientX,y:e.clientY})
      })
      var file = e.dataTransfer.files[e.dataTransfer.files.length-1]
      
      reader.readAsDataURL(file)
    }}
    onDragOver={(e)=>{
      e.preventDefault()
    }}>     
    </canvas>
    </div>
    )
}

export function Whiteboard () {
  var canvasHistory = []
  var undoHistory = []
  var currentState = 0
  var menuFunctions= {
    undoFunction:Undo,
    redoFunction: Redo
  }

  function historyUpdate(canvasData){
    var Data = new Image()
    Data.src = canvasData
    canvasHistory.push(Data)     
    currentState = canvasHistory.length -2
    undoHistory = []
  }

  function Undo(){
    var canvas = document.getElementById(classes.board)
    canvas = canvas.getContext("2d")
    if (currentState < 0) {
      canvas.clearRect(0,0,window.innerWidth,window.innerHeight)
      var undone = canvasHistory.pop()
      if (undone !== undefined) undoHistory.push(undone)  
        currentState = currentState -1
      return
    } 
    canvas.clearRect(0,0,window.innerWidth,window.innerHeight)
    canvas.drawImage(canvasHistory[currentState],0,0)
    var undone = canvasHistory.pop()
    undoHistory.push(undone)
    currentState = currentState-1
  }

  function Redo(){
    
    if (undoHistory.length === 0) return
    
    var canvas = document.getElementById(classes.board)
    canvas = canvas.getContext("2d")
    canvas.clearRect(0,0,window.innerWidth,window.innerHeight)
    canvas.drawImage(undoHistory[undoHistory.length-1],0,0)
    var redone = undoHistory.pop()
    canvasHistory.push(redone)
    currentState= currentState + 1
  }

    return (
      <div scroll="no" className={classes.app}>
      <Menu 
      operationManager={OperationManager}
      menuFunctions ={menuFunctions}
      ></Menu>
      <Canvas updateFunction= {historyUpdate}></Canvas>
      </div>
    );
  }
  
export default Whiteboard;
  