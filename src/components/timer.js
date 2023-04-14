import classes from "../styles/timer.module.css"
import {ReactComponent as Arrow} from "../images/Arrow.svg"
import downarrow from '../images/timerimage/down-arrow.png'
import uparrow from '../images/timerimage/up-arrow.png'
import alarmSound from "./sounds/alarm.mp3" 
import {Navbar} from "./navbar"

export function Timer (){

    return(
        <div id={classes.page}>
            <Navbar/>
            <Time></Time>            
            </div>
        )
}

function Time (props){
    var counterInterval
    var alarm = new Audio(alarmSound)
    alarm.currentTime = .5
    function Playsound(){
        alarm.play()
        setTimeout(()=>{
            alarm.pause()
            alarm.currentTime = .5
        },3000)
    }
    function startTimer(){ 
        var hours = parseInt(document.getElementById(classes.hour).innerHTML)
        var minutes = parseInt(document.getElementById(classes.minute).innerHTML)
        var seconds = parseInt(document.getElementById(classes.second).innerHTML)
        var time_in_seconds = hours*60*60 + minutes*60 + seconds
        counterInterval = setInterval(()=>{
        time_in_seconds = time_in_seconds - 1
        if (time_in_seconds === -1){
            Playsound()
            stopTimer()
            return
        }
        var remaining_seconds = time_in_seconds
        if(time_in_seconds/3600 >=1){
            var hours =Math.floor(remaining_seconds/3600)
            if (hours <10) minutes = "0" + hours
            document.getElementById(classes.hour).innerHTML = hours
            remaining_seconds = remaining_seconds - hours*3600
        }
        else{
            document.getElementById(classes.hour).innerHTML = "00" 
        }
        if(remaining_seconds/60 >= 1){
            var minutes = Math.floor(remaining_seconds/60)
            if (minutes <10) minutes = "0" + minutes
            document.getElementById(classes.minute).innerHTML = minutes
            remaining_seconds = remaining_seconds - minutes*60
        }
        else{
            document.getElementById(classes.minute).innerHTML = "00"
        }
        document.getElementById(classes.second).innerHTML = remaining_seconds
        } ,1000)
        document.getElementById(classes.startButton).style.display = "none"
        document.getElementById(classes.pauseButton).style.display = "flex"
        var arrows = document.getElementsByClassName(classes.arrow)
        for(var i = 0;i<arrows.length;i++){
            arrows[i].style.display = "none"
        }
    }
    function stopTimer(){
        document.getElementById(classes.startButton).style.display = "flex"
        document.getElementById(classes.pauseButton).style.display = "none"
        var arrows = document.getElementsByClassName(classes.arrow)
        for(var i = 0;i<arrows.length;i++){
            arrows[i].style.display = "block"
        }
        clearInterval(counterInterval)
    }
    return(
    <div id={classes.mainContainer}>
        <div className={classes.time}>
        <Segment name="hour"/>
        <span className={classes.divider}>:</span>
        <Segment name="minute"/>
        <span className={classes.divider}>:</span>
        <Segment name="second"/>
        </div>
        <button id ={classes.startButton} className={classes.button} onClick={startTimer}><span style={{alignSelf:"center"}}>Begin</span></button>
        <button id ={classes.pauseButton} className={classes.button} onClick={stopTimer}><span style={{alignSelf:"center"}}>Stop</span></button>
    </div>
    )
}

function Segment (props) {
    function Handlechange (){

    }
    function addTime(unit){
        var mode = document.getElementById(classes[unit])
        var units_of_time = parseInt(mode.innerHTML)+1
        if(unit === "minute" && units_of_time >= 60){
            units_of_time = 0
            addTime("hour")
        }
        if(unit === "second" && units_of_time >= 60){
            units_of_time = 0
            addTime("minute")
        }
        mode.innerHTML = units_of_time <10 ? "0"+units_of_time : units_of_time
    }
    function decTime(unit){
        var mode = document.getElementById(classes[unit])
        var units_of_time = parseInt(mode.innerHTML)-1
        if(unit === "hour" && units_of_time < 0){
            units_of_time = 0
            decTime("minute")
        }
        if(unit === "minute" && units_of_time < 0){
            units_of_time =59
            decTime("second")
        }
        if(unit === "second" && units_of_time < 0){
            units_of_time =59
            
        }
        
        mode.innerHTML = units_of_time <10 ? "0"+units_of_time : units_of_time
    }

    return(
        <div className={classes.subContainer}>
        <Arrow className ={classes.arrow + " " + classes.arrowUp} onClick={()=>{addTime(props.name)}} />
        <p id={classes[props.name]} className={classes.timeUnit}>00</p>
        <Arrow className ={classes.arrow + " " + classes.arrowDown} onClick={()=>{decTime(props.name)}} />
    </div>
    )
}