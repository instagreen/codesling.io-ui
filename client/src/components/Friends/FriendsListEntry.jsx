import React from 'react';
import Button from '../globals/Button';
import axios from 'axios';

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
        console.log('Success: ', data);
      });
  }

  render() {
    return (
      <li>
        <strong><em href="#">{this.props.user.username}</em></strong>
        {this.state.isFriend ? null : 
        <Button
          backgroundColor={this.state.backgroundColor}
          color="white"
          text="Add"
          onClick={this.handleAddFriend.bind(this)}
          disabled={this.state.isDisabled}
        />}
      </li>
    );
  }
}

export default FriendListEntry;
