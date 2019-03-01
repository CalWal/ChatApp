import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chatkit from '@pusher/chatkit-client'

import {tokenURL, instanceLocator} from "./config.js"


import MessageList from "./components/MessageList"


class App extends Component {

  constructor(){
    super()
    this.state = {
      messages: []
    }
  }

componentDidMount(){
  const chatManager = new Chatkit.ChatManager({
    instanceLocator,
    userId: 'Callum',
    tokenProvider: new Chatkit.TokenProvider({
      url: tokenURL
    })
  })




  chatManager
    .connect()
      .then(currentUser => {
        currentUser.subscribeToRoom({
          roomId: currentUser.rooms[0].id,
          hooks: {
            onMessage: message => {
              console.log(`Received new message: ${message.text}`);
              this.setState({
                messages: [...this.state.messages, message]
              })
            }
          }
        })
      })
      .catch(error => {
        console.error("error:", error)
      })


}

  render() {
    console.log('Messages', this.state.messages)
    return (
      <div className="App">
    <MessageList messages={this.state.messages}/>
      </div>
    );
  }
}

export default App;
