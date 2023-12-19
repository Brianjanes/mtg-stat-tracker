import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingSpinner = () => {
  return (
    <div
      style={{
        color: "inherit",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default LoadingSpinner;
