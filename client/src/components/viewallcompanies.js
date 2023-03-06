import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { CompanyContext } from "../contexts/selectedCompany.js";
import { useSnackbar } from "notistack";

function createData(calories) {
  return { calories };
}

const rows = [createData("")];

// console.log(rows);

export default function BasicTable() {
  const { enqueueSnackbar } = useSnackbar();
  const { setCompname, companyNames, setCompanynames } =
    useContext(CompanyContext);
  //   let [uniqueCompanyNames, setUniqueCompanyNames] = useState([]);
  let getCompanies = async () => {
    try {
      let response = await axios.get(`http://localhost:5000/api/getcompanies`);
      setCompanynames((prevCompanyNames) => {
        const newCompanyNames = response.data.map((ele) => ele.companyName);
        let val = [...prevCompanyNames, ...newCompanyNames];
        // console.log([...new Set(val)])
        return [...new Set(val)];
      });
      //   console.log(arr
    } catch (error) {}
  };
  let companyName;
  let buttonHandler = async (element) => {
    try {
      companyName = element.getAttribute("value");
      //   let request = await axios.post(
      //     `http://localhost:5000/apiusers/fetchUsersundercompany`,
      //     {
      //       compName: `${companyName}`,
      //     }
      //   );
      setCompname(`${companyName}`);
    } catch (error) {
      console.log(error);
    }
  };

  //   let arr = [];
  //   arr.push(...new Set(companyNames));

  async function deleteCompany(data) {
    try {
      let val = data.getAttribute("value");
      let request = axios.post(`http://localhost:5000/api/deleteCompany`, {
        companyName: `${val}`,
      });
      enqueueSnackbar("Succesfully deleted the company and its users", {
        variant: "success",
      });
      setCompanynames(companyNames.filter((item) => item !== val));
    } catch (error) {}
  }

  useEffect(() => {
    getCompanies();
    // setUniqueCompanyNames([...new Set(companyNames)]);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#332C39" }}>
          <TableRow>
            <TableCell sx={{ color: "white" }}>Company </TableCell>
            <TableCell align="right" sx={{ color: "white" }}>
              Users
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {companyNames.map((row) => (
            <TableRow
            //   key={row}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row}
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  id={row}
                  value={row}
                  sx={{
                    marginBottom: 2,
                    backgroundColor: "#609EA2",
                    width: "10rem",
                  }}
                  onClick={(e) => {
                    buttonHandler(e.currentTarget);
                  }}
                >
                  <Typography>
                    <Link
                      to={`/viewandmanageusers`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      view all users
                    </Link>
                  </Typography>
                </Button>
                <Button
                  variant="contained"
                  id={row}
                  value={row}
                  sx={{
                    marginBottom: 2,
                    backgroundColor: "#609EA2",
                    width: "15rem",
                  }}
                  onClick={(e) => {
                    deleteCompany(e.currentTarget);
                  }}
                >
                  <Typography>
                    <Link style={{ textDecoration: "none", color: "black" }}>
                      Delete the company and its users
                    </Link>
                  </Typography>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
