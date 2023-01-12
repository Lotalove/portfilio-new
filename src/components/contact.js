import { useState } from "react"
import classes from "../styles/form.module.css"
import submitIcon from '../images/submit.png'
import { Navbar } from "./navbar"

export function Contact (){
    return(
        <div>
            <Navbar/>
            <Form></Form>
        </div>
    )
}
function Form (){
    const [inputs, setInputs] = useState({})
    var handleSubmit= (event)=>{
        event.preventDefault()
        console.log(inputs)
    }
    const handleChange = (event) => {
        const name = event.target.id;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    return(
        <form onSubmit={handleSubmit}>
            <h1>GET IN TOUCH</h1>
            <input 
            id="message" 
            onChange={handleChange} 
            type="text">
            </input>

            <button id={classes.submitButton} type="submit" ><img src = {submitIcon} /></button>
        </form>
    )
}