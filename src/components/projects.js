import { Navbar } from "./navbar";
import { Preview } from "./preview";
import chessImg from '../images/WhitePawn.jpg' 
import connectimg from "../images/connect4.png"
import { Link } from "react-router-dom";



export function ProjectsPage (){
    return(
        <div id="project-page">
        <Navbar></Navbar>
        <List></List>
        </div>
        )
}

function List (){
    const container = {
        dispay:"flex",
        flexDirection:"row"

    }
    return(
    
        <div id="showcase">
            <Preview name="Chess" img={chessImg} ></Preview>
            <Preview name="Connect Four" img={connectimg} link="/projects/connect4"></Preview>
            <Preview name="Chess" img={chessImg} ></Preview>
            
        </div>
    )
}