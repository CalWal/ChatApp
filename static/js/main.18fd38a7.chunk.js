(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,a){e.exports=a(20)},17:function(e,t,a){},18:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},19:function(e,t,a){},20:function(e,t,a){"use strict";a.r(t);var o=a(0),n=a.n(o),s=a(8),r=a.n(s),i=(a(17),a(7)),c=a(2),m=a(3),l=a(6),u=a(4),d=a(5),h=a(1),b=(a(18),a(19),a(9)),p=a.n(b);var f=function(e){return n.a.createElement("div",{className:"message"},n.a.createElement("div",{className:"message-username"}," ",e.username," "),n.a.createElement("div",{className:"message-text"},e.text))},g=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(m.a)(t,[{key:"componentWillUpdate",value:function(){var e=r.a.findDOMNode(this);this.shouldScrollToBottom=e.scrollTop+e.clientHeight+100>=e.scrollHeight}},{key:"componentDidUpdate",value:function(){if(this.shouldScrollToBottom){var e=r.a.findDOMNode(this);e.scrollTop=e.scrollHeight}}},{key:"render",value:function(){return this.props.roomId?n.a.createElement("div",{className:"message-list"},this.props.messages.map(function(e,t){return n.a.createElement(f,{key:t,username:e.senderId,text:e.text})})):n.a.createElement("div",{className:"message-list"},n.a.createElement("div",{className:"join-room"},"\u2190 Join a room!"))}}]),t}(n.a.Component),v=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(l.a)(this,Object(u.a)(t).call(this))).state={message:""},e.handleChange=e.handleChange.bind(Object(h.a)(Object(h.a)(e))),e.handleSubmit=e.handleSubmit.bind(Object(h.a)(Object(h.a)(e))),e}return Object(d.a)(t,e),Object(m.a)(t,[{key:"handleChange",value:function(e){this.setState({message:e.target.value})}},{key:"handleSubmit",value:function(e){e.preventDefault(),this.props.sendMessage(this.state.message),this.setState({message:""})}},{key:"render",value:function(){return n.a.createElement("form",{className:"send-message-form",onSubmit:this.handleSubmit},n.a.createElement("input",{disabled:this.props.disabled,onChange:this.handleChange,placeholder:"Type Your Message And Hit ENTER",type:"text"}))}}]),t}(n.a.Component),j=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this,t=Object(i.a)(this.props.rooms).sort(function(e,t){return e.id-t.id});return n.a.createElement("div",{className:"rooms-list"},n.a.createElement("ul",null,n.a.createElement("h3",null,"Your Rooms:"),t.map(function(t){var a=e.props.roomId===t.id?"active ":"";return n.a.createElement("li",{key:t.id,className:"room "+a},n.a.createElement("a",{onClick:function(){return e.props.subscribeToRoom(t.id)},href:"#"},t.name))})))}}]),t}(n.a.Component),O=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(l.a)(this,Object(u.a)(t).call(this))).state={roomName:""},e.handleChange=e.handleChange.bind(Object(h.a)(Object(h.a)(e))),e.handleSubmit=e.handleSubmit.bind(Object(h.a)(Object(h.a)(e))),e}return Object(d.a)(t,e),Object(m.a)(t,[{key:"handleChange",value:function(e){this.setState({roomName:e.target.value})}},{key:"handleSubmit",value:function(e){e.preventDefault(),this.props.createRoom(this.state.roomName),this.setState({roomName:""})}},{key:"render",value:function(){return n.a.createElement("div",{className:"new-room-form"},n.a.createElement("form",{onSubmit:this.handleSubmit},n.a.createElement("input",{value:this.state.roomName,onChange:this.handleChange,type:"text",placeholder:"Create A Room",required:!0}),n.a.createElement("button",{id:"create-room-btn",type:"submit"},"+")))}}]),t}(n.a.Component),R=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(l.a)(this,Object(u.a)(t).call(this))).state={roomId:null,messages:[],joinableRooms:[],joinedRooms:[]},e.sendMessage=e.sendMessage.bind(Object(h.a)(Object(h.a)(e))),e.subscribeToRoom=e.subscribeToRoom.bind(Object(h.a)(Object(h.a)(e))),e.getRooms=e.getRooms.bind(Object(h.a)(Object(h.a)(e))),e.createRoom=e.createRoom.bind(Object(h.a)(Object(h.a)(e))),e}return Object(d.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=this;new p.a.ChatManager({instanceLocator:"v1:us1:b4c7574a-3d5c-4296-ad56-c0f1839627a1",userId:"Callum",tokenProvider:new p.a.TokenProvider({url:"https://us1.pusherplatform.io/services/chatkit_token_provider/v1/b4c7574a-3d5c-4296-ad56-c0f1839627a1/token"})}).connect().then(function(t){e.currentUser=t,e.getRooms()}).catch(function(e){console.error("error:",e)})}},{key:"getRooms",value:function(){var e=this;this.currentUser.getJoinableRooms().then(function(t){e.setState({joinableRooms:t,joinedRooms:e.currentUser.rooms})})}},{key:"subscribeToRoom",value:function(e){var t=this;this.setState({messages:[]}),this.currentUser.subscribeToRoom({roomId:e,hooks:{onMessage:function(e){t.setState({messages:[].concat(Object(i.a)(t.state.messages),[e])})}}}).then(function(e){t.setState({roomId:e.id}),t.getRooms()})}},{key:"sendMessage",value:function(e){this.currentUser.sendMessage({text:e,roomId:this.state.roomId})}},{key:"createRoom",value:function(e){var t=this;this.currentUser.createRoom({name:e}).then(function(e){return t.subscribeToRoom(e.id)})}},{key:"render",value:function(){return console.log("Messages",this.state.messages),n.a.createElement("div",{className:"App"},n.a.createElement(j,{roomId:this.state.roomId,subscribeToRoom:this.subscribeToRoom,rooms:[].concat(Object(i.a)(this.state.joinableRooms),Object(i.a)(this.state.joinedRooms))}),n.a.createElement(g,{roomId:this.state.roomId,messages:this.state.messages}),n.a.createElement(v,{disabled:!this.state.roomId,sendMessage:this.sendMessage}),n.a.createElement(O,{createRoom:this.createRoom}))}}]),t}(o.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(n.a.createElement(R,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[12,1,2]]]);
//# sourceMappingURL=main.18fd38a7.chunk.js.map