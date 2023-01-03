import { Link } from "react-router-dom"
export function Preview(props){
      
    return(
      <Link to ={props.link}>
      <div className="preview" style={{backgroundImage:`url(${props.img})`}}>
        <p style={{fontSize:"24px",marginLeft:"5%"}}>{props.name}</p>
      </div>
      </Link>
    )
  }