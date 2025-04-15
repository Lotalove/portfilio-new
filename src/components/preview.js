import { Link } from "react-router-dom"
export function Preview(props){
    
    return(
      <a href={props.link} target={props.external?"_blank":"_self"}>
      <div className="preview" style={{backgroundImage:`url(${props.img})`}}>
        <p className = "previewtitle" style={{fontSize:"24px",marginLeft:"5%"}}>{props.name}</p>
      </div>
      </a>
    )
  }