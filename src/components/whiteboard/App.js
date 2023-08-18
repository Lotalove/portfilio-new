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
        console.log("writing")
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

function Canvas(){
  var [TextBoxes,setBox] = useState(null)
  function OperationHandler(){
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
        document.addEventListener("mouseup",()=>{clearInterval(drawing)})
      break ;
      case "eraser": 
        var p1 = OperationManager.CurentPosition
        var ctx =  document.getElementById(classes.board)
        ctx = ctx.getContext("2d")
        var drawing = setInterval(()=>{
        ctx.beginPath()
        ctx.arc(OperationManager.CurentPosition.x,OperationManager.CurentPosition.y,OperationManager.strokeWidth/Math.PI,0,2*Math.PI,false)
        ctx.strokeStyle="#FFFFFF"
        ctx.fillStyle="#FFFFFF"
        ctx.stroke()
        ctx.fill()
        },0)
        document.addEventListener("mouseup",()=>{clearInterval(drawing)
        })
        break;
      case "text":
        var canvas =document.getElementById(classes.board)   
        var ctx = canvas.getContext("2d")
        var newBox = <TextBox top={OperationManager.CurentPosition.y} left={OperationManager.CurentPosition.x} boxSet= {setBox}></TextBox>
        setBox(newBox)
       
      }
  } 
  return(
    <div>
    <canvas id={classes.board} width ={1920} height={1080}onMouseDown={()=>{
      OperationHandler()
    }} 
    onMouseMove={(event)=>{
      var cursor = document.getElementById(classes.cursor)
      cursor.style.width = OperationManager.strokeWidth + "px"
      cursor.style.height = OperationManager.strokeWidth + "px"
      cursor.style.top = event.nativeEvent.clientY-(OperationManager.strokeWidth/2) +"px"
      cursor.style.left  = event.nativeEvent.clientX-(OperationManager.strokeWidth/2) + "px"
      OperationManager.CurentPosition = {x:event.nativeEvent.layerX,y:event.nativeEvent.layerY}}}
>     
      
    </canvas>
    {TextBoxes}
    </div>
    )
}

export function Whiteboard () {
  var [page,setPage] = useState(0)
  var pages =[<Canvas/>,<Canvas/>]
    return (
      <div className={classes.app}>
        <Menu operationManager={OperationManager}></Menu>
      <div id={classes.cursor}></div>
      {pages[page]}
      </div>
    );
  }
  
export default Whiteboard;
  