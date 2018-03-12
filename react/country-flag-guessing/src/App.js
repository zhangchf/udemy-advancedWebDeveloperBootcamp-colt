import React, { Component } from 'react';
import Question from "./Question";
import './App.css';

const NUM_OPTIONS = 3;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      question: null
    }
  }

  componentDidMount() {
    fetch("https://restcountries.eu/rest/v2/all")
      .then(data => data.json())
      .then(rawCountries => {
        return rawCountries.map(({name, flag}) => {
          return {name, flag}
        })
      })
      .then(countries => {
        // console.log(countries);
        this.setState({countries});
        this.nextQuestion();
      })
  }

  nextQuestion() {
    if (this.state.countries.length <= 0) {
      return;
    }
    let randoms = [];
    while(randoms.length < NUM_OPTIONS) {
      let rand = Math.floor(Math.random() * this.state.countries.length);
      if (!randoms.includes(rand)) {
        randoms.push(rand);
      }
    }
    let options = randoms.reduce((acc, rand) => {
      acc.push(this.state.countries[rand]);
      return acc;
    }, []);
    let answer = Math.floor(Math.random() * options.length);
    this.setState({question: {options, answer}});
  }

  onQuestionAnswered(result) {
    let alertString;
    if (result) {
      alertString = "Correct!";
    } else {
      let {options, answer} = this.state.question;
      alertString = "The correct answer is: " + options[answer].name;
    }
    alert(alertString);
    this.nextQuestion();
  }

  render() {
    let question = this.state.question;

    return (
      <div className="App">
        <h1>Guess Country Flags! </h1>
        { question &&
          <Question question={this.state.question} onAnswer={this.onQuestionAnswered.bind(this)}/>
        }
      </div>
    );
  }
}

export default App;
