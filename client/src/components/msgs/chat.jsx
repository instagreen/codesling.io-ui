import React, { Component } from 'react';
import io from 'socket.io-client/dist/socket.io.js';
import axios from 'axios';
import { throttle } from 'lodash';

import Input from '../globals/forms/Input';
import Button from '../globals/Button';


import './chat.css';

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      loggedInUsername: '',
      msg: '',
      msgs: [],
      test: '',
      elementVisibility: 'hidden-element'
    }
    this.handleChange = this.handleChange.bind(this);
    this.toggleChatBox = this.toggleChatBox.bind(this);
  }

  handleChange(e){
    console.log('these are msgs:', this.state.msgs);
    this.setState({ msg: e.target.value});
  }

  componentDidMount() {
    const email = localStorage.getItem('email');
    let user;
    if(email.indexOf('@') > 0){
      user = email.split('@')[0];  
    } else {
      user = email;
    }
    this.setState({ loggedInUsername: user });
    const { socket } = this.props;
    socket.on('connect', () => {
      socket.emit('client.ready', {});
    });

    socket.on('server.msgReceived', ({ msg, msgSender }) => {
      console.log('msg', msg, 'logged in u:', this.state.loggedInUsername, 'sender', msgSender);  
      if ( this.state.loggedInUsername !== msgSender) {
        console.log('this should print: ', msg, msgSender);
        this.setState({ msgs: [...this.state.msgs, [msg, msgSender]] });
        this.setState({ test: msg });
        console.log('test:', this.state.test, 'logged in u:', this.state.loggedInUsername, 'sender', msgSender);  
      }
    });
    // window.addEventListener('resize', this.setEditorSize);
  }

  sendMsg = () => {
    const { socket } = this.props;
    const { msg } = this.state;
    // const msgSender = localStorage.getItem('msgSender');
    const msgSender = this.state.loggedInUsername;
    this.setState({ msgs: [...this.state.msgs, [msg, msgSender]] });    
    socket.emit('client.sendMsg', { msg, msgSender });
  }

  toggleChatBox() {
    console.log('before change:', this.state.elementVisibility);
    if(this.state.elementVisibility === 'hidden-element'){
      this.setState({ elementVisibility: 'visible-element' });  
    } else {
      this.setState({ elementVisibility: 'hidden-element' });  
    }
    console.log('after change:', this.state.elementVisibility);
  }

  render() {
    const { socket } = this.props;
    return (
      <div className="sling-container chat-container">      
          <div>
            <div className={`chat-box ${this.state.elementVisibility}`}  style={{
                overflow: 'auto', 
                marginTop: '25px', 
                backgroundColor: '#666',
                width: '250px',
                height: '150px',
              }}>
              {this.state.msgs.map((tupal, index) => {
                return <li style={{listStyle: 'none'}} key={index}>{tupal[1]}: {tupal[0]}</li>;
              })}  
            </div>
            <Button
              className="toggleWin-btn"
              text=""
              backgroundColor="red"
              color="white"
              onClick={this.toggleChatBox}
            />
            <Input
              name='msg'
              type='msg'
              placeholder={'Chat here!'}
              onChange={this.handleChange}
            />
            <Button
              className="send-btn"
              text="Send"
              backgroundColor="red"
              color="white"
              onClick={() => this.sendMsg()}
            />
          </div>
      </div>
    )
  }
}

export default Chat;
