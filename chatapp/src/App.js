import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chatkit from '@pusher/chatkit-client'

import {tokenURL, instanceLocator} from "./config.js"


import Test from "./components/Test"
import MessageList from "./components/MessageList"

class App extends Component {

componentDidMount(){
  const chatManager = new Chatkit.ChatManager({
    instanceLocator,
    userId: 'Callum',
    tokenProvider: new Chatkit.TokenProvider({
      url: tokenURL
    })
  })

  chatManager.connect()
  .then(currentUser =>{
    currentUser.subscribeToRoom({
      roomId:"19409457",
      hooks: {
        onNewMessage: message =>{
          console.log("message.text:", message.text);
        }
      }
    })
  })

}

  render() {
    return (
      <div className="App">
    <MessageList />
      </div>
    );
  }
}

export default App;
