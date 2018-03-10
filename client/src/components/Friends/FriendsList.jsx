import React from 'react';
import FriendListEntry from './FriendsListEntry.jsx';

const FriendsList = (props) => (
  <div className='friend-list'>
    <h4>Friends: </h4>
    <select size="5">
      {props.friends.map((friend) => <FriendListEntry key={friend.id} user={friend}/>)}
    </select>
  </div>
);

export default FriendsList;
