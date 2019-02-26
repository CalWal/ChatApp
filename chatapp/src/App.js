import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Test from "./components/Test"
import MessageList from "./components/MessageList"

class App extends Component {
  render() {
    return (
      <div className="App">
    <Test />
    <MessageList />
      </div>
    );
  }
}

export default App;
