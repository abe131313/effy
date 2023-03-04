import AppBar from "./Appbar.js";
import Button from "@mui/material/Button";
// import { width } from "@mui/system";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CompForm from './compForm.js'
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
          View all companies
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
      {/* <Routes>
        <Route path="/registeruser" element={<UserForm/>}/>
      </Routes> */}
    </div>
  );
}

export default Home;
