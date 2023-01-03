import { Link } from "react-router-dom"
import '../styles/App.css';
export function Navbar(props){
    return(
      <div id="navbar">
        <Link to="/" className="logo">VR</Link>
        <div className="links">
          <Link className="link" to="/">Home</Link>
          <Link className="link" to="/projects">
          Projects
          </Link>
          <p className="link">Contact</p>
        </div>
      </div>
    )
    }