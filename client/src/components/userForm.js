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
import { useState, useEffect } from "react";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useSnackbar } from "notistack";

export default function OutlinedCard() {
  let [companyNames, setCompanynames] = useState([]);
  let fetchCompanies = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/getcompanies`
      );
      console.log(response);
      setCompanynames((prevCompanyNames) => {
        const newCompanyNames = response.data.map((ele) => ele.companyName);
        return [...prevCompanyNames, ...newCompanyNames];
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const [age, setAge] = useState("");

  const handleChange = (event) => {
    // setAge(event.target.value);
    setUserForm({...userForm,company_name:event.target.value});
  };
  const { enqueueSnackbar } = useSnackbar();
  let [userForm, setUserForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    designation: "",
    date_of_birth: "",
    company_name: "",
    active: "",
  });
  const postUserData = async (data) => {
    try {
      let request = await axios.post(
        `http://localhost:5000/apiusers/registerusers`,
        {
          first_name: `${data.first_name}`,
          last_name: `${data.last_name}`,
          email: `${data.email}`,
          designation: `${data.designation}`,
          date_of_birth: `${data.date_of_birth}`,
          company_name: `${data.company_name}`,
          active: `${data.active}`,
        }
      );
      console.log(request);
      enqueueSnackbar(`${request.data}`, { variant: "success" });
    } catch (error) {
      enqueueSnackbar("there has been an error from the backend", {
        variant: "error",
      });
    }
  };
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
          onChange={(e) => {
            setUserForm({
              ...userForm,
              first_name: e.target.value.toLowerCase(),
            });
          }}
        />
        <TextField
          id="outlined-basic"
          label="Last Name"
          variant="outlined"
          onChange={(e) => {
            setUserForm({
              ...userForm,
              last_name: e.target.value.toLowerCase(),
            });
          }}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          id="outlined-basic"
          label="E-mail"
          variant="outlined"
          onChange={(e) => {
            setUserForm({ ...userForm, email: e.target.value.toLowerCase() });
          }}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          id="outlined-basic"
          label="Designation"
          variant="outlined"
          onChange={(e) => {
            setUserForm({
              ...userForm,
              designation: e.target.value.toLowerCase(),
            });
          }}
          sx={{ marginBottom: 2 }}
        />
        <label for="birthday">Date of birth</label>
        <input
          type="date"
          id="birthday"
          name="birthday"
          style={{ width: "30vw" }}
          onChange={(e) => {
            setUserForm({ ...userForm, date_of_birth: e.target.value });
          }}
        ></input>
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Active</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="yes"
              control={<Radio />}
              label="yes"
              onClick={(e) => {
                setUserForm({
                  ...userForm,
                  active: e.target.value,
                });
              }}
            />
            <FormControlLabel
              value="no"
              control={<Radio />}
              label="no"
              onClick={(e) => {
                setUserForm({
                  ...userForm,
                  active: e.target.value,
                });
              }}
            />
          </RadioGroup>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 350 }} size="small">
          <InputLabel id="demo-select-small">Registered companies</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={userForm.company_name}
            label="Registered companies"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {companyNames.map((ele) => {
              return <MenuItem value={ele}>{ele}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </CardContent>
      <CardActions>
        <Typography variant="h6">Dont see the company?</Typography>
        <Button
          variant="contained"
          size="small"
          sx={{ backgroundColor: "#609EA2", marginX: 2 }}
          onClick={() => {
            postUserData(userForm);
          }}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          size="small"
          sx={{ backgroundColor: "#609EA2" }}
        >
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <Typography>register company</Typography>
          </Link>
        </Button>
      </CardActions>
    </React.Fragment>
  );
  return (
    <Box sx={{ maxWidth: 400, marginTop: 2 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
