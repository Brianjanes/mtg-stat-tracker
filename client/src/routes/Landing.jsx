import React from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Container, Box } from "@mui/material";

const Landing = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const containerStyle = {
    maxWidth: "90%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8rem",
    maxHeight: "100hv",
    margin: "2rem",
  };

  if (user) {
    navigate("/dashboard");
  } else if (!user) {
    console.log("Not logged in!");
    return (
      <>
        {!user && (
          <Container style={containerStyle}>
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
