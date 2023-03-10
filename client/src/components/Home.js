import AppBar from "./Appbar.js";
import Button from "@mui/material/Button";
// import { width } from "@mui/system";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CompForm from "./compForm.js";
import { Link } from "react-router-dom";
function Home() {
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
        <CompForm />
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
      </div>
    </div>
  );
}

export default Home;
