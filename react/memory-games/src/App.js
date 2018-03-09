import React, { Component } from 'react';
import NavBar from './NavBar';
import './App.css';
import ColorBoxes from './ColorBoxes';

const NUM_BOXES = 16;

class App extends Component {
  static defaultProps = {
    colorNames: ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"]

  }

  constructor(props) {
    super(props);
    this.state = {
      boxes: this.createBoxes(),
      lastIndex: -1
    }
  }

  createBoxes() {
    let colorArr = [];
    let arr = Array(NUM_BOXES/2).fill().map(() => {
      let color = this.getRandomColor();
      while (colorArr.includes(color)) {
        color = this.getRandomColor();
      }
      colorArr.push(color);
      return {color: color, checked: false};
    });

    let arr2 = [...arr, ...arr];
    return this.shuffule(arr2);
  }

  shuffule(inArr) {
    let arr = [...inArr];
    for (let i = arr.length - 1; i > 0; i--) {
      let ind = Math.floor(Math.random() * i);
      [arr[ind], arr[i]] = [arr[i], arr[ind]];
    }
    return arr;
  }

  getRandomColor() {
    let colorIndex = Math.floor(Math.random() * this.props.colorNames.length);
    return this.props.colorNames[colorIndex];
  }

  onClickBox(box, index, e) {
    console.log("onClicked", box, index);
    let {boxes, lastIndex} = this.state;
    if (index !== lastIndex && !boxes[index].checked) {
      // show color upon click
      let box = {...boxes[index]};
      box.checked = true;
      let newBoxes = this.updateArr(boxes, index, box);
      this.setState(() => {
        return {boxes: newBoxes, lastIndex: index}
      });

      // check result and update state.
      if (lastIndex !== -1) {
        let newBox = {...box};
        let lastBox = {...boxes[lastIndex]};
        if (newBox.color === lastBox.color) {
            newBox.checked = true;
            lastBox.checked = true;
        } else {
            newBox.checked = false;
            lastBox.checked = false;
        }
        let boxes1 = this.updateArr(newBoxes, index, newBox);
        let boxes2= this.updateArr(boxes1, lastIndex, lastBox);

        setTimeout(() => {
          this.setState(() => ({boxes: boxes2, lastIndex: -1}));
        }, 200);
      }
    }
  }

  onNewGame() {
    this.setState({boxes: this.createBoxes(), lastIndex: -1});
  }

  updateArr(arr, index, obj) {
    let arr2 =  arr.map((val, i) => {
      return i === index ? obj : val;
    })
    return arr2;
  }

  render() {
    return (
      <div className="App">
        <NavBar onNewGame={this.onNewGame.bind(this)}/>
        <ColorBoxes boxes={this.state.boxes} onClickBox={this.onClickBox.bind(this)}/>
      </div>
    );
  }
}

export default App;
