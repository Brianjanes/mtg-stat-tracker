import React from "react";
import { UserProfile } from "@clerk/clerk-react";
import { Container, Box } from "@mui/material";

const Profile = () => {
  return (
    <Container>
      <Box>
        <UserProfile />
      </Box>
    </Container>
  );
};

export default Profile;
