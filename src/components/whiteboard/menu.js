import React from "react";
import classes from './whiteboard.module.css';

export class Dropdown extends React.Component {
constructor(props){
    super(props)
    this.state = {properties: {}}
}

render(){
    return(
        <div className={classes.dropdown} id={this.props.menu_name}>
            {this.props.elements}

        </div>
    )
}
}

