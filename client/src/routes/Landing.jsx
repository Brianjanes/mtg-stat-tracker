import React from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Container, Box } from "@mui/material";

const Landing = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  if (user) {
    navigate("/dashboard");
  } else if (!user) {
    console.log("Not logged in!");
    return (
      <>
        {!user && (
          <Container>
            <Box>
              <h1>You aren't logged in</h1>
            </Box>
          </Container>
        )}
      </>
    );
  }
};

export default Landing;
