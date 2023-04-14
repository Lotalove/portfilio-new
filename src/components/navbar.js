import { Link } from "react-router-dom"
import '../styles/App.css';
import logo from "../images/logo.jpg"
export function Navbar(props){
    return(
      <div id="navbar">
        <Link to="/" className="logo"><img style={{width:"64px", alignSelf:"center"}}src={logo}/></Link>
        <div className="links">
          <Link className="link" to="/">Home</Link>
          <Link className="link" to="/projects">
          Projects
          </Link>
          <Link className="link" to="/contact">
          Contact
          </Link>
        </div>
      </div>
    )
    }