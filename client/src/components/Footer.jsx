import React from "react";
import Box from "@mui/material/Box";
import { Link, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100dvw",
        height: 62.5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "whitesmoke",
        position: "absolute",
        left: 0,
        bottom: 0,
        right: 0,
      }}
    >
      <Typography>
        <Link
          sx={{
            textDecoration: "none",
            fontWeight: "bold",
          }}
          href="http://www.brianjanes.ca"
          target="_blank"
          rel="noreferrer"
        >
          Brian Janes
        </Link>
        {/* a space for aesthetics */} &copy; 2023
      </Typography>
    </Box>
  );
};

export default Footer;
