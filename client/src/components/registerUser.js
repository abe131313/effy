import React, { Component } from "react";
import AppBar from "./Appbar.js";
import UserForm from "./userForm.js";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
export default function RegisterUser() {
  return (
    <div>
      <AppBar />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <UserForm />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Button
          variant="contained"
          sx={{ marginBottom: 2, backgroundColor: "#609EA2", width: "15rem" }}
        >
          <Link to='/viewandmanagecompanies' style={{color:"white",textDecoration: "none"}}>View all companies</Link>
        </Button>
        <Button
          variant="contained"
          sx={{ marginBottom: 2, backgroundColor: "#609EA2", width: "15rem" }}
        >
          Update a Company
        </Button>
        <Button
          variant="contained"
          sx={{ marginBottom: 2, backgroundColor: "#609EA2", width: "15rem" }}
        >
          Delete a Company
        </Button>
      </div>
    </div>
  );
}
