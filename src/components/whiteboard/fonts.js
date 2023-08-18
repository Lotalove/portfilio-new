import classes from './whiteboard.module.css'
 export var fonts = [
    "Helvetica", 
    "Arial",
    "Arial Black",
    "Verdana",
    "Tahoma",
    "Trebuchet MS",
    "Impact",
    "Gill Sans",
    "Times New Roman", 
    "Georgia",
    "Palatino",
    "Baskerville ",
    "Andalé Mono ",
    "Courier ",
    "Lucida ",
    "Monaco ",
    "Bradley Hand ",
    "Brush Script MT", 
    "Luminari ",
    "Comic Sans MS "
]

export function FontDropdown(props){
    return(
        <div>
            
        <select className={classes.select}  onChange={props.changeHandler}>
            {fonts.map((font)=>{
                return <option style={{fontFamily:{font}}}>{font}</option>
            })}
        </select>
        </div>
    )
}

export function FontSize(props){
    var numbers = []
    for(var i =4; i <= 128 ; i= i+4){
        var option = <option> {i} </option>
        numbers.push(option)
    }
    return(
        <select className={classes.select} onChange={props.changeHandler}>
            {numbers}
        </select>
            
    )
}