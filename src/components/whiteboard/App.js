import classes from './whiteboard.module.css'
import {useState } from 'react'
import { FontDropdown } from './fonts'
import { FontSize } from './fonts'
import {ReactComponent as Bold} from './icons/bold.svg'
import {ReactComponent as Italic} from './icons/italic.svg'
import {ReactComponent as Bin} from './icons/bin.svg'
import { Navigate, useNavigate } from 'react-router-dom'

import { Menu } from './menus'


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
  
function ColorOption(props){
    var BC = props.Properties.currColor === props.color ? "medium solid white":"none" 
    console.log(props.Properties.currColor)  
    return(
      <span className={classes.colorOption} style={{backgroundColor:props.color,border:BC}}
      onClick={()=>{
        OperationManager.CurrentColor = props.color
        props.Properties.colorManager(props.color)
      }}
      ></span>
    )
  }

var InsertDrop = <div className={classes.dropdown}>
<p>Add Picture</p>
</div> 

function TextBox(props){
  return(
    <div >
      <div  id={classes.textSettings}>
        <FontDropdown changeHandler={(event)=>{OperationManager.FontFamily = event.target.value}}/>
        <FontSize changeHandler={(event)=>{OperationManager.FontSize = event.target.value +"px"}}/>
        <div style={{alignSelf:"center"}}>
        <Bold />
        <Italic/>
        <Bin onClick={()=>{
          props.boxSet(null)
        }}/>
        </div>
      </div>
    <input id={classes.textBox}  style={{top:props.top,left:props.left}}  type='text' onKeyDown={(e)=>{
      var ctx = document.getElementById(classes.board)
      ctx= ctx.getContext("2d")
      if (e.keyCode === 13) {
        var yComponent= props.top
        var xComponent = props.left 
        ctx.font =  OperationManager.FontSize+ " " + OperationManager.FontFamily;
        ctx.fillStyle = OperationManager.CurrentColor
        ctx.fillText(e.target.value, xComponent,yComponent);
        props.boxSet(null)        
    }
    }}></input>
    </div>
  )
}

function Canvas(props){
  var [TextBoxes,setBox] = useState(null)

  function OperationHandler(event){ 
    function finishDrawing(){
      clearInterval(drawing)
      document.removeEventListener("pointerup",finishDrawing)
      var canvas = document.getElementById(classes.board)
      canvas = canvas.toDataURL("image/png",1.0)
      props.updateFunction(canvas)
      
    
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
        var canvas =document.getElementById(classes.board)   
        var ctx = canvas.getContext("2d")
        var newBox = <TextBox top={OperationManager.CurentPosition.y} left={OperationManager.CurentPosition.x} boxSet= {setBox}></TextBox>
        setBox(newBox)
        break
      }

  } 
  

  return(
    <div>
    <canvas id={classes.board} width ={window.innerWidth} height={window.innerHeight} onPointerDown={(event)=>{
      var cursor = document.getElementById(classes.cursor)
      cursor.style.width = OperationManager.strokeWidth + "px"
      cursor.style.height = OperationManager.strokeWidth + "px"
      cursor.style.top = event.nativeEvent.clientY-(OperationManager.strokeWidth/2) +"px"
      cursor.style.left  = event.nativeEvent.clientX-(OperationManager.strokeWidth/2) + "px"
      OperationManager.CurentPosition = {x:event.nativeEvent.layerX,y:event.nativeEvent.layerY}
      OperationHandler(event)
    }} 
    onPointerMove={(event)=>{
      var cursor = document.getElementById(classes.cursor)
      cursor.style.width = OperationManager.strokeWidth + "px"
      cursor.style.height = OperationManager.strokeWidth + "px"
      cursor.style.top = event.nativeEvent.clientY-(OperationManager.strokeWidth/2) +"px"
      cursor.style.left  = event.nativeEvent.clientX-(OperationManager.strokeWidth/2) + "px"
      OperationManager.CurentPosition = {x:event.nativeEvent.layerX,y:event.nativeEvent.layerY}
    }}
>     
      
    </canvas>
    {TextBoxes}
    </div>
    )
}

export function Whiteboard () {
  var canvasHistory = []
  var undoHistory = []

  var currentState = 0
  var lastOperation 
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
      <div id={classes.cursor}></div>
      <Canvas updateFunction= {historyUpdate}></Canvas>
      </div>
    );
  }
  
export default Whiteboard;
  