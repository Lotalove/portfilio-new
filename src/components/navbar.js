import { Link } from "react-router-dom"
import '../styles/App.css';
import classes from "../styles/navbar.module.css"
import logo from "../images/logo.jpg"
import { useState } from "react";
import MenuIcon from "../images/Menu.png"
import resume from "../images/Resume.pdf"

export function Navbar(props){
    return(
      <div id={classes.navbar}>
        <Link to="/" className="logo"><img style={{width:"64px", alignSelf:"center"}}src={logo}/></Link>
        
        <Menu/>
      </div>
    )
    }

function Menu(){    
  var [toggled,setToggled] = useState(false)
    var expandedMenu = <div id={classes.expandedMenu}>
    <Link to="/"><p className={classes.link}>Home</p></Link>
    <Link className={classes.links} to="/projects"><p className={classes.link}>Projects</p> </Link>
    <a href={resume} download="vinnyResume"> <p className={classes.link}>Resume</p> </a> 
  </div>
      return(
          <div onClick={async()=>{
            if(toggled === true){
              var dropdown = document.getElementById(classes.expandedMenu)
              dropdown.animate([{transform: "translate(0)"},{transform: "translatex(100%)"}],{duration:500,iterations:1})
              setTimeout(()=>{
                setToggled(false)
              },400)
              
            }
            else setToggled(true)
              }} id={classes.menu} >
              <img id={classes.burgerMenu}src={MenuIcon}></img>
              {toggled === true ? expandedMenu : null}
              
          </div>
      )
 }
 