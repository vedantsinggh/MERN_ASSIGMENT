import React, { useState } from 'react';
import Header from './Header';
import { Title } from '../shared/Title';
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import  Profile  from '../specifics/Profile';
import FriendList from '../specifics/FriendsList'; // New FriendList component
import { sampleFriends } from '../../constants/sampledata'; // Sample friends data

const AppLayout = (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const [selectedFriend, setSelectedFriend] = useState(sampleFriends);

    // Handle friend selection to display mutual friends
    const handleFriendClick = (friend) => {
      setSelectedFriend(friend);
    };

    return (
      <>
        <Title title={"Friend App"} />
        <Header />
        <Grid container height={"calc(100vh - 4rem)"}>
          {/* Friend List Grid */}
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: "none", sm: "block" },
            }}
            height={"100%"}
          >
            <FriendList
              friends={sampleFriends}
              onFriendClick={handleFriendClick}
            />
          </Grid>

          {/* Main Content Grid */}
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            lg={6}
            height={"100%"}
          >
            <WrappedComponent {...props} selectedFriend={selectedFriend} />
          </Grid>

          {/* Mutual Friends and Profile Grid */}
          <Grid
            item
            md={4}
            lg={3}
            height="100%"
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: "rgba(0,0,0,0.85)",
            }}
          >
            
              <Profile />
          
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
