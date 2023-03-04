import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import DropDownComp from './dropDownComp.js'; 

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
        label="First Name"
        variant="outlined"
        sx={{ marginBottom: 2 }}
      />
      <TextField
        id="outlined-basic"
        label="Last Name"
        variant="outlined"
        sx={{ marginBottom: 2 }}
      />
      <TextField
        id="outlined-basic"
        label="E-mail"
        variant="outlined"
        sx={{ marginBottom: 2 }}
      />
      <TextField
        id="outlined-basic"
        label="Designation"
        variant="outlined"
        sx={{ marginBottom: 2 }}
      />
      <TextField
        id="outlined-basic"
        label="Date of Birth"
        variant="outlined"
        sx={{ marginBottom: 2 }}
      />
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">Active</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel value="No" control={<Radio />} label="Female" />
          <FormControlLabel value="Yes" control={<Radio />} label="Male" />
        </RadioGroup>
      </FormControl>
      <DropDownComp/>
    </CardContent>
    <CardActions>
      <Typography variant="h6">Dont see the company?</Typography>
      <Button
        variant="contained"
        size="small"
        sx={{ backgroundColor: "#609EA2" }}
      >
        <Link
          to="/"
          style={{ textDecoration: "none", color: "white" }}
        >
          <Typography>register company</Typography>
        </Link>
      </Button>
    </CardActions>
  </React.Fragment>
);

export default function OutlinedCard() {
  return (
    <Box sx={{ maxWidth: 400, marginTop: 2 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
