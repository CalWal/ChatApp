import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chatkit from '@pusher/chatkit-client'

import {tokenURL, instanceLocator} from "./config.js"


import MessageList from "./components/MessageList"
import SendMessageForm from "./components/SendMessageForm"
import RoomList from "./components/RoomList"
import NewRoomForm from "./components/NewRoomForm"

class App extends Component {

  constructor(){
    super()
    this.state = {
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.getRooms = this.getRooms.bind(this)
    this.createRoom = this.createRoom.bind(this)
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
        this.getRooms()
      })
      .catch(error => {
        console.error("error:", error)
      })



}
  getRooms(){
    this.currentUser.getJoinableRooms()
    .then(joinableRooms =>{
      this.setState({
        joinableRooms,
        joinedRooms: this.currentUser.rooms
      })
    })
  }

  subscribeToRoom(roomId){
    this.setState({
      messages: []
    })
    this.currentUser.subscribeToRoom({
      roomId: roomId,
      hooks: {
        onMessage: message => {
          this.setState({
            messages: [...this.state.messages, message]
          })
        }
      }
    })
    .then(room =>{
      this.setState({
        roomId: room.id
      })
      this.getRooms()
    })

  }

  sendMessage(text){
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
  })
}

  createRoom(name){
    this.currentUser.createRoom({
      name
    })
    .then(room => this.subscribeToRoom(room.id))
  }

  render() {
    console.log('Messages', this.state.messages)
    return (
      <div className="App">
    <RoomList
      roomId = {this.state.roomId}
      subscribeToRoom={this.subscribeToRoom}
      rooms={[...this.state.joinableRooms,...this.state.joinedRooms]}
      />
    <MessageList
      roomId={this.state.roomId}
      messages={this.state.messages}/>
    <SendMessageForm
      disabled = {!this.state.roomId}
      sendMessage={this.sendMessage} />
    <NewRoomForm createRoom={this.createRoom}/>
      </div>
    );
  }
}

export default App;
