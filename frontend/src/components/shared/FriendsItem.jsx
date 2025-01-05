import React, { memo } from "react";
import {
  Typography,
  Stack,
  Box,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

const FriendsItem = ({ avatar, name, id, intrests, onClick, isOnline }) => {
  return (
    <ListItem button onClick={() => onClick(id)}>
      <ListItemAvatar>
        <Avatar src={avatar} alt={name} />
      </ListItemAvatar>
      <ListItemText primary={name} secondary={intrests.join(", ")} />
      {isOnline && (
        <Box
          sx={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "green",
            position: "absolute",
            top: "50%",
            right: "1rem",
            transform: "translateY(-50%)",
          }}
        />
      )}
    </ListItem>
  );
};

export default FriendsItem;
