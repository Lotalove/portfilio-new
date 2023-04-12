import { useState } from "react"
import classes from "../styles/timer.module.css"
import downarrow from '../images/timerimage/down-arrow.png'
import uparrow from '../images/timerimage/up-arrow.png'
import {Navbar} from "./navbar"

export function Timer (){
    function startTimer(){ 
        var hours = parseInt(document.getElementById(classes.hour).innerHTML)
        var minutes = parseInt(document.getElementById(classes.minute).innerHTML)
        var seconds = parseInt(document.getElementById(classes.second).innerHTML)
        var time_in_seconds = hours*60*60 + minutes*60 + seconds
    
        setInterval(()=>{
           
            time_in_seconds = time_in_seconds - 1
            var remaining_seconds = time_in_seconds
            if(time_in_seconds/3600 >=1){
                hours =Math.floor(remaining_seconds/3600)
                document.getElementById(classes.hour).innerHTML = hours
                remaining_seconds = remaining_seconds - hours*3600
            }
            else{
                document.getElementById(classes.hour).innerHTML = "00" 
            }
            if(remaining_seconds/60 >= 1){
                minutes = Math.floor(remaining_seconds/60)
                document.getElementById(classes.minute).innerHTML = minutes
                remaining_seconds = remaining_seconds - minutes*60
            }
            else{
                document.getElementById(classes.minute).innerHTML = "00"
            }
            document.getElementById(classes.second).innerHTML = remaining_seconds
        }, 1000,)
    }
    return(
        <div>
            <Navbar/>
            <Time></Time>
            <button style={{width:"100px",height:"100px"}} onClick={startTimer}>Begin</button>
            </div>
        
        )
}

function Time (props){
    function addTime(event){
        var mode = document.getElementById(classes[event])
        var units_of_time = parseInt(mode.innerHTML)+1
        mode.innerHTML = units_of_time <10 ? "0"+units_of_time : units_of_time
    }
    function decTime(event){
        var mode = document.getElementById(classes[event])
        var units_of_time = parseInt(mode.innerHTML)-1
        if (units_of_time < 0) return
        mode.innerHTML = units_of_time <10 ? "0"+units_of_time : units_of_time
    }
    return(
    <div id={classes.mainContainer}>

        <div className={classes.subContainer}>
            <img className ={classes.arrowIcon}src={uparrow} onClick={()=>{addTime("hour")}}/>
            <h2 id={classes.hour} className={classes.timeUnit}>00</h2>
            <img className ={classes.arrowIcon}src={downarrow} onClick={()=>{decTime("hour")}}></img>
        </div>
            
        <div className={classes.divider}>:</div>
        <div className={classes.subContainer}>
            <img className ={classes.arrowIcon}src={uparrow} onClick={()=>{addTime("minute")}}/>
            <h2 id={classes.minute} className={classes.timeUnit}>00</h2>
            <img className ={classes.arrowIcon}src={downarrow} onClick={()=>{decTime("minute")}}></img>
        </div>

        <div className={classes.divider}>:</div>
        <div className={classes.subContainer}>
            <img className ={classes.arrowIcon}src={uparrow} onClick={()=>{addTime("second")}}/>
            <h2 id={classes.second} className={classes.timeUnit}>00</h2>
            <img className ={classes.arrowIcon}src={downarrow} onClick={()=>{decTime("second")}}></img>
        </div>
    </div>
    )
}