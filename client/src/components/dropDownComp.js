import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SelectSmall(props) {
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

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleOnclick = () => {
    props.onClick(age);
  }

//   console.log(companyNames);
  return (
    <FormControl sx={{ m: 1, minWidth: 350 }} size="small">
      <InputLabel id="demo-select-small">Registered companies</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={age}
        label="Registered companies"
        onChange={handleChange}
        onClick={handleOnclick}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {companyNames.map((ele) => {
          return <MenuItem value={ele}>{ele}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
}
