import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#2f4050",
        width: "100dvw",
        height: 125,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          color: "black",
          fontSize: 50,
          flex: 1,
          textAlign: "center",
          marginLeft: 5,
        }}
      >
        Brainstorm
      </Typography>
      {/* <MenuIcon
        sx={{
          color: "black",
          fontSize: 45,
          marginRight: 5,
        }}
      /> */}
    </Box>
  );
};

export default Header;
