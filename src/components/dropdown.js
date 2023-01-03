import React from "react";
import { Link } from "react-router-dom";
import "../styles/App.css"
import MenuIcon from "../images/Menu.png"

export function Menu (){
    
    return(
        <div onClick={()=>{
            var menu = document.getElementById("expanded-menu")
            menu.style.display = getComputedStyle(menu).display == "none"?"block":"none"
        }} id="menu" >
            <img id="burger-menu" src={MenuIcon}></img>
            <div id="expanded-menu">
                <Link to="/"><p>Home</p></Link>
                <Link to="/games"><p>Projects</p> </Link>
                <Link to="/"><p>Contact</p></Link>
            </div>
        </div>
    )
} 