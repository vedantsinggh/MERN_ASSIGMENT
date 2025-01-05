import React, { useState } from "react";
import { Stack, Avatar, Typography, IconButton, TextField, Button } from "@mui/material";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import  moment  from "moment";

const Profile = () => {
  const [interests, setInterests] = useState(["Coding", "Music", "Travel"]);
  const [newInterest, setNewInterest] = useState("");

  const handleAddInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest)) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (interest) => {
    setInterests(interests.filter((i) => i !== interest));
  };

  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"} >
      <Avatar
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
        alt="Profile Avatar"
      />

      <ProfileCard heading={"Name"} text={"Navin"} Icon={<FaceIcon />} />
      <ProfileCard
        heading={"Username"}
        text={"@navinpal512002@gmail.com"}
        Icon={<UserNameIcon />}
      />
      <ProfileCard
        heading={"Joined"}
        text={moment("2025-01-05T12:34:56.789Z").fromNow()}
        Icon={<CalendarIcon />}
      />

      <Typography variant="h6" color="white">
        Interests
      </Typography>
      <Stack direction="column" spacing={1} alignItems="center">
        {interests.map((interest) => (
          <Stack key={interest} direction="column" spacing={1} alignItems="center">
            <Typography variant="body1" color="white">
              {interest}
            </Typography>
            <IconButton onClick={() => handleRemoveInterest(interest)} size="small" color="error">
              <DeleteIcon />
            </IconButton>
          </Stack>
        ))}
        <Stack direction="row" spacing={1}>
          <TextField
            size="small"
            variant="outlined"
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            placeholder="Add interest"
            InputProps={{
              style: { color: "white" },
            }}
          />
          <Button onClick={handleAddInterest} variant="contained" startIcon={<AddIcon />}>
            Add
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction={"row"}
    alignItems={"center"}
    spacing={"1rem"}
    color={"white"}
    textAlign={"center"}
  >
    {Icon && Icon}
    <Stack>
      <Typography variant="body1">{text}</Typography>
      <Typography color={"gray"} variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
