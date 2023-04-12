import { useState } from "react"
import classes from "../styles/form.module.css"
import submitIcon from '../images/submit.png'
import { Navbar } from "./navbar"
import axios from "axios"

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
        var respnse = axios.post("https://3d26dbbf-b7b6-4859-b202-08bd99bea830.mock.pstmn.io/sendEmail").then((response)=>{
            console.log(response.data.message)
        })
    }
    const handleChange = (event) => {
        const name = event.target.id;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    return(
        <form onSubmit={handleSubmit}>
            <h1 id={classes.pageHeading}>GET IN TOUCH</h1>
            <h3 className={classes.label}>Email Address</h3>
            <input 
            id={classes.email} 
            onChange={handleChange} 
            type="email">
            </input>
        <input
        id={classes.message}
        onChange={handleChange}
        type="text"
    >

    </input>
            <button id={classes.submitButton} type="submit" ><img src = {submitIcon} /></button>
        </form>
    )
}