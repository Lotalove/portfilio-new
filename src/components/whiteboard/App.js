import classes from './whiteboard.module.css';
import React from 'react';
import AddIcon from "./icons/addicon.png"
import PencilIcon from "./icons/pencil.png"
import Tbox from "./icons/tbox.png"
import Color from "./icons/color.png"
import Bucket from "./icons/bucket.png"
import EraserIcon from "./icons/eraser.png"
import File from "./icons/folder.png"
import { Dropdown } from './menu'
import Fingerimg from "./icons/finger.jpg"
import { InfiniteCanvas } from 'ef-infinite-canvas';

/* 
for our implementation of the movement of drawings we will
convert the clicked party into a absolute location div or svg
and display it over the canvas. on confimation of correct loacation
it will be drawn onto the canvas
*/


var Pencil = {
name:"pencil" ,
icon:PencilIcon

}

var Eraser = {
  name:"eraser",
  icon:EraserIcon
}
var OperationManger= {
  CurrentTool :Pencil ,
  strokeWidth:5 ,
  CurentPosition:{x:null,y:null},
  CurrentColor:"#000000"
}

function Colorselector(){
  return(
    <Dropdown menu_name ={classes.colordrop} elements = {(
      <div id={classes.colorselector}> 
      <div id = "#000000" style={{backgroundColor:"#000000"}} className={classes.coloroption} onClick={(event)=>{
        OperationManger.CurrentColor = event.target.id
      }}></div>
      <div className={classes.coloroption} onClick={()=>{
        OperationManger.CurrentColor = "#FF0000"
      }}></div>
      <div className={classes.coloroption} onClick={()=>{
        OperationManger.CurrentColor = "#FF0000"
      }}></div>
      <div className={classes.coloroption} onClick={()=>{
        OperationManger.CurrentColor = "#FF0000"
      }}></div>
      <div className={classes.coloroption} onClick={()=>{
        OperationManger.CurrentColor = "#FF0000"
      }}></div>
      </div>)} />
      
  )
}

var toolDrop = (
  <Dropdown menu_name = {classes.tooldrop}  elements ={(
  <div>
    <p>Width:</p>
      <input onChange={(event)=>{
        OperationManger.strokeWidth = event.target.value
        }} type="range" defaultValue="5" min="1" max="10"></input>
     <div className = {classes.menubuttons}>
      <button className={classes.ddbtn} onClick={()=>{OperationManger.CurrentTool= Pencil}}><img src={PencilIcon}></img></button>
     <button  onClick = {()=>{
      OperationManger.CurrentTool = Eraser
    
      }} className={classes.ddbtn}>
        <img id={classes.eraser} src={EraserIcon}></img>
      </button>
      <button className={classes.ddbtn}>
        <img src={Bucket}></img>
      </button>
      </div>
  </div>)}/>
)

//change over to either class or functional component

var ImageDropdown =(

  <Dropdown menu_name={classes.imagedrop} elements={(
    <div>
      <p>hello</p>
      <button style={{height:"50px",width:"100%"}}
      onClick={ ()=>{
        const reader = new FileReader()
       var image = document.querySelector("#uploads").files
       console.log(image)
        var images = document.getElementById("uploads").files[0]

            var ctx = document.getElementById(classes.view) 
            ctx = ctx.getContext("2d") 
            ctx.drawImage(images[0],0,0,)
          
          } 
    
      }
      > Import</button>
      
    </div>
  )} />

)



class Navbar extends React.Component{
constructor(props){
  super(props)
  this.state= {}
}

toggleDropdown(menu_name){
  
  var menu = document.getElementById(menu_name)
  menu.style.display = getComputedStyle(menu).display == "none"?"flex":"none"
  console.log(menu.style.display)
}
  render(){
    return(

      <div id={classes.navbar}>
      <div >
      <label className={classes.btn} onMouseDown={()=>{
        console.log("image being uploaded")
        this.toggleDropdown(classes.imagedrop)}}>
      <input id ="uploads" style ={{display:"none"}}type="file"/>
      <img  id ="upload"src={AddIcon} alt="upload"/>
      </label>
      {ImageDropdown}
      </div>
      <div>
      <button id = "pencil" onClick= { ()=>{
        this.toggleDropdown(classes.tooldrop)
        }} className='btn'>
      <img src={OperationManger.CurrentTool.icon} alt="Pencil Tool"/>
      </button>
     {toolDrop}
      
      </div>
      <button className='btn' >
      <img src={Tbox} alt= "Insert Text"/>
      </button>
      <div>
      <button className='btn' onClick={()=>{
        this.toggleDropdown(classes.colordrop)
      }}>
      <img src={Color} alt="Choose color"/>
      </button>
      {<Colorselector></Colorselector>}
      </div>
      </div>
    )
  }

}

class CanvaView extends React.Component {
  constructor(props){
  super(props)
  this.state = {}
  }

  OperationHandler(){
    switch (OperationManger.CurrentTool.name){
    case "pencil":
      
      var p1 = OperationManger.CurentPosition
      var ctx = document.getElementById(classes.view) 
      ctx = ctx.getContext("2d") 
      var drawing = setInterval(()=>{ 
      ctx.beginPath()
      ctx.moveTo(p1.x,p1.y)
      ctx.lineCap = "round"
       //ctx.lineJoin = 'round'
      ctx.lineTo(OperationManger.CurentPosition.x ,OperationManger.CurentPosition.y )
      ctx.lineWidth = OperationManger.strokeWidth 
      ctx.strokeStyle = OperationManger.CurrentColor
      ctx.stroke()
      p1 = OperationManger.CurentPosition

      },0)
      document.addEventListener("mouseup",()=>{clearInterval(drawing)})
    break ;
    case "eraser": // update to be radius based
      var p1 = OperationManger.CurentPosition
      var ctx =  document.getElementById(classes.view)
      ctx = ctx.getContext("2d")
      var drawing = setInterval(()=>{
      ctx.beginPath()
      ctx.arc(OperationManger.CurentPosition.x,OperationManger.CurentPosition.y,OperationManger.strokeWidth,0,2*Math.PI,false)
      ctx.strokeStyle="#FFFFFF"
      ctx.stroke()
      ctx.fillStyle = "#FFFFFF"
      ctx.fill()
      },0)
      document.addEventListener("mouseup",()=>{clearInterval(drawing)
      })
  }
}
  render(){

    return(
      <canvas width={1920}height={1080} id ={classes.view} onMouseDown={(event)=>{
        this.OperationHandler()}}
        onMouseMove={(event)=>{
          var cursor = document.getElementById(classes.cursor)
          cursor.style.width = OperationManger.strokeWidth*2 + "px"
          cursor.style.height = OperationManger.strokeWidth*2 + "px"
          cursor.style.top = event.nativeEvent.clientY-7 +"px"
          cursor.style.left = event.nativeEvent.clientX-7 + "px"
          OperationManger.CurentPosition = {x:event.nativeEvent.layerX,y:event.nativeEvent.layerY}}}
      >
      </canvas>
    )
  }
}

export function Whiteboard () {
  return (
    <div className={classes.app}>
    <Navbar/>
    <div id={classes.cursor}></div>
    <CanvaView/>
    </div>
  );
}

export default Whiteboard;
