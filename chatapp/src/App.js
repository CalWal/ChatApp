import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chatkit from '@pusher/chatkit-client'

import {tokenURL, instanceLocator} from "./config.js"


import MessageList from "./components/MessageList"
import SendMessageForm from "./components/SendMessageForm"
import RoomList from "./components/RoomList"

class App extends Component {

  constructor(){
    super()
    this.state = {
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    }
    this.sendMessage = this.sendMessage.bind(this)
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
        this.currentUser = currentUser

        this.currentUser.getJoinableRooms()
        .then(joinableRooms =>{
          this.setState({
            joinableRooms,
            joinedRooms: this.currentUser.rooms
          })
        })


        this.currentUser.subscribeToRoom({
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

  sendMessage(text){
    this.currentUser.sendMessage({
      text,
      roomId: this.currentUser.rooms[0].id
  })
}

  render() {
    console.log('Messages', this.state.messages)
    return (
      <div className="App">
    <RoomList rooms={[...this.state.joinableRooms,...this.state.joinedRooms]}/>    
    <MessageList messages={this.state.messages}/>
    <SendMessageForm sendMessage={this.sendMessage} />
      </div>
    );
  }
}

export default App;
