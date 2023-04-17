import { Navbar } from "./navbar"
import chessImg from '../images/WhitePawn.jpg' 
import connectimg from "../images/connect4.png"
import boardImage from "../images/whiteboard.jpg"
import hourGlass from "../images/hourglass.jpg"
import { Preview } from "./preview"

export function Homepage(){
    return(
      <div id="home-page">
        <Navbar></Navbar>
        <div id="content">
          <Bio></Bio>
          <Featured></Featured>
        </div>
      </div>
    )
    }
    
    function Bio (){
      return(
    <div id="bio">
      <div id="intro">
      <div id="portrait" >
      
      </div>
        <h1>Hello I'm <span style={{color:"#61DAFB"}}>Vinny </span> ,</h1>
        </div>
        <h3 style={{color:"#61DAFB",margin:0}}> Full Stack Developer</h3>
        <p>a curious and self-motivated computer science student with web development experience looking to gain some professional experience while pursuing my degree. </p>
        Check out some of my projects below!
      </div>
      )
    }
    function Featured(props){
      return(
        <div id="featured">
        <h1>Featured <span style={{color:"#61DAFB"}}>Projects </span> </h1>
        <div id="showcase">
        <Preview name="Chess" img ={chessImg} link="/projects/chess"></Preview>
        <Preview name="Connect Four" img={connectimg} link="/projects/connect4"></Preview>
        <Preview name="Sketch Pad" img={boardImage} link="/projects/whiteboard"></Preview>
        <Preview name="Timer" img={hourGlass} link="/projects/timer"></Preview>
        </div>
        </div>
      )
    }
    
