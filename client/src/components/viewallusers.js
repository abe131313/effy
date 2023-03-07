import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useState, useEffect } from "react";
import { CompanyContext } from "../contexts/selectedCompany.js";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList() {
  const [age, setAge] = React.useState("");
  let [name, setName] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [userDetails, setUserDetails] = useState([]);
  let [userDataFromSelectedCompany, setuserDataFromSelectedCompany] = useState(
    []
  );
  async function getCompanies() {
    try {
      let response = await axios.get(`http://localhost:5000/api/getcompanies`);
      //   console.log(response);
      setName((prevCompanyNames) => {
        const newCompanyNames = response.data.map((ele) => ele.companyName);
        let val = [...prevCompanyNames, ...newCompanyNames];
        // console.log([...new Set(val)])
        return [...new Set(val)];
      });
      //   console.log(arr
    } catch (error) {}
  }

  //   console.log(name);
  function BasicSelect() {
    const handleChange = (event) => {
      setAge(event.target.value);
    };

    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Company</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            {/* <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem> */}
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {name.map((ele) => {
              return <MenuItem value={ele}>{ele}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Box>
    );
  }

  function FormDialog(props) {
    let { value } = props;
    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState("");

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleClose2 = async () => {
      setOpen(false);
      try {
        // value = element.getAttribute("value");
        let request = await axios.post(
          `http://localhost:5000/apiusers/updateUsers`,
          {
            first_name: `${value}`,
            updateVal: `${name}`,
          }
        );
        let currentArrtoCompare = userDataFromSelectedCompany.slice();
        currentArrtoCompare.push(name);
        setuserDataFromSelectedCompany(
          currentArrtoCompare.filter((item) => item !== value)
        );
      } catch (error) {}
    };

    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          update
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>update</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Type in the name and hit update, the username will be updated.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="first name"
              type="email"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose2}>update</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  function FormDialog2(props) {
    let { value } = props;
    const [open, setOpen] = React.useState(false);
    const [justForRender, setJustForRender] = useState([]);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleClose2 = async () => {
      setOpen(false);
      let arr = justForRender.slice();
      arr.push(1);
      setJustForRender(arr);
      try {
        // value = element.getAttribute("value");
        let request = await axios.post(
          `http://localhost:5000/apiusers/migrateUsers`,
          {
            company_name: `${age}`,
            first_name: `${value}`,
          }
        );
        // let currentArrtoCompare = userDataFromSelectedCompany.slice();
        // currentArrtoCompare.push(name);
        // setuserDataFromSelectedCompany(
        //   currentArrtoCompare.filter((item) => item !== value)
        // );
      } catch (error) {}
    };

    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Migrate
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Migrate</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Where do you want the user to be migrated to?
            </DialogContentText>
            <BasicSelect />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose2}>Migrate</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  //   useEffect(() => {
  //     console.log(userDetails);
  //   }, [open]);
  function FormDialog3(props) {
    let { value } = props;

    let arr2 = [];
    const handleClickOpen = async () => {
      setOpen(true);
      try {
        let request = await axios.post(
          `http://localhost:5000/apiusers/fetchUsers`,
          {
            first_name: `${value}`,
          }
        );
        setUserDetails([...request.data]);
        arr2 = Object.keys(request.data[0]);
      } catch (error) {}
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          User Details
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>User Details</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <List>
              {userDetails.map((e, i) => {
                return (
                  <>
                    <ListItem>
                      <Typography key={i}>
                        first name:{JSON.stringify(userDetails[0]["first_name"])}
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <Typography key={i}>
                        last name:{JSON.stringify(userDetails[0]["last_name"])}
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <Typography key={i}>
                        email:{JSON.stringify(userDetails[0]["email"])}
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <Typography key={i}>
                        designation:{JSON.stringify(userDetails[0]["designation"])}
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <Typography key={i}>
                        date_of_birth:{JSON.stringify(userDetails[0]["date_of_birth"])}
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <Typography key={i}>
                        company:{JSON.stringify(userDetails[0]["company_name"])}
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <Typography key={i}>
                        Active:{JSON.stringify(userDetails[0]["active"])}
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <Typography key={i}>
                        userId:{JSON.stringify(userDetails[0]["_id"])}
                      </Typography>
                    </ListItem>
                  </>
                );
              })}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>close</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  let key = 0;
  const { enqueueSnackbar } = useSnackbar();

  let [render, setreRender] = useState(0);
  let { compName, setCompname } = useContext(CompanyContext);
  //   let arr;
  const fetchUsersUnderCompany = async () => {
    try {
      let request = await axios.post(
        `http://localhost:5000/apiusers/fetchUsersundercompany`,
        {
          thecompName: `${compName}`,
        }
      );
      //   arr = request.data;
      setuserDataFromSelectedCompany((prev) => {
        const newFirstNames = request.data.map((ele) => ele.first_name);
        return [...prev, ...newFirstNames];
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (element) => {
    try {
      let val = element.getAttribute("value");
      console.log(val);
      let request = await axios.post(
        `http://localhost:5000/apiusers/deleteUsers`,
        {
          first_name: `${val}`,
        }
      );
      let currentArrtoCompare = userDataFromSelectedCompany.slice();
      currentArrtoCompare.push(val);
      setuserDataFromSelectedCompany(
        currentArrtoCompare.filter((item) => item !== val)
      );
      enqueueSnackbar(`User deleted successfully`, { variant: "success" });
    } catch (error) {
      enqueueSnackbar(`${error}`, { variant: "error" });
    }
  };

  React.useEffect(() => {
    fetchUsersUnderCompany();
    getCompanies();
  }, []);

  function generate(element) {
    return userDataFromSelectedCompany.map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    );
  }

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <FormGroup row></FormGroup>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          List of users
        </Typography>
        <Demo>
          <List>
            {userDataFromSelectedCompany.map((val) => {
              return (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={`${val}`} />
                  <Button
                    value={`${val}`}
                    key={key + 1}
                    onClick={(e) => {
                      handleDelete(e.currentTarget);
                      setreRender(render + 1);
                    }}
                  >
                    Delete
                  </Button>
                  <FormDialog value={`${val}`} />
                  <FormDialog2 value={`${val}`} />
                  <FormDialog3 value={`${val}`} />
                </ListItem>
              );
            })}
          </List>
        </Demo>
      </Grid>
    </Box>
  );
}
