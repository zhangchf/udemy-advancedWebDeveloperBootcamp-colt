import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const TodoList = ({todos}) => {
  const todoItems = todos.map((todo, i) => {
    return <li key={i}>{todo}</li>
  })
  return todoItems;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
      todos: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let todos = [...this.state.todos, this.state.inputText];
    console.log("todos:", todos);
    this.setState({todos, inputText: ""});
  }

  render() {
    return (
      <div className="App">
        <h1> Todo List </h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="inputText"
            placeholder="What needs to be done?"
            value={this.state.inputText} 
            onChange={(e) => {
              this.setState({[e.target.name]: e.target.value});
              }}/>
          <button type="submit">SAVE</button>
        </form>
        <ol>
          <TodoList todos={this.state.todos}/>
        </ol>
      </div>
    );
  }
}

export default App;
