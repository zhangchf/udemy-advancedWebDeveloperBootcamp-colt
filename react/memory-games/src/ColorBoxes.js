import React, {Component} from "react";
import PropTypes from "prop-types";
import Box from "./Box";
import "./ColorBoxes.css"

class ColorBoxes extends Component {
    render() {
        let boxItems = this.props.boxes.map((box, index) => {
            return <Box key={index} box={box} onClick={this.props.onClickBox.bind(this, box, index)}/>
        })
        return (
            <div className="box-container">
            {boxItems}
            </div>
        )
    }
}

ColorBoxes.propTypes = {
    boxes: PropTypes.arrayOf(PropTypes.shape({
        color: PropTypes.string.isRequired,
        checked: PropTypes.bool.isRequired
    })).isRequired,
    onClickBox: PropTypes.func.isRequired
}

export default ColorBoxes;