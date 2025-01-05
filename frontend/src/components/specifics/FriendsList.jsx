import React from 'react';
import { Stack, List } from '@mui/material';
import  FriendsItem  from '../shared/FriendsItem'; 

const FriendList = ({ friends = [], onFriendClick }) => {
  return (
    <Stack width="100%" direction="column" overflow="auto" height="100%">
      {
      <List>
        {friends?.map(friend => (
            <FriendsItem
            key={friend.id}
            id={friend.id}
            avatar={friend.avatar}
            name={friend.name}
            intrests={friend.intrests}
            onClick={onFriendClick}
            isOnline={friend.isOnline} 
          />
        ))}
      </List>
}
    </Stack>
  );
};

export default FriendList;
