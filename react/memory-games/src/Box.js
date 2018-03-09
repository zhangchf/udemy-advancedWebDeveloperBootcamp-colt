import React, {Component} from "react";
import PropTypes from "prop-types";
import "./Box.css";

class Box extends Component {
    render() {
        let {color, checked} = this.props.box;
        return (
            <div 
                style={{backgroundColor: checked ? color : "#888"}} 
                className="box"
                onClick={this.props.onClick}/>
        )
    }
}

Box.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default Box;