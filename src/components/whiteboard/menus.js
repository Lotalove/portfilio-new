import styles from './whiteboard.module.css'
import { ReactComponent as Home } from './icons/home.svg'
import { ReactComponent as Brush } from './icons/paintbrush.svg'
import {ReactComponent as Picture} from './icons/painting.svg'
import {ReactComponent as Undo} from './icons/undo.svg'
import {ReactComponent as Redo} from './icons/redo.svg'
import {ReactComponent as Pencil} from './icons/pencil-f 1.svg'
import {ReactComponent as Eraser} from './icons/eraser.svg'
import {ReactComponent as Shapes} from './icons/shapes.svg'
import {ReactComponent as Text} from './icons/text.svg'
import {ReactComponent as Close} from './icons/close.svg'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

function ColorMenu(props){
  return(
    <div className={styles.menu} id ={styles.pencilMenu} >
    <Close onClick={()=>{
      props.setVisibility(false)
    }} style={{alignSelf:"flex-end"}}/>
    <input onChange={(event)=>{
      props.operationManager.strokeWidth = event.target.value
    }} type="range" min={1} max={32} defaultValue={props.operationManager.strokeWidth}></input>
    <p style={{margin:"0px",marginBottom:"16px"}}>Thickness</p>
    {<Colors operationManager={props.operationManager} />}
    </div>
  )
}

function DrawMenu(props){
  var [visibleColors,setColorVisibility] = useState(true)
  var updateTool = props.functions.updateTool
  var drawingTool = props.functions.drawingTool
  return(
    <div id={styles.toolContainer} >
        <div className={styles.menu} id={styles.toolMenu}>
        <Pencil className= {drawingTool === "pencil"?styles.selected:null} id={styles.menuIcons} onClick={()=>{
            updateTool("pencil") 
            setColorVisibility(true)
        }}/>
        <Eraser className= {drawingTool === "eraser"?styles.selected:null} id={styles.menuIcons} onClick={()=>{
            updateTool("eraser")
            setColorVisibility(true)
        }}/>
        <Text
        className= {drawingTool === "text"?styles.selected:null}
          id={styles.menuIcons} onClick={()=>{
          updateTool("text")
          setColorVisibility(false)
        }}/>
        <Shapes style={{alignSelf:"center"}} className= {drawingTool === "shapes"?styles.selected:null} onClick={()=>{
            updateTool("shapes")
            setColorVisibility(false)
        }}/>
        </div>
        { visibleColors === true? <ColorMenu operationManager={props.operationManager} setVisibility={setColorVisibility} /> :null }
        </div>
)
}


export function Menu (props){
    var [activeTool,setTool] = useState("none") 
    var [drawingTool, setDTool] = useState("pencil")
    var [visibleColors,setVisibility] = useState(true)
    const navigate = useNavigate()

    function updateTool(toolName){
      props.operationManager.CurrentTool = toolName
      setDTool(toolName)
    }
    return(
        <div className={styles.menusContainer}>
            <div className={styles.menu} id={styles.mainMenu}>        
                <Home 
                id={styles.menuIcons}
                onClick={()=>{
                    navigate(-1)
                }}
                />
                <Brush 
                className = {activeTool === "draw"?styles.selected:null}
                 id={styles.menuIcons}
                 onClick={()=>{
                 setTool("draw")
                 }}
                 />
                <label 
                id={styles.imageUpload}
                onClick={()=>{
                  setTool("image")
                  
                 }}
                
                >
                <input  type='file' accept="image/jpeg, image/png, image/jpg">
                   </input>
                   <Picture 
                className= {activeTool === "image"?styles.selected:null}
                 id={styles.menuIcons}
                 ></Picture>
                  </label>
           

                <Undo 
                id={styles.menuIcons}
                onClick={()=>{
                  props.menuFunctions.undoFunction()}}
                />
                <Redo
                onClick={()=>{
                  props.menuFunctions.redoFunction()
                }}
                />
            </div>

            {activeTool === "draw"?<DrawMenu operationManager={props.operationManager} functions = {{updateTool:updateTool,drawingTool:drawingTool}}/>:null}  
             
            </div>
           
    
    )
}


function ColorOption(props){
   
    return(
      <span 
      onClick={()=>{
        props.updateColor(props.color)
        props.Properties.operationManager.CurrentColor = props.color}}
      className={styles.colorOption } style={{backgroundColor:props.color,border:props.Properties.operationManager.CurrentColor === props.color? "medium solid white":"none"}}
      ></span>

    )
  }

  function Colors(props){
    var [activeColor,setColor] = useState(props.operationManager.CurrentColor)
    return(
    <div id={styles.colorSelector}>
      <div className={styles.colorRow}>
        <ColorOption
          Properties = {props} updateColor={setColor} color="Black"/>
        <ColorOption 
        updateColor={setColor}
        Properties = {props} color="Red"/>
        <ColorOption
        updateColor={setColor}
        Properties = {props} color="Orange"/>
        <ColorOption
        updateColor={setColor}
        Properties = {props} color="Yellow"/>
      </div>

      <div className={styles.colorRow}>
        <ColorOption
        updateColor={setColor}
        Properties = {props}  color="Green"/>
        <ColorOption 
        updateColor={setColor}
        Properties = {props}  color="aqua"/>
        <ColorOption 
        updateColor={setColor}
        Properties = {props}  color="Blue"/>
        <ColorOption
        updateColor={setColor}        
        Properties = {props}  color="Purple"/>
      </div>
    </div>)
  }