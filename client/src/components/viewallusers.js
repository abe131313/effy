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
import { useContext, useState } from "react";
import { CompanyContext } from "../contexts/selectedCompany.js";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Button } from "@mui/material";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList() {
  let key = 0;
  const { enqueueSnackbar } = useSnackbar();
  let [userDataFromSelectedCompany, setuserDataFromSelectedCompany] = useState(
    []
  );
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
      console.log(userDataFromSelectedCompany);
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
      enqueueSnackbar(`User deleted successfully`, { variant: "success" });
    } catch (error) {
      enqueueSnackbar(`${error}`, { variant: "error" });
    }
  };

  const handleUpdate = async (element) => {
    try {
      let val = element.getAttribute("value");
      let request = await axios.post(
        `http://localhost:5000/apiusers/updateUsers`,
        {
          first_name: `${val}`,
        }
      );
      setuserDataFromSelectedCompany(userDataFromSelectedCompany.filter((item) => item !== val))
    } catch (error) {}
  };
  React.useEffect(() => {
    fetchUsersUnderCompany();
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
                    key={key + 1}
                    value={`${val}`}
                    onClick={(e) => {
                      handleDelete(e.currentTarget);
                      setreRender(render + 1);
                    }}
                  >
                    Delete
                  </Button>
                  <Button>Update</Button>
                  <Button>Migrate</Button>
                </ListItem>
              );
            })}
          </List>
        </Demo>
      </Grid>
    </Box>
  );
}
