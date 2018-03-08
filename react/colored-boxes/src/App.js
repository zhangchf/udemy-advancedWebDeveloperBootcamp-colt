import React, { Component } from 'react';
import CSS_COLOR_NAMES from "./css_colors";
import './App.css';

function RandomColoredBox(props) {
  return (
    <li className="box-item"><div style={{backgroundColor: props.backgroundColor}} className="box"/></li>
  )
}

class ListOfColoredBoxes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: this.initColors()
    }
  }

  componentDidMount() {
    let intervalId = setInterval(this.randomUpdateBoxColor.bind(this), 300);
    setTimeout(() => clearInterval(intervalId), 10000);
  }

  initColors() {
    let colors = [];
    for (let i = 0; i < this.props.numTimes; i++) {
      colors.push(this.getRandomColor());
    }
    return colors;
  }

  getRandomColor() {
    let colorIndex = Math.floor(Math.random() * CSS_COLOR_NAMES.length);
    return CSS_COLOR_NAMES[colorIndex];
  }

  randomUpdateBoxColor() {
    let boxIndex = Math.floor(Math.random() * this.state.colors.length);
    let newColors = [...this.state.colors];
    newColors[boxIndex] = this.getRandomColor();
    console.log(`randomUpdate, box: ${boxIndex}, color: ${newColors[boxIndex]}`);
    this.setState({colors: newColors});
  }

  render() {
    let items = this.state.colors.map((color, i) => {
      return <RandomColoredBox key={i} backgroundColor={color}/>
    })
    return (
      <ul className="box-container">
      {items}
      </ul>
    )
  } 
}

class App extends Component {

  render() {
    return (
      <div className="App">
        <ListOfColoredBoxes numTimes={16}/>
      </div>
    );
  }
}

export default App;
