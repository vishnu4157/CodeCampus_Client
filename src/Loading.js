import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Loading() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/Mainpage");
    }, 1000);
  });

  return (
    <>
      <div>Logging in Please Wait...</div>
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    </>
  );
}

export default Loading;
