import React from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";

const Landing = () => {
  const user = useUser();
  const navigate = useNavigate();

  return (
    <>
      {!user && (
        <Container>
          <h1>You aren't logged in</h1>
        </Container>
      )}
    </>
  );
};

export default Landing;
