// import React, { Component } from "react";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

export default function ButtonAppBar() {
  return (
    <Box >
      <AppBar position="static" sx={{backgroundColor:"#C92C6D",flexDirection:"row",justifyContent:"center"}} >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color:"black", fontWeight:"bold" }} >
            WorkSphere
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

