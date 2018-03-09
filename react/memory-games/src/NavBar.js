import React, {Component} from "react";
import PropTypes from "prop-types";
import "./NavBar.css";

class NavBar extends Component {

    render() {
        return (
            <header>
                <a>Memory Games</a>
                <nav>
                    <li><a onClick={() => this.props.onNewGame()}>New Game</a></li>
                </nav>
            </header>
        )
    }
}

NavBar.propTypes = {
    onNewGame: PropTypes.func.isRequired
}

export default NavBar;