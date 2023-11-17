import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  return (
    <Box
      sx={{
        backgroundColor: "whitesmoke",
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
        M:TG Stat Tracker
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
