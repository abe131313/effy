import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSnackbar } from "notistack";
import axios from 'axios';


export default function OutlinedCard() {
  const { enqueueSnackbar } = useSnackbar();
  let [isload,setisLoad] = useState();

  let key = 0;
  const generateLongandLat = async() => {
    let placeName = encodeURIComponent(`${value.companyAddress}`);
    let response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${placeName}&key=5e408609891f42ab8d60c13fb4a6b496`);
    let latitude = response.data.results[0].geometry.lat;
    let longitude = response.data.results[0].geometry.lng;
    setvalue({...value,coordinates:`${latitude},${longitude}`});
  }

  const postCompanyDetails = async (data) => {
    try {
      const request = await axios.post(`http://localhost:5000/api/registercompany`,{
        companyName:`${data.companyName}`,
        companyAddress:`${data.companyAddress}`,
        coordinates:`${data.coordinates}`
      })
      enqueueSnackbar(`${request.data}`,{variant:"success"});
    } catch (error) {
      enqueueSnackbar("there has been an error from the backend",{variant:"error"})
    }
  }

  const validateInput = (data) => {
    if (data.companyName.length === 0) {
      enqueueSnackbar("company name is a required field and enter a proper address", {
        variant: "warning",
      });
      return false;
    }
  };

  const [value, setvalue] = useState({
    companyName: "",
    companyAddress: "",
    coordinates: "",
  });

  const card = (
    <React.Fragment>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#F9F5E7",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Company Name"
          variant="outlined"
          onChange={(e) => {setvalue({ ...value, companyName: e.target.value.toLowerCase() })}}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          id="outlined-basic"
          label="Company Address"
          variant="outlined"
          onChange={(e) => {setvalue({ ...value, companyAddress: e.target.value })}}
          sx={{ marginBottom: 2 }}
        />
        <p style={{opacity:0.5,marginBottom:20}}>Enter address similar to this format: 77 Massachusetts Ave, Cambridge, MA 02142, USA</p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Co-ordinates"
            variant="outlined"
            value={`${value.coordinates}`}
            // onChange={(e) => {setvalue({ ...value, coordinates: e.target.value })}}
            sx={{ marginBottom: 2 }}
          />
          <Button
            sx={{
              marginBottom: 2,
              backgroundColor: "#609EA2",
              width: "15rem",
              marginLeft: 2,
              color: "black",
            }}
            onClick={generateLongandLat}
          >
            Generate Lat Long
          </Button>
        </div>
      </CardContent>
      <CardActions>
        <Typography variant="h6">Registered already?</Typography>
        <Button
          variant="contained"
          size="small"
          sx={{ backgroundColor: "#609EA2",marginX:2 }}
          onClick={()=> {
            postCompanyDetails(value)
            key = key+1;
          }}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          size="small"
          sx={{ backgroundColor: "#609EA2" }}
        >
          <Link
            to="/registerUser"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Typography>register user under the company</Typography>
          </Link>
        </Button>
      </CardActions>
    </React.Fragment>
  );
  return (
    <Box sx={{ maxWidth: 800, marginTop: 2 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}

// export default function OutlinedCard() {
//   return (

//   );
// }
