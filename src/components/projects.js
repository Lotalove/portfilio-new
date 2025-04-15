import { Navbar } from "./navbar";
import { Preview } from "./preview";
import chessImg from '../images/WhitePawn.jpg' 
import connectimg from "../images/connect4.png"
import boardImage from "../images/whiteboard.jpg"
import hourGlass from "../images/hourglass.jpg"
import workoutImg from '../images/workout_preview_img.jpg'
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
 
    return(
    
        <div id="showcase">
            <Preview name="Workout App" img={workoutImg} link="https://github.com/Lotalove/Health-App" external={true}></Preview>
            <Preview name="Chess" img ={chessImg} link="/projects/chess"></Preview>
            <Preview name="Connect Four" img={connectimg} link="/projects/connect4"></Preview>
            <Preview name="Whiteboard" img={boardImage} link="/projects/whiteboard" ></Preview>
            <Preview name="Timer" img={hourGlass} link="/projects/timer"></Preview>
            
        </div>
    )
}