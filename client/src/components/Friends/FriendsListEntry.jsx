import React from 'react';
import Button from '../globals/Button';
import axios from 'axios';

import './Friend.css';

class FriendListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFriend: false,
      backgroundColor: 'red',
      isDisabled: false,
    }
  }

  componentWillMount() {
    this.setFriendsList();
  }

  setFriendsList() {
    console.log('getting friends list');
    axios.get(`http://localhost:3396/api/friends/fetchAllFriends/${localStorage.id}`)
      .then((data) => {
        data.data.filter((user) => user.id === this.props.user.id).length ? 
        this.setState({ isFriend: true }) : null;
    });
  }

  handleAddFriend() {
    axios.post('http://localhost:3396/api/friends/addFriend', {
      user_id: localStorage.id,
      friend_id: this.props.user.id,
    })
      .then((data) => {
        this.setState({
          isDisabled: true,
          isFriend: true,
        });
        this.setFriendsList();
      });
  }

  handleChallenge() {
    console.log(`clicked challenge for ${this.props.user.username}`);
  }

  render() {
    return (
      <option
        className={this.state.isFriend ? "friend" : "notFriend"}
        onDoubleClick={this.state.isFriend ? this.handleChallenge.bind(this) : this.handleAddFriend.bind(this)}
      >
        <strong><em href="#">{this.props.user.username}</em></strong>
      </option>
    );
  }
}

export default FriendListEntry;
