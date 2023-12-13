import React from "react";
import Box from "@mui/material/Box";
import { Typography, Link } from "@mui/material";
import { useUser, UserButton } from "@clerk/clerk-react";

const Header = () => {
  const { user } = useUser();

  return (
    <Box
      sx={{
        backgroundColor: "#2f4050",
        width: "100dvw",
        height: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: 50,
          flex: 1,
          textAlign: "center",
          marginLeft: 5,
          color: "whitesmoke",
        }}
      >
        mtg stat tracker
      </Typography>
      {!user && (
        <div className="right-side-header">
          <Link color="inherit" underline="none" href="/sign-in/*">
            Sign In
          </Link>
          <Link color="inherit" underline="none" href="/sign-up/*">
            Sign Up
          </Link>
        </div>
      )}
      {user && (
        <div className="right-side-header">
          <Link color="inherit" underline="none" href="/profile">
            Profile
          </Link>
          <UserButton />
        </div>
      )}
    </Box>
  );
};

export default Header;
