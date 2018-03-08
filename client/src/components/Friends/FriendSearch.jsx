import React from 'react';
import FriendListEntry from './FriendsListEntry.jsx';

const FriendSearch = (props) => (
  <div className='friend-list'>
    <h4>Results: </h4>
    <ul>
      {props.searchList.map((user) => <FriendListEntry user={user}/>)}
    </ul>
  </div>
);

export default FriendSearch;
