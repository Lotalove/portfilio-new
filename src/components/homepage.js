import { Navbar } from "./navbar"
import workoutImg from '../images/workout_preview_img.jpg'
import chessImg from '../images/WhitePawn.jpg' 
import connectimg from "../images/connect4Logo.png"
import boardImage from "../images/whiteboard.jpg"
import hourGlass from "../images/hourglass.jpg"
import { Preview } from "./preview"
import linkedInLogo from "../images/InBug-White.png"
import githubLogo from "../images/github-mark-white.png"

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
      var linkedInURL = "https://www.linkedin.com/in/vinny-ramos/"
      var githubURL = "https://github.com/Lotalove"
      return(
    <div id="bio">
      <div id="intro">
      <div id="portrait" >
      
      </div>
      <div>
      <a href= {linkedInURL} target="_blank"><img className="socials_link" src={linkedInLogo}></img></a>
      <a href={githubURL} target="_blank"><img className="socials_link" src={githubLogo}></img></a>
      </div>  
        <h1>Hello, I'm <span style={{color:"#61DAFB"}}>Vinny</span>,</h1>
        </div>
       
        <p>a<span style={{color:"#61DAFB",margin:0}}> software engineer</span> experienced in the development of websites and web applications. I use JavaScript, React, and Node.js for my projects.</p>
        Check some of them out below and on my github!
      </div>
      )
    }
    function Featured(props){
      return(
        <div id="featured">
        <h1>Featured <span style={{color:"#61DAFB"}}>Projects </span> </h1>
        <div id="showcase">
        <Preview name="Workout App" img={workoutImg} link="https://github.com/Lotalove/Health-App" external={true}></Preview>
        <Preview name="Chess" img ={chessImg} link="/projects/chess"></Preview>
        <Preview name="Connect Four" img={connectimg} link="/projects/connect4"></Preview>
        <Preview name="Sketch Pad" img={boardImage} link="/projects/whiteboard"></Preview>
        <Preview name="Timer" img={hourGlass} link="/projects/timer"></Preview>
        </div>
        </div>
      )
    }
    
