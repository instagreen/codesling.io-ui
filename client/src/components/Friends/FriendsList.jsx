import React from 'react';
import FriendListEntry from './FriendsListEntry.jsx';

const FriendsList = (props) => (
  <div className='friend-list'>
    <h4>Friends: </h4>
    <ul>
      {props.friends.map((friend) => <FriendListEntry key={user.id} user={friend}/>)}
    </ul>
  </div>
);

export default FriendsList;
