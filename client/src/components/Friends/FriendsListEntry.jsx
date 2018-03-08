import React from 'react';

class FriendListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFollowing: false,
    }
  }

  componentWillMount() {
    // check if 'friend' is a follower of the user
      // set this.state.isFollowing to true
  }

  handleAddFriend() {
    console.log('Add friend button clicked');
  }

  render() {
    return (
      <li>
        <em href="#">{this.props.user.username}</em>
        {this.state.isFollowing ? null : <button onClick={this.handleAddFriend.bind(this)}>Add Friend</button>}
      </li>
    )
  }
}

export default FriendListEntry;
